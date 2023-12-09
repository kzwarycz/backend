<script>
	import Navbar from './Navbar.svelte';
	import RestaurantCard from './RestaurantCard.svelte';
	import RestaurantMenu from './RestaurantMenu.svelte';
	import CartView from './CartView.svelte';
	import LoginRegister from './LoginRegister.svelte';

	import { Button } from 'flowbite-svelte';

	import meksykanska from '$lib/images/meksykanska.jpg';
	import polska from '$lib/images/polska.jpg';
	import wloska from '$lib/images/wloska.jpg';
	import amerykanska from '$lib/images/amerykanska.jpg';

	let selectedRestaurant = null;
	let showCart = false;
	let loggedInUser = null;
	let showLoginRegister = false;

	function handleLogin(userEmail) {
		loggedInUser = userEmail;
	}

	function handleLogout() {
		loggedInUser = null;
	}

	function handleClearRestaurant() {
		selectedRestaurant = null;
		showCart = false;
		showLoginRegister = false;
	}

	function handleToggleCart() {
		showCart = !showCart;
		showLoginRegister = false;
	}

	function handleLoginRegister() {
		showLoginRegister = !showLoginRegister;
		showCart = false;
	}
</script>

<div>
	<Navbar
		{loggedInUser}
		on:logout={handleLogout}
		on:toggleLoginRegister={handleLoginRegister}
		on:clearRestaurant={handleClearRestaurant}
		on:toggleCart={handleToggleCart}
	/>

	{#if showLoginRegister}
		<LoginRegister on:login={handleLogin} />
	{:else if showCart}
		<CartView />
	{:else if !selectedRestaurant}
		<h1>Twoje Restauracje</h1>
		<ul>
			<RestaurantCard
				cardImg={meksykanska}
				name="Meksykańska"
				route="meksykanska"
				on:select={(event) => (selectedRestaurant = event.detail)}
			/>
			<RestaurantCard
				cardImg={polska}
				name="Polska"
				route="polska"
				on:select={(event) => (selectedRestaurant = event.detail)}
			/>
			<RestaurantCard
				cardImg={wloska}
				name="Włoska"
				route="wloska"
				on:select={(event) => (selectedRestaurant = event.detail)}
			/>
			<RestaurantCard
				cardImg={amerykanska}
				name="Amerykańska"
				route="amerykanska"
				on:select={(event) => (selectedRestaurant = event.detail)}
			/>
		</ul>
	{:else}
		<div class="button-container">
			<Button color="red" class="return" on:click={() => (selectedRestaurant = null)}
				>Wróć do wyboru restauracji</Button
			>
		</div>
		<RestaurantMenu restaurant={selectedRestaurant} />
	{/if}
</div>

<style>
	ul {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	h1 {
		text-align: center;
		margin: 1rem 0 2rem 0;
	}

	div.button-container {
		margin: 1rem 0 2rem 0;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
