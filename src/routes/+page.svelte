<script>
  import { onMount } from "svelte";
  import MapComponent from "../components/map.svelte";

  let map;


  onMount(async () => {
    if (typeof window !== "undefined") {
      const leaflet = await import("leaflet");
      const L = leaflet.default;
      await import("leaflet/dist/leaflet.css");

      map = L.map("map").setView([52.3676, 4.9041], 13);

      lightLayer = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 18,
          attribution: "© OpenStreetMap contributors",
        }
      ).addTo(map);

      darkLayer = L.tileLayer(
        "https://{s}.tile.darkmatter.map-cdn.com/{z}/{x}/{y}.png",
        {
          maxZoom: 18,
          attribution:
            "Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.",
        }
      );
    }
  });

</script>

<MapComponent />


<style>
  @import "../styles/global.css";
</style>
