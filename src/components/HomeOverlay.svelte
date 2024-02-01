<!-- HomeOverlay.svelte -->
<script>
  import { homeContent } from "../utils/stores.js";
  import HomeBlock from "./HomeBlock.svelte";

  let blocks = [];

  homeContent.subscribe(($content) => {
    blocks = $content.home || []; // Zorg voor een fallback
  });
</script>

<div class="overlay-container">
  {#each blocks as block (block.title)}
    <HomeBlock {block} />
  {/each}
</div>

<style>
  .overlay-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px; /* Ruimte tussen blokken */
    justify-content: center; /* Blokken centreren */
    padding: 20px; /* Padding rondom de container */
  }
</style>
