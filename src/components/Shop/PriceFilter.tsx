import { useEffect, useState } from "react"
import { Slider } from '@material-ui/core';
import AuctionService from "services/AuctionService"
import PriceGraph from "./PriceGraph";

const PriceFilter = (props: any) => {

	const [minPrice, setMinPrice] = useState<number>(20)
    const [maxPrice, setMaxPrice] = useState<number>(200)
    const [averagePrice, setAveragePrice] = useState<number>(0)

	useEffect(() => {
		setPriceFilter()
	}, [props.auctions])

	const setPriceFilter = () => {
        getMinPrice()
        getMaxPrice()
        getAveragePrice()
        props.setPriceRange([minPrice, maxPrice]);
    }

    const getMinPrice = () => {
        AuctionService.getMinPrice(props.auctions.map((a: any) => a.id))
            .then(response => {
                if (response) {
                    setMinPrice(response)
                }
            })
    }

    const getMaxPrice = () => {
        AuctionService.getMaxPrice(props.auctions.map((a: any) => a.id))
            .then(response => {
                if (response) {
                    setMaxPrice(response)
                }
            })
    }

    const getAveragePrice = () => {
        AuctionService.getAveragePrice(props.auctions.map((a: any) => a.id))
            .then(response => {
                if (response) {
                    setAveragePrice(response)
                }
            })
    }

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
                        min={minPrice}
                        max={maxPrice}
                        onChange={onSliderChange} 
                />
            </div>
			<p className="price-text">${minPrice}-${maxPrice}</p>
			<p className="price-text">The average price is ${averagePrice?.toFixed(2)}</p>
		</div>
	)
}

export default PriceFilter
