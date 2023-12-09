<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { List, Li } from 'flowbite-svelte';

	export let restaurant;

	let menu = [];
	const dispatcher = createEventDispatcher();

	onMount(async () => {
		if (restaurant) {
			try {
				const response = await fetch(`http://localhost:3001/${restaurant}`);
				const data = await response.json();
				menu = data.menu;
			} catch (error) {
				console.error('Error fetching menu:', error);
			}
		}
	});

	async function addToCart(item) {
		try {
			await fetch('http://localhost:3001/cart', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ restaurant, itemName: item.name })
			});
			dispatcher('itemAdded', { item });
		} catch (error) {
			console.error('Error adding item to cart:', error);
		}
	}
</script>

<List tag="ul" list="none" class="divide-y divide-gray-200 dark:divide-gray-700">
	{#each menu as item}
		<Li class="py-3 sm:py-4">
			<div class="menu-item">
				<img class="w-8 h-8 rounded-full" src="/src/lib/images/{restaurant}.jpg" />
				<div class="flex-1 min-w-0 custom-name-price">
					<p class="text-sm font-medium text-gray-900 truncate dark:text-white">{item.name}</p>
					<p class="text-sm text-gray-500 truncate dark:text-gray-400">{item.price} zł</p>
				</div>
				<div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
					<button on:click={() => addToCart(item)}>Dodaj do koszyka</button>
				</div>
			</div>
		</Li>
	{/each}
</List>

<style>
	.custom-name-price {
		padding: 12px;
	}
	.menu-item {
		display: flex;
		align-items: center;
		padding: 10px;
	}
	.menu-item img {
		width: 50px;
		height: 50px;
	}
	.menu-item p {
		font-size: 1.2em;
	}
	.menu-item button {
		font-size: 1.2em;
	}
</style>
