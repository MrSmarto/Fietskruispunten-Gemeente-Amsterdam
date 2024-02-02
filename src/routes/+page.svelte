<script>
  import { onMount } from "svelte";
  import {
    overlayStatus,
    overlayContent,
    activeMenuItem,
    map as mapStore, // Gebruik een Svelte store om de map instantie op te slaan
  } from "../utils/stores.js";
  import Navbar from "../components/Navbar.svelte";
  import HomeOverlay from "../components/HomeOverlay.svelte";
  import HerontworpenOverlay from "../components/HerontworpenOverlay.svelte";
  import OpvallendeOverlay from "../components/OpvallendeOverlay.svelte";
  import Hoofdvizualisatie from "../components/Hoofdvizualisatie.svelte";
  import { geofietspuntencolors } from "../utils/geocolors.js";

  // Importeer marker cluster styles en script
  import "leaflet.markercluster/dist/MarkerCluster.css";
  import "leaflet.markercluster/dist/MarkerCluster.Default.css";
  import "leaflet/dist/leaflet.css";
  let map;

  onMount(async () => {
    if (typeof window !== "undefined") {
      const leaflet = await import("leaflet");
      const L = leaflet.default;
      const { default: LMarkerCluster } = await import("leaflet.markercluster");

      // Coördinaten van Amsterdam
      const amsterdamCenter = [52.368, 4.9036];
      const zoomNiveau = 13;

      map = L.map("map", {
        center: amsterdamCenter,
        zoom: zoomNiveau,
        minZoom: 12,
        maxZoom: 22,
      });
      mapStore.set(map); // Sla de map instantie op in de store

      L.tileLayer("https://{s}.data.amsterdam.nl/topo_wm/{z}/{x}/{y}.png", {
        attribution: "&copy; Gemeente Amsterdam",
        subdomains: ["t1", "t2", "t3", "t4"],
        maxZoom: 22,
      }).addTo(map);

      // Initialiseer een markerClusterGroup
      const markerClusterGroup = L.markerClusterGroup();

      // Voorbeeld markers toevoegen (vervang dit met je eigen data)
      const markers = [
        {
          coords: [52.37415834581069, 4.875057157338929],
          popupText: "Kruispunt 1: Prototype",
        },
        {
          coords: [52.368441, 4.903971],
          popupText: "Kruispunt 2-1: Mr. Visserplein",
        },
        {
          coords: [52.368441, 4.903971],
          popupText: "Kruispunt 2-2: Mr. Visserplein",
        },
        {
          coords: [52.3672558180285, 4.925465430047322],
          popupText: "Kruispunt 3: Dageraadsbrug",
        },
        {
          coords: [52.34749847318655, 4.913657054412187],
          popupText: "Kruispunt 4: Berlagebrug Oost",
        },
        {
          coords: [52.35814443388882, 4.941058089710588],
          popupText: "Kruispunt 5: Molukkenstraat Ringdijk",
        },
        {
          coords: [52.384937595552735, 4.8475020552281975],
          popupText: "Kruispunt 6: Westerpark",
        },
    
      ];

      markers.forEach((marker) => {
        const markerInstance = L.marker(marker.coords).bindPopup(
          marker.popupText
        );
        markerClusterGroup.addLayer(markerInstance);
      });

      map.addLayer(markerClusterGroup);

      try {
        const response = await fetch(
          "/data/fietskruispunten_nieuwe_situatie.geojson"
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
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

  // Default de overlayStatus op false zodat de overlay niet direct opent. En de kaart
  // opnieuw gerenderd kan worden.
  overlayStatus.set(false);
  overlayContent.set("home");

  // Reactive statement om de kaartgrootte te vernieuwen wanneer de overlayStatus verandert
  $: if (map) {
    map.invalidateSize();
  }

  // Luister naar overlayContent veranderingen om de actieve menu item bij te werken
  $: {
    if ($overlayContent !== "home" && $overlayStatus) {
      activeMenuItem.set($overlayContent);
    }
  }
</script>

<Navbar />

{#if $overlayStatus}
  <div
    class="overlay {$overlayStatus ? 'overlay-visible' : ''}"
    on:click={() => overlayStatus.set(false)}
    on:keydown={(event) => event.key === "Escape" && overlayStatus.set(false)}
    tabindex="0"
    role="button"
    aria-label="Sluit overlay"
    style="top: var(--navbar-height);"
  >
    {#if $overlayContent === "home"}
      <HomeOverlay />
    {:else if $overlayContent === "herontworpen"}
      <HerontworpenOverlay />
    {:else if $overlayContent === "opvallend"}
      <OpvallendeOverlay />
    {/if}
  </div>
{/if}

<Hoofdvizualisatie />

<div id="map" class={$overlayStatus ? "map-hidden" : ""}></div>

<style>
  @import "../styles/global.css";
  /* Overige stijlen die je mogelijk hebt */
</style>
