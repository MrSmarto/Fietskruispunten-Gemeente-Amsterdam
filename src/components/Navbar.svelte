<script>
  import {
    overlayStatus,
    overlayContent,
    activeMenuItem,
  } from "../utils/stores.js";

  function handleMenuClick(item) {
    activeMenuItem.set(item); // Update altijd het actieve menu item
    if ($overlayContent === item && $overlayStatus) {
      // Als hetzelfde item opnieuw wordt geklikt en de overlay is zichtbaar, sluit het
      overlayStatus.set(false);
    } else {
      // Anders, open de overlay met de nieuwe content
      overlayContent.set(item);
      overlayStatus.set(true);
    }
  }
</script>

<div class="navbar-container">
  <div class="header">
    <div class="logo-title-container">
      <img
        src="../fotos/nav/logo-gemeente.png"
        alt="Gemeente Amsterdam Logo"
        class="logo"
      />
      <span class="title">Fietskruispunten</span>
    </div>
  </div>

  <div class="nav-links">
    <button
      on:click={() => handleMenuClick("home")}
      class:active={$activeMenuItem === "home"}>Home</button
    >
    <button
      on:click={() => handleMenuClick("herontworpen")}
      class:active={$activeMenuItem === "herontworpen"}
      >Herontworpen kruispunten</button
    >
    <button
      on:click={() => handleMenuClick("opvallende")}
      class:active={$activeMenuItem === "opvallende"}
      >Opvallende kruispunten</button
    >
    <button
      on:click={() => handleMenuClick("herontwerpvri")}
      class:active={$activeMenuItem === "herontwerpvri"}>Herontwerp VRI</button
    >
  </div>
</div>

<style>
  @import "../styles/global.css";
  .active {
    color: red;
  }
  span:hover {
    cursor: pointer;
    color: red;
  }
</style>
