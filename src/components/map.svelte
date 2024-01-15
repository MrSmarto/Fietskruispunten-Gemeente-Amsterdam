<!-- src/components/Map.svelte -->
<script>
  import { onMount } from "svelte";
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";

  let map;

  onMount(() => {
    map = L.map("map").setView([52.3676, 4.9041], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);
  });
</script>

<div id="map" style="height: 500px;"></div>
