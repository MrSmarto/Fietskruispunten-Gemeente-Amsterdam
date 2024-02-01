<script>
  import { overlayContent, overlayStatus } from "../utils/stores.js";

  export let block;

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
  <div class="block-content-wrapper">
    {#if block.image}
      <img src={block.image} alt={block.title} />
    {/if}
    <div class="home-block-content">
      <h2>{block.title}</h2>
      <p>{block.description}</p>
    </div>
  </div>
</button>

<style>
  .home-block {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: transform 0.3s ease;
    text-align: left;
    margin-bottom: 1rem;
    width: 100%; /* Zorg ervoor dat de button de volledige breedte neemt */
  }

  .block-content-wrapper {
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease;
    background-color: #f5f5f5; /* Grijze achtergrond zoals in de afbeelding */
    border-radius: 8px; /* Afgeronde hoeken */
    overflow: hidden; /* Zorgt ervoor dat de afbeelding niet buiten de randen komt */
    box-shadow: 5px 5px 0px 0px rgba(0, 0, 0, 1); /* 100% zwarte schaduw, 5px naar rechts en naar beneden */
  }

  .block-content-wrapper:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    box-shadow: 5px 5px 0px 0px rgba(0, 0, 0, 1); /* 100% zwarte schaduw, 5px naar rechts en naar beneden */
  }

  .home-block img {
    width: 100%;
    transition: transform 0.3s ease;
    height: auto; /* Zorg voor behoud van aspect ratio */
    border-top-left-radius: 8px; /* Afgeronde hoeken voor de afbeelding */
    border-top-right-radius: 8px;
  }

  .home-block-content {
    padding: 1rem;
  }
</style>
