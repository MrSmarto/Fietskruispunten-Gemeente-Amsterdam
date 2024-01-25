<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  let dataset = [];
  let uurdata2021 = [];
  let selectedDatum;
  let x, y, height;
  let svg;
  let circles = [];
  let bars;
  let dateRect;
  let properties = ["2202", "2402", "2602", "2802"];
  let clickedDatum;

  async function loadData() {
    const datasetResponse = await fetch("/data/data2021.json");
    dataset = await datasetResponse.json();
    const uurdataResponse = await fetch("/data/uurdata2021.json");
    uurdata2021 = await uurdataResponse.json();
    createChart();
  }

  function createChart() {
    if (!dataset || dataset.length === 0) {
      console.error("Dataset is leeg of ongedefinieerd.");
      return;
    }

    const margin = { top: 20, right: 30, bottom: 50, left: 40 };
    const width = 1400 - margin.left - margin.right;
    height = 300 - margin.top - margin.bottom;

    const container = d3
      .select("#chart-container")
      .style("position", "relative")
      .style("height", "100vh")
      .style("text-align", "center");

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

    bars = svg
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.datum))
      .attr("width", x.bandwidth())
      .attr("y", (d) => y(d.totaal))
      .attr("height", (d) => height - y(d.totaal))
      .attr("fill", "steelblue")
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)
      .on("click", handleClick);

    // Additionele visualisatie-elementen zoals circles en dateRect kunnen hier geïnitialiseerd worden
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

    // Laat de cirkels zien met een overgang van rood naar groen
    circles.forEach((circle, index) => {
      const value = datum[properties[index]];
      const normalizedValue =
        value / d3.max(dataset, (d) => d[properties[index]]); // Normaliseer de waarde
      const interpolatedColor = d3.interpolate("green", "red")(normalizedValue);
      const radius = Math.sqrt(value);

      circle
        .style("background-color", interpolatedColor)
        .style("width", `${2 * radius}px`)
        .style("height", `${2 * radius}px`)
        .style("opacity", 1);
    });

    updateChart();
  }

  function handleMouseOut(datum, element) {
    selectedDatum = null;
    d3.select(element)
      .attr("fill", "steelblue")
      .attr("height", (d) => height - y(d.totaal));

    updateChart();
  }

  function handleClick(datum) {
    clickedDatum = datum;

    // Remove existing bars
    bars.remove();

    // Draw new bars with the dataset for the clicked day
    const newData = getNewDataForClickedDatum(datum);

    x.domain(newData.map((d) => d.datum));
    y.domain([0, d3.max(newData, (d) => d.totaal)]);

    // Add new bars
    bars = svg
      .selectAll("rect")
      .data(newData)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.datum))
      .attr("width", x.bandwidth())
      .attr("y", (d) => y(d.totaal))
      .attr("height", (d) => height - y(d.totaal))
      .attr("fill", "steelblue")
      .on("mouseover", function (event, datum) {
        handleMouseOver(datum, this);
      })
      .on("mouseout", function (event, datum) {
        handleMouseOut(datum, this);
      })
      .on("click", function (event, datum) {
        handleClick(datum);
      });

    // Update date rectangle and circles
    updateBars();
    updateDateRect();
    updateCircle();
  }

  onMount(loadData);
</script>

<div id="chart-container"></div>

<style>

</style>
