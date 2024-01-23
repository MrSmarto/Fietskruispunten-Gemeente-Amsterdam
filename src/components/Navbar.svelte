<script>
  // Hier kan je JavaScript logica toevoegen indien nodig
</script>

<nav class="navbar">
  <!-- Logo, zorg ervoor dat je het juiste pad naar je logo-bestand instelt -->
  <a href="/">
    <img
      src="/path/to/logo-gemeente.png"
      alt="Gemeente Amsterdam Logo"
      class="logo"
    />
  </a>

  <!-- Navigatielinks -->
  <div class="nav-links">
    <a href="/">Home</a>
    <a href="/herontworpen">Herontworpen kruispunten</a>
    <a href="/opvallende">Opvallende kruispunten</a>
    <a href="/herontwerpVRI">Herontwerp VRI</a>
  </div>
</nav>

<style>
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background-color: #fff; /* Of welke kleur je ook kiest voor de navbar achtergrond */
  }

  .logo {
    height: 50px; /* Pas dit aan naar de gewenste grootte */
  }

  .nav-links a {
    text-decoration: none;
    margin-left: 2rem;
    font-weight: bold;
    color: #333; /* Of welke kleur je ook kiest voor de tekst */
  }

  .nav-links a:hover {
    color: #666; /* Hover effect kleur */
  }
</style>
