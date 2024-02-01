<!-- OpvallendeOverlay.svelte -->
<script>
  import { homeContent } from "../utils/stores.js";
  import InfoBlock from "./InfoBlock.svelte";

  let content = [];

  homeContent.subscribe(($content) => {
    content = $content.opvallend || []; // Zorg voor een fallback
  });

  // Defineer de getSegment functie hier
  function getSegment(index, size = 7) {
    return content.slice(index * size, (index + 1) * size);
  }
</script>

<div class="overlay-wrapper">
  {#each ["Noord", "Nieuw-West", "Centrum", "Oost", "Zuid"] as section, index}
    <div class="overlay-section">
      <h2>{section}</h2>
      <div class="overlay-content">
        {#each getSegment(index) as kruispunt}
          <InfoBlock {kruispunt} />
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  .overlay-wrapper {
    max-height: calc(100vh - var(--navbar-height));
    overflow-y: auto;
  }

  .overlay-section {
    margin-bottom: 40px;
  }

  .overlay-content {
    display: flex;
    overflow-x: auto;
    gap: 20px;
    padding: 20px;
  }

  h2 {
    margin-top: 0.5em;
    margin-bottom: 0em;
    margin-left: 1em;
  }
</style>
