<script>
  import { onMount } from "svelte";

  let map;

  // Functie die uitgevoerd wordt zodra de component is gemount in de DOM
  onMount(async () => {
    if (typeof window !== "undefined") {
      // Dynamisch importeren van Leaflet en de bijbehorende CSS
      const leaflet = await import("leaflet");
      const L = leaflet.default;
      await import("leaflet/dist/leaflet.css");

      // Initialisatie van de Leaflet-kaart
      map = L.map("map").setView([52.1326, 5.2913], 7); // Coördinaten en zoomniveau voor Nederland

      // Voeg een standaard tileLayer toe
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);
    }
  });
</script>

<!-- De kaart container -->
<div id="map" style="width: 100%; height: 700px;"></div>


<!-- De styling van alle componenten -->
<style>
  @import "../styles/Global.css";
</style>
