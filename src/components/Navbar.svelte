<script>
  import { Navbar, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
</script>

<Navbar let:hidden let:toggle>
  <NavHamburger on:click={toggle} />
  <NavUl {hidden}>
    <NavLi href="/">Home</NavLi>
    <NavLi href="/restaurants">Restaurants</NavLi>
    <NavLi href="/cart">Cart</NavLi>
    <NavLi href="/order">Order now</NavLi>
  </NavUl>
</Navbar>

