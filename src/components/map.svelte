<script>
    import { onMount } from 'svelte';
    import L from 'leaflet';
  
    let map;
  
    onMount(() => {
      map = L.map('map').setView([52.3676, 4.904
  1], 13); // De coördinaten voor Amsterdam
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  });
</script>

<div id="map" style="width: 100%; height: 500px;"></div>

<style>
  #map {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
