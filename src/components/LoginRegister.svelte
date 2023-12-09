<script>
	import { createEventDispatcher } from 'svelte';

	let loginEmail = '';
	let loginPassword = '';
	const dispatch = createEventDispatcher();

	async function handleLogin() {
		const response = await fetch('http://localhost:3001/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: loginEmail, password: loginPassword })
		});
		const data = await response.json();
		if (response.ok) {
			console.log('Login successful:', data);
			dispatch('login', loginEmail);
		} else {
			console.error('Login failed:', data);
		}
	}
</script>

<div>
	<form on:submit|preventDefault={handleLogin}>
		<input type="text" bind:value={loginEmail} placeholder="Username" />
		<input type="password" bind:value={loginPassword} placeholder="Password" />
		<button type="submit">Login</button>
	</form>
</div>

<style>
	div {
		text-align: center;
		margin: 20px;
	}
	form {
		margin-top: 15px;
	}
	input {
		margin: 5px;
		padding: 8px;
		border: 1px solid #ddd;
		border-radius: 4px;
	}
	button {
		margin: 5px;
		padding: 8px 15px;
		border: none;
		border-radius: 4px;
		background-color: red;
		color: white;
		cursor: pointer;
	}
	button:hover {
		background-color: red;
	}
</style>
