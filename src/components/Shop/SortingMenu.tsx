import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';

import AuctionService from 'services/AuctionService';

const SortingMenu = (props: any) => {

	const [selectedSort, setSelectedSort] = useState<string>("Default Sorting")

	useEffect(() => {
		onSortClick(selectedSort)
	}, [selectedSort])

	const onSortClick = (sortType: any) => {
		switch (sortType) {
			case "Last Chance":
				sortAuctionsByOldToNew()
				break;
			case "New Arrivals":
				sortAuctionsByNewToOld()
				break;
			case "Lowest Price":
				sortAuctionsByLowestPrice()
				break;
			case "Highest Price":
				sortAuctionsByHighestPrice()
				break;
			default:
				sortAuctionsByDefault()
				break;
		}
	}

	const sortAuctionsByDefault = () => {
		AuctionService.getAuctionsByDefaultSort(props.auctions.map((a: any) => a.id))
			.then(response => {
				if (response) {
					props.setAuctions(response)
					setSelectedSort("Default Sorting")
				}
			})
	}

	const sortAuctionsByOldToNew = () => {
		AuctionService.getAuctionsByOldToNew(props.auctions.map((a: any) => a.id))
			.then(response => {
				if (response) {
					props.setAuctions(response)
					setSelectedSort("Last Chance")
				}
			})
	}

	const sortAuctionsByNewToOld = () => {
		AuctionService.getAuctionsByNewToOld(props.auctions.map((a: any) => a.id))
			.then(response => {
				if (response) {
					props.setAuctions(response)
					setSelectedSort("New Arrivals")
				}
			})
	}
	const sortAuctionsByLowestPrice = () => {
		AuctionService.getAuctionsByPriceAsc(props.auctions.map((a: any) => a.id))
			.then(response => {
				if (response) {
					props.setAuctions(response)
					setSelectedSort("Lowest Price")
				}
			})
	}

	const sortAuctionsByHighestPrice = () => {
		AuctionService.getAuctionsByPriceDesc(props.auctions.map((a: any) => a.id))
			.then((response: any) => {
				if (response) {
					props.setAuctions(response)
					setSelectedSort("Highest Price")
				}
			})
	}
	
    return (
		<Dropdown className="sorting-menu">
			<Dropdown.Toggle id="dropdown-basic">
				{selectedSort}
			</Dropdown.Toggle>

			<Dropdown.Menu>
				<Dropdown.Item as="button" onClick={() => onSortClick("Default Sorting")}>Default Sorting</Dropdown.Item>
				<Dropdown.Item as="button" onClick={() => onSortClick("New Arrivals")}>New Arrivals</Dropdown.Item>
				<Dropdown.Item as="button" onClick={() => onSortClick("Last Chance")}>Last Chance</Dropdown.Item>
				<Dropdown.Item as="button" onClick={() => onSortClick("Lowest Price")}>Lowest Price</Dropdown.Item>
				<Dropdown.Item as="button" onClick={() => onSortClick("Highest Price")}>Highest Price</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
					
    );
}

export default SortingMenu
