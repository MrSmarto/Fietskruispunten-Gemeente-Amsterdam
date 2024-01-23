export const geofietspuntencolors = (layer) => {
    switch (layer) {
      case '110_asfalt_fiets_zwart_vlak':
        return '#8c8c8c'; // Zwart/grijs
      case '120_asfalt_fiets_rood_vlak':
        return '#ed7070'; // Rood
      case '200_klinker_rood_vlak':
        return '#ff8c00'; // Oranje
      case '130_tegelwerk_fiets_rood_vlak':
        return '#ed7070'; // Rood
      case '210_tegelwerk_grijs_ vlak':
        return '#c9c9c9'; // Grijs
      case '300_ovbaan_zwart_vlak':
        return '#434343'; // Donkergrijs
      case '500_markering_wit_vlak':
        return '#ffffff'; // Wit
      case '50_groenvak_vlak':
        return '#008000'; // Groen
      default:
        return 'none'; // Geen kleur / transparant
    }
  };
  