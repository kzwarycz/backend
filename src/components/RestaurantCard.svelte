<script>
	import { Card, Button } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';

	export let cardImg;
	export let name;
	export let route;

	const dispatch = createEventDispatcher();

	function navigateToMenu() {
		dispatch('select', route);
	}
</script>

<div>
	<Card img={cardImg} class="mb-4">
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			{name}
		</h5>
		<Button on:click={navigateToMenu}>
			Zobacz menu <ArrowRightOutline class="w-3.5 h-3.5 ml-2 text-white" />
		</Button>
	</Card>
</div>
