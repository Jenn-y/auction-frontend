import { useEffect, useRef } from "react";
import * as d3 from 'd3';

import AuctionService from "services/AuctionService";

const PriceGraph = (props: any) => {
    const ref = useRef<SVGSVGElement>(null)
    const width = 200;
    const height = 50;

    const drawGraph = (data: number[]) => {
        const svg = d3.select(ref.current!)
            .attr("width", width)
            .attr("height", height);

        let selection = svg.selectAll("rect").data(data);

        let yScale = d3.scaleLinear()
            .domain([0, d3.max(data) as unknown as number])
            .range([0, height]);

        selection
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * width / data.length)
            .attr("y", (d: any) => height - yScale(d))
            .attr("width", width / data.length)
            .attr("height", (d: any) => yScale(d))
            .attr("fill", "#E4E5EC")
            .exit()
            .remove();
    }

    useEffect(() => {
        AuctionService.getPriceCount(props.auctions.map((a: any) => a.id)).then((response) => drawGraph(response.map((i: any) => i.count)))
    }, [props.auctions]);

    return (
        <svg ref={ref}></svg>
    )
}

export default PriceGraph
