<script>
  import RestaurantCard from "./RestaurantCard.svelte";
  import Navbar from "./Navbar.svelte";
  import meksykanska from "$lib/images/meksykanska.jpg";
  import polska from "$lib/images/polska.jpg";
  import wloska from "$lib/images/wloska.jpg";
</script>

<div>
  <Navbar />
  <h1>Restauracje</h1>
  <ul>
    <RestaurantCard
      cardImg={meksykanska}
      name="Meksykańska"
      route="/meksykanska"
    />
    <RestaurantCard cardImg={polska} name="Polska" route="/polska" />
    <RestaurantCard cardImg={wloska} name="Włoska" route="/wloska" />
  </ul>
</div>
