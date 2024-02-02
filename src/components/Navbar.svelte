<script>
  import {
    overlayStatus,
    overlayContent,
    activeMenuItem,
  } from "../utils/stores.js";

  function handleMenuClick(item) {
    if ($activeMenuItem === item && $overlayStatus) {
      overlayStatus.set(false);
    } else {
      activeMenuItem.set(item);
      overlayContent.set(item);
      overlayStatus.set(true);
    }
  }
</script>

<nav class="navbar-container">
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
      on:click={() => handleMenuClick("opvallend")}
      class:active={$activeMenuItem === "opvallend"}
      >Opvallende kruispunten</button
    >

    <button
      on:click={() => handleMenuClick("herontwerpvri")}
      class:active={$activeMenuItem === "herontwerpvri"}>Herontwerp VRI</button
    >
  </div>
</nav>

<style>
  @import "../styles/global.css";
  .active {
    color: red;
  }
  .nav-links button:hover {
    cursor: pointer;
    color: red;
  }
</style>
