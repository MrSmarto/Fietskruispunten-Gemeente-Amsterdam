<script>
  var mymap = L.map("mapid").setView([52.3676, 4.9041], 13); // Coördinaten voor Amsterdam

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "© OpenStreetMap contributors",
  }).addTo(mymap);
</script>
