<script>
  import { overlayStatus } from "../utils/stores.js";

  export let kruispunt;

  function navigateToCoordinates() {
    // Logic to navigate to coordinates...
    overlayStatus.set(false);
  }

  function handleKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
      navigateToCoordinates();
    }
  }
</script>

<button
  class="info-block"
  on:click={navigateToCoordinates}
  on:keydown={handleKeydown}
  tabindex="0"
>
  <img src={kruispunt.image} alt={kruispunt.naam} />
  <div>
    <h3>{kruispunt.naam}</h3>
    <p>{kruispunt.beschrijving}</p>
  </div>
</button>

<style>
  .info-block {
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;
    transition: transform 0.3s ease;
    flex-shrink: 0; /* Dit voorkomt dat de blokken krimpen */
    cursor: pointer;
    display: block;
    margin-bottom: 1rem;
    box-shadow: 5px 5px 0px 0px rgba(0, 0, 0, 1); /* 100% zwarte schaduw, 5px naar rechts en naar beneden */
  }

  .info-block:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    box-shadow: 5px 5px 0px 0px rgba(0, 0, 0, 1); /* 100% zwarte schaduw, 5px naar rechts en naar beneden */
  }

  .info-block img {
    min-width: 250px;
    display: block;
  }

  .info-block h3 {
    margin: 0;
    padding: 0.5rem;
    background: #f7f7f7;
  }

  .info-block p {
    margin: 0;
    padding: 0.5rem;
  }
</style>
