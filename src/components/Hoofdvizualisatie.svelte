<script>
  import { onMount, afterUpdate } from "svelte";
  import * as d3 from "d3";
  import dataset from "../public/data/data2021.json"; // Ensure the path is correct

  let selectedDatum = null;
  let svg;
  let bars;
  let x, y, xAxis, yAxis, yAxisGroup;
  let height, width;
  let hoverLine; // Variable for the horizontal guide line

  function createChart() {
    const container = d3.select("#viz-container");
    const containerWidth = container.node().getBoundingClientRect().width;
    const containerHeight = container.node().getBoundingClientRect().height;
    const margin = { top: 30, right: 0, bottom: 0, left: 50 };
    width = containerWidth - margin.left - margin.right;
    height = containerHeight - margin.top - margin.bottom - 20; // -20 for some whitespace

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

    // Append the horizontal guide line to the SVG and make it invisible
    hoverLine = svg
      .append("line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", height)
      .attr("y2", height)
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .style("opacity", 0);

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
        updateInfoText(selectedDatum);
      })
      .on("mouseout", (event, d) => {
        d3.select(event.target).attr("fill", "grey");
        selectedDatum = null;
        updateInfoText(selectedDatum);
      });
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
  style="position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 95%; height: 20vh; background-color: white; padding: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); border-radius: 10px;"
>
  <div
    class="controls"
    style="position: absolute; top: 10px; left: 10px; width: 95%; display: flex; justify-content: start; align-items: center;"
  >
    <select id="metric-selector">
      <option>Max aantal wachtende</option>
      <option>Totaal aantal fietsers</option>
      <option>Rood groen rijders</option>
      <option>Gemiddelde wachtijd</option>
    </select>
    <select id="year-selector" style="margin-left: 15px;">
      <option>2024</option>
      <option>2023</option>
      <option>2022</option>
      <option>2021</option>
      <!-- Add more years as needed -->
    </select>
  </div>
  <div
    id="info-text"
    style="position: absolute; top: 10px; right: 20px; background-color: #f9f9f9; padding: 5px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); font-size: 12px;"
  >
    <!-- Info text will be automatically updated by updateInfoText function -->
  </div>
</div>

<style>
  .bar:hover {
    fill: red; /* Highlights the bar in red on hover */
  }

  #viz-container {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 95%;
    height: 20vh;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .controls {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
    position: absolute;
    top: 0;
    left: 10px;
    width: 95%;
  }

  .info-text {
    position: absolute;
    top: 10px;
    right: 20px;
    background-color: #f9f9f9;
    padding: 5px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 12px;
  }
</style>
