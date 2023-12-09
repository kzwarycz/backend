<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	export let loggedInUser;

	const dispatch = createEventDispatcher();
	let cart = [];

	function clearSelection() {
		dispatch('clearRestaurant');
	}

	function toggleCartView() {
		dispatch('toggleCart');
	}

	function toggleLoginRegister() {
		dispatch('toggleLoginRegister');
	}

	async function fetchCartContents() {
		try {
			const response = await fetch(`http://localhost:3001/cart`);
			const data = await response.json();
			cart = data.cart;
		} catch (error) {
			console.error('Error fetching cart:', error);
		}
	}

	async function orderNow() {
		await fetchCartContents();
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

<Navbar let:hidden let:toggle>
	<NavBrand>
		<img
			on:click={clearSelection}
			src="src/lib/images/hamburger.svg"
			class="me-3 h-6 sm:h-9"
			alt="Flowbite Logo"
		/>
		<span
			on:click={clearSelection}
			class="self-center whitespace-nowrap text-xl font-semibold dark:text-white custom-header"
			>Smaczne</span
		>
	</NavBrand>
	<NavHamburger on:click={toggle} />
	<NavUl {hidden}>
		<NavLi on:click={toggleCartView}>Pokaż koszyk</NavLi>
		<NavLi on:click={orderNow}>Złóż zamówienie</NavLi>
		{#if loggedInUser}
			<NavLi on:click={() => dispatch('logout')}>Wyloguj się</NavLi>
		{:else}
			<NavLi on:click={toggleLoginRegister}>Zaloguj się</NavLi>
		{/if}
	</NavUl>
</Navbar>

<style>
	.custom-header {
		color: rgba(0, 0, 0, 0.7) !important;
	}
</style>
