import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

import AuctionService from 'services/AuctionService';
import CategoryService from 'services/CategoryService';
import GridLayout from 'shared/grid_layout/GridLayout';

import './Shop.scss';

const Shop = (props: any) => {

	const [auctions, setAuctions] = useState([])
	const [categories, setCategories] = useState([])
	const [subcategories, setSubcategories] = useState([])
	const [activeCategory, setActiveCategory] = useState<string>()
	const [showSubcategories, setShowSubcategories] = useState(false)

	useEffect(() => {
		const categoryId = props.match.params.categoryId
		if (categoryId !== undefined && categoryId !== "all") {
			getAuctionsByCategoryId(categoryId)
		} else {
			getAllAuctions()
		}
		
		CategoryService.getAllCategories()
			.then(response => {
				if (response) {
					setCategories(response)
				}
			})
	}, [])

	const getAllAuctions = () => {
		AuctionService.getNewArrivals()
			.then(response => {
				if (response) {
					setAuctions(response)
				}
			})
	}

	const getAuctionsByCategoryId = (categoryId: string) => {
		AuctionService.getAuctionsByCategoryId(categoryId)
			.then(response => {
				if (response) {
					setAuctions(response)
				}
			})
		setActiveCategory(categoryId)
	}

	const getSubcategoriesByCategoryId = (categoryId: string) => {
		CategoryService.getSubcategoriesByCategoryId(categoryId)
			.then(response => {
				if (response) {
					setSubcategories(response)
				}
			})
	}
	
	const getIcon = (activeCategory: any, category: any) => {
		return activeCategory === category ? faMinus : faPlus
	}

	const handleCategoryClick = (categoryId: string) => {
		getAuctionsByCategoryId(categoryId)
		getSubcategoriesByCategoryId(categoryId)
	}
	
    return (
        <div className="container">
			<div className="row">
				<div className="col-12 col-sm-3 col-lg filters">
					<div className="prod-categories">
						<h6 className="cat-title">PRODUCT CATEGORIES</h6>
						<ul className="cat-list">
							{categories.map((category: any) => {
								return (
									<li key={category.id}>
										<div id="parent-category" className={activeCategory === category.id ? 'active' : 'inactive'}>
											<p className="category" onClick={() => handleCategoryClick(category.id)}>{category.name}</p>
											<div><FontAwesomeIcon icon={getIcon(activeCategory, category.id)} onClick={() => handleCategoryClick(category.id)} size="xs" id="icon"/></div>
										</div>
										{activeCategory === category.id ?
											subcategories.map((subcategory: any) => {
												return (
													<div className="subcategory">
														<input type="checkbox" name="subcategory" />
														<label htmlFor="subcategory">{subcategory.name} (120)</label>
													</div>
												)
											}) : ''
										}
									</li>
								)})
							}
						</ul>
					</div>
				</div>
				<div className="col-12 col-sm-9 col-lg product-view">
					<div>
						<GridLayout 
							auctions={auctions}
							numOfCols={4}
						/>
					</div>
					{/* <div className="expand">
						<button className="explore-btn">EXPLORE MORE</button>
					</div> */}
				</div>
			</div>
		</div>
    );
}

export default Shop;
