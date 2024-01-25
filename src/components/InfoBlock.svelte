<script>
  export let imageSrc = ""; // De URL van de afbeelding

</script>

<div class="info-block">
  <div class="image-container" style="background-image: url({imageSrc});"></div>
  <div class="content">
    <h2>{title}</h2>
    <p>{text}</p>
  </div>
  <div class="shadow-border"></div>
</div>

<style>
  .blokjes-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px; /* Ruimte tussen de blokjes */
    justify-content: flex-start;
    align-items: flex-start;
  }

  /* Stijl voor de InfoBlock component (zorg ervoor dat deze klasse beschikbaar is binnen InfoBlock.svelte of definieer de breedte hier als de InfoBlock component dat toestaat) */
  .info-block {
    width: 300px; /* Vaste breedte voor elk blokje */
    margin-bottom: 20px; /* Ruimte aan de onderkant als ze naar beneden verplaatsen */
  }
  .info-block {
    position: relative;
    background-color: white;
    width: 100%; /* of een specifieke breedte */
    margin: 1rem auto;
  }

  .image-container {
    width: 100%;
    height: 60%; /* Aanpassen aan je behoefte */
    background-size: cover;
    background-position: center;
  }

  .content {
    padding: 1rem;
  }

  .shadow-border {
    position: absolute;
    bottom: -10px; /* Aanpassen voor diepte */
    right: -10px; /* Aanpassen voor diepte */
    width: calc(100% - 10px); /* 10px minder dan de volledige breedte */
    height: calc(100% - 10px); /* 10px minder dan de volledige hoogte */
    background-color: black;
    z-index: -1;
  }
</style>
