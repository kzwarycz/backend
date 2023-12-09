<script>
	import { onMount } from 'svelte';
	import { Button } from 'flowbite-svelte';

	let cart = [];

	onMount(async () => {
		try {
			const response = await fetch(`http://localhost:3001/cart`);
			const data = await response.json();
			cart = data.cart;
		} catch (error) {
			console.error('Error fetching cart:', error);
		}
	});

	async function removeFromCart(item) {
		try {
			await fetch(`http://localhost:3001/cart/remove-one/${item.name}`, {
				method: 'PATCH'
			});
			const itemIndex = cart.findIndex((i) => i.name === item.name);
			if (cart[itemIndex].quantity > 1) {
				cart[itemIndex] = { ...cart[itemIndex], quantity: cart[itemIndex].quantity - 1 };
				cart = [...cart];
			} else {
				cart = cart.filter((i, index) => index !== itemIndex);
			}
		} catch (error) {
			console.error('Error removing item from cart:', error);
		}
	}

	async function orderNow() {
		try {
			const response = await fetch('http://localhost:3001/order/place', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ cart })
			});
			const data = await response.json();
		} catch (error) {
			console.error('Error placing order:', error);
		}
	}
</script>

<div>
	<div class="button-container">
		<h1>Twój koszyk</h1>
	</div>
	<div class="button-container">
		<Button color="red" class="return" on:click={orderNow}>Złóż zamówienie</Button>
	</div>
	{#each cart as item, index (index)}
		<div class="cart-item">
			<p class="item-name">{item.name}</p>
			<p>{item.quantity}</p>
			<p>{item.price} zł</p>
			<button on:click={() => removeFromCart(item)}>Usuń z koszyka</button>
		</div>
	{/each}
</div>

<style>
	h1 {
		text-align: center;
		margin: 1rem 0 2rem 0;
	}

	.cart-item {
		padding: 10px;
		margin-bottom: 10px;
		border-bottom: 1px solid #ccc;
		display: flex;
		justify-content: space-between;
	}

	.item-name {
		width: 200px;
	}

	.button-container {
		margin: 1rem 0 2rem 0;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
