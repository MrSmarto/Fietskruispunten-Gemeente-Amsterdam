<!-- OpvallendeOverlay.svelte -->
<script>
  import { homeContent } from "../utils/stores.js";
  import InfoBlock from "./InfoBlock.svelte";

  let content = [];

  homeContent.subscribe(($content) => {
    content = $content.opvallend || []; // Zorg voor een fallback
  });
</script>

<div class="overlay-content">
  {#each content as kruispunt}
    <InfoBlock {kruispunt} />
  {/each}
</div>

<style>
  .overlay-content {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
  }
</style>
