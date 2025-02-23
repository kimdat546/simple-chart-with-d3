import * as d3 from "d3";

const drawChart = (element, data) => {
    const boxSize = 500;
    const outerRadius = boxSize / 2;
    const innerRadius = 180;

    d3.select(element).select("svg").remove(); // Remove the old svg
    d3.select(element).select("#tooltip").remove(); // Remove the old svg
    // Create new svg
    const svg = d3
        .select(element)
        .append("svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("height", "100%")
        .attr("width", "100%")
        .attr("viewBox", `0 0 ${boxSize} ${boxSize}`)
        .attr("class", "shadow")
        .append("g")
        .attr("transform", `translate(${outerRadius}, ${outerRadius})`);

    const arcGenerator = d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    const pieGenerator = d3
        .pie()
        .value((d) => d.value)
        .sort(null)
        .padAngle(0.03);

    const tooltip = d3
        .select(element)
        .append("div")
        .attr("id", "tooltip")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("top", "0px")
        .style("left", "0px")
        .style("z-index", "10")
        .style("transition", "all 0.15s ease")
        .style("display", "none");

    d3.select(element).on("mouseleave", () => {
        tooltip.style("display", "none");
    });

    const arcs = svg.selectAll().data(pieGenerator(data)).enter();
    arcs.append("path")
        .attr("d", arcGenerator)
        .style("fill", (d) => d.data.color)
        .style("cursor", "pointer")
        .on("mouseover", (e, d) => {
            tooltip.style("display", "block");
            // Update the tooltip content
            tooltip.html(
                `<div class="chart-label"><span class="chart-label-color" style="background: ${d.data.color};"></span><div class="chart-label-info">${d.data.label}: ${d.data.value}</div></div>`
            );
            // Get the current mouse position
            const { clientX: x, clientY: y } = e;
            // Update the tooltip position
            tooltip.style("transform", `translate(${x}px, ${y}px)`);
            // the path is on hover,set opacity to 0.5
            d3.select(e.target).style("opacity", 0.8);
        })
        .on("mousemove", function (e) {
            // Get the current mouse position
            const { clientX: x, clientY: y } = e;
            // Update the tooltip position
            tooltip.style("transform", `translate(${x}px, ${y}px)`);
        })
        .on("mouseout", function (e) {
            // Hide the tooltip
            // tooltip.style("display", "none");
            d3.select(e.target).style("opacity", 1);
        })
        .transition()
        .duration(1000)
        // .attrTween("d", function (d) {
        //     const i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
        //     return function (t) {
        //         d.endAngle = i(t);
        //         return arcGenerator(d);
        //     };
        // })
        .attrTween("d", function (d) {
            const i = d3.interpolate(
                {
                    startAngle: 0,
                    endAngle: 0,
                },
                d
            );
            return function (t) {
                return arcGenerator(i(t));
            };
        });
};

export default drawChart;
