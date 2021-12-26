import { useEffect, useState } from "react"
import { Slider } from '@material-ui/core';

import PriceGraph from "./PriceGraph";
import { PriceInfo } from "interfaces/PriceInfo";

const PriceFilter = (props: any) => {
    const [priceInfo, setPriceInfo] = useState<PriceInfo>()

    useEffect(() => {
        setPriceInfo(props.priceInfo)
    }, [props.auctions])


    const onSliderChange = (e: any, newValues: any) => {
        props.setPriceRange(newValues);
    }

	return (
		<div className="price-filter">
			<h6 className="filter-title">FILTER BY PRICE</h6>
            <PriceGraph auctions={props.auctions} />
            <div className="slider">
                <Slider value={props.priceRange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={priceInfo?.minPrice}
                        max={priceInfo?.maxPrice}
                        onChange={onSliderChange} 
                />
            </div>
			<p className="price-text">${priceInfo?.minPrice}-${priceInfo?.maxPrice}</p>
			<p className="price-text">The average price is ${priceInfo?.avgPrice.toFixed(2)}</p>
		</div>
	)
}

export default PriceFilter
