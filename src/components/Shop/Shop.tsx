import { faMinus, faPlus, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Category } from 'interfaces/Category';
import { useEffect, useState } from 'react';

import AuctionService from 'services/AuctionService';
import CategoryService from 'services/CategoryService';
import GridLayout from 'shared/grid_layout/GridLayout';

import './Shop.scss';
import SubcategoriesList from './SubcategoriesList';

const Shop = (props: any) => {

	const [auctions, setAuctions] = useState([])
	const [categories, setCategories] = useState([])
	const [activeCategories, setActiveCategories] = useState<string[]>([])
	const [activeSubcategories, setActiveSubcategories] = useState<Category[]>([])
	const [selectedCategories, setSelectedCategories] = useState<Category[]>([])

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
		setActiveCategories([...activeCategories, categoryId])
	}

	// const getFilteredAuctions = () => {
	// 	AuctionService.getFilteredAuctions(activeCategory, activeSubcategories.map(c => c.id))
	// 		.then(response => {
	// 			if (response) {
	// 				setAuctions(response)
	// 			}
	// 		})
	// }

	const handleCategoryClick = (category: any) => {
		getAuctionsByCategoryId(category.id)
		setSelectedCategories([...activeCategories, category])
	}

	const handleIconClick = (categoryId: string) => {
		// getSubcategoriesByCategoryId(categoryId)
	}

	const getIcon = (category: any) => {
		return isSelectedCategory(category.id) ? faMinus : faPlus
	}

	const isSelectedCategory = (categoryId: any) => {
		return selectedCategories.some((category: any) => category === categoryId) ? true : false
	}

	const onClearAllClick = () => {
        setActiveSubcategories([]);
        setActiveCategories([]);
        setSelectedCategories([]);
    }

	const onRemoveTagClick = (subcategoryId: string) => {
        setActiveSubcategories(activeSubcategories.filter(category => category.id !== subcategoryId))
        setActiveCategories(activeCategories.filter(category => category !== subcategoryId))
        setSelectedCategories(selectedCategories.filter(category => category.id !== subcategoryId))
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
										<div id="parent-category" className={isSelectedCategory(category.id) ? 'active' : 'inactive'}>
											<p className="category" onClick={() => handleCategoryClick(category)}>{category.name}</p>
											<div><FontAwesomeIcon icon={getIcon(category.id)} onClick={() => handleIconClick(category.id)} size="xs" id="icon"/></div>
										</div>
										{isSelectedCategory(category.id) ? 
											<SubcategoriesList category={category} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} /> : ''
										}
									</li>
								)})
							}
						</ul>
					</div>
				</div>
				<div className="col-12 col-sm-9 col-lg product-view">
					<div className="tag-area">
						{selectedCategories.map((category: any) => {
							return (
								<div key={category.id} className="subcategory-tag">{category.name} <span><FontAwesomeIcon icon={faTimesCircle} color="white" onClick={() => onRemoveTagClick(category.id)} /></span></div>
							)
						})}
						{selectedCategories.length > 0 ? 
							<div className="clear-tags" onClick={onClearAllClick}>Clear all</div> : ''
						}
                    </div>
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
