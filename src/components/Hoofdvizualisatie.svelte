<script>
  import { onMount, afterUpdate } from "svelte";
  import * as d3 from "d3";
  import dataset from "../public/data/data2021.json";

  let selectedDatum;
  let x, y, height;
  let bars;
  let circles;
  let dateRect;
  let properties = ["2202", "2402", "2602", "2802"];
  let clickedDatum;
  let svg;

  function createChart() {
    if (!dataset || dataset.length === 0) {
      console.error("Dataset is leeg of ongedefinieerd.");
      return;
    }

    const margin = { top: 0, right: 0, bottom: 0, left: 0 };
    const width = 700 - margin.left - margin.right;
    height = 120 - margin.top - margin.bottom;

    const container = d3
      .select("#chart-container")
      .style("position", "relative")
      .style("height", "100vh")
      .style("text-align", "center");

    svg = container
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("position", "absolute")
      .style("bottom", 0)
      .style("left", "50%")
      .style("transform", "translateX(-50%)");
      

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
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.datum))
      .attr("width", x.bandwidth())
      .attr("y", (d) => y(d.totaal))
      .attr("height", (d) => height - y(d.totaal))
      .attr("fill", "grey")
      .on("mouseover", function (event, datum) {
        handleMouseOver(datum, this);
      })
      .on("mouseout", function (event, datum) {
        handleMouseOut(datum, this);
      })
      .on("click", function (event, datum) {
        handleClick(datum);
      });

    circles = [];

    properties.forEach((property, index) => {
      let topPosition, leftPosition;

      const squareSize = 330;

      // Calculate positions to center the circles
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2 - 220;

      const row = Math.floor(index / 2);
      const col = index % 2;

      topPosition = centerY + row * squareSize - squareSize / 2 + "px";
      leftPosition = centerX + col * squareSize - squareSize / 2 + "px";

      const circle = container
        .append("div")
        .style("position", "absolute")
        .style("top", topPosition)
        .style("left", leftPosition)
        .style("transform", "translateX(-50%)")
        .style("border-radius", "50%")
        .style("opacity", 0)
        .style(
          "transition",
          "opacity 1s, width 0.5s, height 0.5s, background-color 0.5s"
        )
        .style("background-color", "green");

      circles.push(circle);
    });

    dateRect = container
      .append("div")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background-color", "#f0f0f0") // Light grey color
      .style("padding", "5px")
      .style("border", "1px solid #ccc")
      .style("border-radius", "5px")
      .style("width", "150px")
      .style("height", "40px")
      .style("left", "130px") // Positioned at the left
      .style("top", "670px"); // Positioned 60px above the bar chart
  }

  function handleMouseOver(datum, element) {
    selectedDatum = datum;
    d3.select(element)
      .attr("fill", "orange")
      .attr("height", height - y(datum.totaal) + 5);

    dateRect.transition().duration(200).style("opacity", 0.9);
    const dateValue = datum.datum !== undefined ? datum.datum : "N/A";
    const totalValue = datum.totaal !== undefined ? datum.totaal : "N/A";
    dateRect.html(`Datum: ${dateValue}<br>Totaal: ${totalValue}`);

    circles.forEach((circle, index) => {
      const value = datum[properties[index]];
      const normalizedValue =
        value / d3.max(dataset, (d) => d[properties[index]]);
      const interpolatedColor = d3.interpolate("green", "red")(normalizedValue);
      const radius = Math.sqrt(value);

      circle
        .style("background-color", interpolatedColor)
        .style("width", `${2 * radius}px`)
        .style("height", `${2 * radius}px`)
        .style("opacity", 0.7); // Set opacity to 50%
    });

    updateChart();
  }

  function handleMouseOut(datum, element) {
    selectedDatum = null;
    d3.select(element)
      .attr("fill", "grey")
      .attr("height", (d) => height - y(d.totaal));

    updateChart();
  }

  function updateBars() {
    bars
      .attr("x", (d) => x(d.datum))
      .attr("width", x.bandwidth())
      .attr("y", (d) => y(d.totaal))
      .attr("height", (d) => height - y(d.totaal));
  }

  function updateChart() {
    updateBars();
  }

  function updateDateRect() {
    // Bijwerken van de datum rechthoek
    dateRect.html(
      `Datum: ${clickedDatum.datum}<br>Totaal: ${clickedDatum.totaal}`
    );
  }

  onMount(createChart);
  afterUpdate(updateChart);
</script>

<!-- Dit is de container die de barchart zal bevatten -->
<div id="viz-container">
  <div id="chart-container"></div>
</div>

<style>
    @import "../styles/global.css";
</style>
