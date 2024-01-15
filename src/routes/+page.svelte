<script>
  import { onMount } from "svelte";

  import MapComponent from "../components/map.svelte";

  let map;
  let isDarkMode = false;

  onMount(async () => {
    if (typeof window !== "undefined") {
      const leaflet = await import("leaflet");
      const L = leaflet.default;
      await import("leaflet/dist/leaflet.css");

      map = L.map("map").setView([52.3676, 4.9041], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);
    }
  });

  function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    const mapElement = document.getElementById("map");
    mapElement.style.backgroundColor = isDarkMode ? "black" : "";
  }
</script>

<!-- Bevat de Leaflet-kaart. -->
<MapComponent />

<button on:click={toggleDarkMode}>Toggle Dark Mode</button>

<!-- De styling van alle componenten -->
<style>
  @import "../styles/global.css";
</style>
