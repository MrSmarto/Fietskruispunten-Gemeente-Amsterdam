<script>
  import { onMount } from "svelte";
  import { geofietspuntencolors } from "../utils/geocolors.js"; // Zorg dat dit pad correct is
  import Navbar from "../components/Navbar.svelte";

  let map;

  onMount(async () => {
    if (typeof window !== "undefined") {
      const leaflet = await import("leaflet");
      const L = leaflet.default;
      await import("leaflet/dist/leaflet.css");

      // Initialiseer de kaart met de ID van je kaartcontainer
      map = L.map("map", {
        maxBounds: [
          [52.278174, 4.728759], // Zuidwestelijke hoek van Amsterdam
          [52.431157, 5.079162], // Noordoostelijke hoek van Amsterdam
        ],
      }).setView([52.3676, 4.9041], 13);

      // Gebruik de Amsterdamse topografie als tegelachtergrond
      L.tileLayer("https://t1.data.amsterdam.nl/topo_wm_zw/{z}/{x}/{y}.png", {
        attribution: "&copy; Gemeente Amsterdam",
        maxZoom: 21,
      }).addTo(map);

      // Voeg de GeoJSON-overlay toe
      try {
        const response = await fetch(
          "/data/fietskruispunten_nieuwe_situatie.geojson"
        ); // Zorg ervoor dat dit pad correct is
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Functie om de stijl van de GeoJSON-laag te bepalen
        function style(feature) {
          return {
            color: geofietspuntencolors(feature.properties.Layer), // Kleur van de lijn
            fillColor: geofietspuntencolors(feature.properties.Layer), // Vulkleur
            fillOpacity: 0.9, // Dekking van de vulkleur
            weight: 0.5, // Dikte van de lijn
          };
        }

        L.geoJSON(data, { style: style }).addTo(map);
      } catch (error) {
        console.error("Fout bij het laden van de GeoJSON-data:", error);
      }
    }
  });
</script>

<Navbar />

<div id="map" style="height: 660px;"></div>
<div id="map" style="height: 100vh;"></div>

<style>
  @import "../styles/global.css";
</style>
