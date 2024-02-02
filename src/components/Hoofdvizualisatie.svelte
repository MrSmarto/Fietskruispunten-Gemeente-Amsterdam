<script>
  import { onMount, afterUpdate } from "svelte";
  import * as d3 from "d3";
  import dataset from "../public/data/data2021.json"; // Zorg ervoor dat het pad correct is

  let selectedDatum = null;
  let svg;
  let bars;
  let x, y, height, width;

  function createChart() {
    const container = d3.select("#viz-container");
    const containerWidth = container.node().getBoundingClientRect().width - 40; // 40px padding
    const margin = { top: 20, right: 20, bottom: 0, left: 20 }; // Verhoog de top margin voor info tekst
    width = containerWidth - margin.left - margin.right;
    height = 120 - margin.top - margin.bottom;

    svg = container
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom) // Verhoog de hoogte voor info tekst
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`); // Verschuif het grafiekgebied naar beneden

    x = d3
      .scaleBand()
      .domain(dataset.map((d) => d.datum))
      .range([0, width])
      .padding(0.1);

    y = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, (d) => d.totaal)])
      .range([height, 0]);

    bars = svg
      .selectAll(".bar")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.datum))
      .attr("y", (d) => y(d.totaal))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.totaal))
      .attr("fill", "grey")
      .on("mouseover", (event, d) => {
        selectedDatum = d;
        d3.select(event.target).attr("fill", "red");
        updateInfoText(d);
      })
      .on("mouseout", (event, d) => {
        d3.select(event.target).attr("fill", "grey");
        selectedDatum = null;
        updateInfoText(null);
      });

    updateInfoText(null); // Initializeer met geen selectie
  }

  function updateInfoText(datum) {
    const infoText = datum
      ? `<strong>Datum:</strong> ${datum.datum}<br><strong>Totaal:</strong> ${datum.totaal}`
      : "Hover over een bar voor details.";
    d3.select("#info-text").html(infoText);
  }

  onMount(() => {
    createChart();
  });

  afterUpdate(() => {
    updateInfoText(selectedDatum);
  });
</script>

<div
  id="viz-container"
  style="position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 80%; height: 20vh; overflow: hidden; background-color: rgba(255, 255, 255, 0.9); border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"
>
  <div
    id="info-text"
    style="padding: 10px; text-align: left; font-size: 12px; position: absolute; top: 0; left: 20px;"
  ></div>
</div>

<style>
  .bar:hover {
    fill: red; /* Kleurt de bar rood bij hover */
  }
</style>
