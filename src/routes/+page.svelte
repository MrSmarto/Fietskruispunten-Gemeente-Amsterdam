<script>
  import { onMount } from "svelte";
  import { overlayStatus, overlayContent } from "../utils/stores.js";
  import Navbar from "../components/Navbar.svelte";
  import HerontworpenOverlay from "../components/HerontworpenOverlay.svelte";
  import HomeOverlay from "../components/HomeOverlay.svelte";
  import OpvallendeOverlay from "../components/OpvallendeOverlay.svelte";
  import { geofietspuntencolors } from "../utils/geocolors.js";

  let map;

  onMount(async () => {
    if (typeof window !== "undefined") {
      const leaflet = await import("leaflet");
      const L = leaflet.default;
      await import("leaflet/dist/leaflet.css");

      map = L.map("map", {
        maxBounds: [
          [52.278174, 4.728759],
          [52.431157, 5.079162],
        ],
      }).setView([52.3676, 4.9041], 13);

      L.tileLayer("https://t1.data.amsterdam.nl/topo_wm_zw/{z}/{x}/{y}.png", {
        attribution: "&copy; Gemeente Amsterdam",
        maxZoom: 21,
      }).addTo(map);

      try {
        const response = await fetch(
          "/data/fietskruispunten_nieuwe_situatie.geojson"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
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

  function toggleOverlay() {
    overlayStatus.update((n) => !n); // Toggle de status van de overlay
  }

  // Nieuwe functie om de overlay te sluiten of te veranderen
  function handleMenuItemClick(selectedItem) {
    if ($overlayContent === selectedItem && $overlayStatus) {
      overlayStatus.set(false); // Sluit de overlay als hetzelfde item opnieuw wordt geklikt
    } else {
      overlayContent.set(selectedItem); // Verander de inhoud van de overlay
      overlayStatus.set(true); // Open de overlay
    }
  }
</script>

<Navbar />

{#if $overlayStatus}
  <div
    class="overlay {$overlayStatus ? 'overlay-visible' : ''}"
    on:click={$overlayStatus ? overlayStatus.set(false) : null}
    tabindex="0"
    role="button"
    aria-label="Sluit overlay"
    style="top: var(--navbar-height);">
    <!-- Overlay content weergave blijft hetzelfde -->
  </div>
{/if}

<div id="map" class={$overlayStatus ? "map-hidden" : ""}></div>

<style>
  @import "../styles/global.css";
</style>
