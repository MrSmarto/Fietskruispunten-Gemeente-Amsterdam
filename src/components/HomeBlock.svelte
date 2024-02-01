<script>
  import { overlayContent, overlayStatus } from "../utils/stores.js";

  export let block;

  // Make sure to initialize block with a default value to prevent errors
  if (!block) {
    block = {
      title: "",
      description: "",
      image: "",
      overlay: "",
    };
  }

  function changeOverlay() {
    overlayContent.set(block.overlay);
    overlayStatus.set(true);
  }

  function handleKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
      changeOverlay();
    }
  }
</script>

<button
  class="home-block"
  on:click={changeOverlay}
  on:keydown={handleKeydown}
  tabindex="0"
>
  {#if block.image}
    <img src={block.image} alt={block.title} />
  {/if}
  <div class="home-block-content">
    <h2>{block.title}</h2>
    <p>{block.description}</p>
  </div>
</button>

<style>
  .home-block {
    background: none;
    border: none;
    padding: 0;
    width: 48%;
    cursor: pointer;
    text-align: left;
    display: block;
    margin-bottom: 1rem;
  }

  .home-block img {
    width: 100%;
    display: block;
  }

  .home-block-content {
    padding: 1rem;
  }
</style>
