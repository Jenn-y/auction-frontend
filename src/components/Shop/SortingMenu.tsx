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
				setSelectedSort("Last Chance")
				props.setSortType("oldToNew")
				break;
			case "New Arrivals":
				setSelectedSort("New Arrivals")
				props.setSortType("newToOld")
				break;
			case "Lowest Price":
				setSelectedSort("Lowest Price")
				props.setSortType("lowestPrice")
				break;
			case "Highest Price":
				setSelectedSort("Highest Price")
				props.setSortType("highestPrice")
				break;
			default:
				setSelectedSort("Default Sorting")
				props.setSortType("default")
				break;
		}
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
