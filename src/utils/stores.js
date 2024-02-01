import { writable } from 'svelte/store';

export const overlayStatus = writable(true); // Standaard op true voor HomeOverlay bij opstarten
export const overlayContent = writable("home"); // Standaard op "home"
export const activeMenuItem = writable("home"); // Active menu item op "home" bij opstarten
export const homeContent = writable({
  home: [
    {
      title: "Herontworpen kruispunten",
      description: "Een beschrijving van herontworpen kruispunten.",
      image: "../fotos/kruispunt/home/home-foto1.png",
      overlay: "herontworpen"
    },
    {
      title: "Opvallende kruispunten",
      description: "Een beschrijving van opvallende kruispunten.",
      image: "../fotos/kruispunt/home/home-foto2.png",
      overlay: "opvallend"
    },
    {
      title: "Herontwerp VRI",
      description: "Een beschrijving van opvallende kruispunten.",
      image: "../fotos/kruispunt/home/home-foto3.png",
      overlay: "VRI"
    },

  ],
  herontworpen: Array.from({ length: 32 }, (_, i) => ({
    naam: `Herontworpen Kruispunt ${i + 1}`,
    beschrijving: `Beschrijving voor herontworpen kruispunt ${i + 1}`,
    image: `../fotos/kruispunt/herontworpen/her-foto${i + 1}.png`,
    cordinaten: [52.370216, 4.895168],
  })),

  opvallend: Array.from({ length: 22 }, (_, i) => ({
    naam: `Opvallend Kruispunt ${i + 1}`,
    beschrijving: `Beschrijving voor opvallend kruispunt ${i + 1}`,
    image: `../fotos/kruispunt/opvallende/opval-foto${i + 1}.png`,
    cordinaten: [52.370216, 4.895168],
  })),
});
