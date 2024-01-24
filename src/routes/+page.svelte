<script>
  import { onMount } from "svelte";
  import { overlayStatus, overlayContent } from "../utils/stores.js";
  import Navbar from "../components/Navbar.svelte";
  import HerontworpenOverlay from "../components/HerontworpenOverlay.svelte";
  import HomeOverlay from "../components/HomeOverlay.svelte";
  import OpvallendeOverlay from "../components/OpvallendeOverlay.svelte";
  import HerontwerpvriOverlay from "../components/HerontwerpvriOverlay.svelte"; // Zorg ervoor dat de import correct is
  import Hoofdvizualisatie from "../components/Hoofdvizualisatie.svelte"; // Importeer de visualisatiecomponent
  import { geofietspuntencolors } from "../utils/geocolors.js";

  let map;

  onMount(async () => {
    if (typeof window !== "undefined") {
      const leaflet = await import("leaflet");
      const L = leaflet.default;
      await import("leaflet/dist/leaflet.css");

      // Specifieke coördinaten en zoomniveau voor de initiële weergave
      const specifiekeLocatie = [52.37413259215145, 4.875108445719616];
      const zoomNiveau = 20;

      map = L.map("map").setView(specifiekeLocatie, zoomNiveau);

      L.tileLayer("https://t1.data.amsterdam.nl/topo_wm_zw/{z}/{x}/{y}.png", {
        attribution: "&copy; Gemeente Amsterdam",
        maxZoom: 22,
      }).addTo(map);

      // GeoJSON data laden
      try {
        const response = await fetch("/data/fietskruispunten_nieuwe_situatie.geojson");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        L.geoJSON(data, {
          style: (feature) => ({
            color: geofietspuntencolors(feature.properties.Layer),
            fillColor: geofietspuntencolors(feature.properties.Layer),
            fillOpacity: 0.9,
            weight: 0.5,
          }),
        }).addTo(map);
      } catch (error) {
        console.error("Fout bij het laden van de GeoJSON-data:", error);
      }
    }
  });
</script>

<Navbar />

<!-- Voeg de visualisatiecomponent toe binnen je conditionele overlay of ergens anders op de pagina -->
<Hoofdvizualisatie />

{#if $overlayStatus}
  <div class="overlay {$overlayStatus ? 'overlay-visible' : ''}" on:click={(event) => overlayStatus.set(false)} on:keydown={(event) => event.key === "Escape" && overlayStatus.set(false)} tabindex="0" role="button" aria-label="Sluit overlay" style="top: var(--navbar-height);">
    {#if $overlayContent === "home"}
      <HomeOverlay />
    {:else if $overlayContent === "herontworpen"}
      <HerontworpenOverlay />
    {:else if $overlayContent === "opvallende"}
      <OpvallendeOverlay />
    {:else if $overlayContent === "herontwerpvri"}
      <HerontwerpvriOverlay /> <!-- Zorg ervoor dat deze conditional correct is -->
    {/if}
  </div>
{/if}

<div id="map" class={$overlayStatus ? "map-hidden" : ""}></div>

<style>
  @import "../styles/global.css";
</style>
