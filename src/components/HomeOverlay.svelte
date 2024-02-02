<script>
  import { homeContent } from "../utils/stores.js";
  import HomeBlock from "./HomeBlock.svelte";

  let blocks = [];

  homeContent.subscribe(($content) => {
    blocks = $content.home || []; // Zorg voor een fallback
  });
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
<div class="overlay-container">
  {#each blocks as block (block.title)}
    <HomeBlock {block} />
  {/each}
</div>

<style>
  .overlay-container {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 60%)); /* Twee kolommen, elk 35% breed */
    justify-content: space-between; /* Ruimte tussen de kolommen */
    gap: 20px 20px; /* Ruimte tussen rijen en kolommen */
    padding: 20px; 
    overflow-y: auto; /* Maakt verticaal scrollen mogelijk */
    max-height: calc(100vh - var(--navbar-height) - 40px); /* Maximale hoogte */
  }
</style>

