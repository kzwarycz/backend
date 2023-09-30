<script>
  import { Card, Button } from "flowbite-svelte";
  import { ArrowRightOutline } from "flowbite-svelte-icons";

  export let cardImg;
  export let name;
  export let route;
</script>

<div>
  <Card img={cardImg} class="mb-4">
    <h5
      class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
    >
      {name}
    </h5>
    <Button on:click={() => (window.location.href = route)}>
      Przejdź do menu <ArrowRightOutline class="w-3.5 h-3.5 ml-2 text-white" />
    </Button>
  </Card>
</div>
