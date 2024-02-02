<script>
  import { onMount, afterUpdate } from "svelte";
  import * as d3 from "d3";
  import dataset from "../public/data/data2021.json"; // Zorg ervoor dat het pad correct is

  let selectedDatum = null;
  let svg;
  let bars;
  let x, y, xAxis, yAxis, yAxisGroup;
  let height, width;

  function createChart() {
    const container = d3.select("#viz-container");
    const containerWidth = container.node().getBoundingClientRect().width;
    const containerHeight = container.node().getBoundingClientRect().height;
    const margin = { top: 30, right: 0, bottom: 0, left: 50 };
    width = containerWidth - margin.left - margin.right;
    height = containerHeight - margin.top - margin.bottom - 20; // -20 voor wat witruimte

    svg = container
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    x = d3
      .scaleBand()
      .domain(dataset.map((d) => d.datum))
      .range([0, width])
      .padding(0.1);

    y = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, (d) => d.totaal)])
      .range([height, 0]);

    yAxis = d3.axisLeft(y).ticks(5);
    yAxisGroup = svg.append("g").call(yAxis);

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
      })
      .on("mouseout", (event, d) => {
        d3.select(event.target).attr("fill", "grey");
        selectedDatum = null;
      });
  }

  onMount(() => {
    createChart();
  });

  afterUpdate(() => {
    if (selectedDatum) {
      // update logica voor info text
    }
  });
</script>

<div
  id="viz-container"
  style="position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 95%; height: 20vh; background-color: white; padding: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); border-radius: 10px;"
>
  <div
    class="controls"
    style="position: absolute; top: 10px; left: 10px; right: 10px; height: 15%; display: flex; justify-content: space-between; align-items: center;"
  >
    <select id="metric-selector">
      <option>Max aantal wachtende</option>
      <option>Totaal aantal fietsers</option>
      <option>Rood groen rijders</option>
      <option>Gemiddelde wachtijd</option>
    </select>
    <select id="year-selector">
      <option>2024</option>
      <option>2023</option>
      <option>2022</option>
      <option>2021</option>
      <option>2020</option>
      <option>2019</option>
      <option>2018</option>
      <option>2017</option>
      <option>2016</option>
      <option>2015</option>
    </select>
    <div
      id="info-text"
      style="text-align: right; flex-grow: 1; padding-left: 20px;"
    >
      <!-- Info text zal hier automatisch geüpdatet worden -->
    </div>
  </div>
</div>

<style>
  .bar:hover {
    fill: red; /* Kleurt de bar rood bij hover */
  }

  #viz-container {
    /* Container stijlen */
  }

  .controls {
    /* Stijlen voor de dropdowns en info text */
  }
</style>
