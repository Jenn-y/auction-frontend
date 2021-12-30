import { faMinus, faPlus, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

import AuctionService from 'services/AuctionService';
import CategoryService from 'services/CategoryService';
import GridLayout from 'shared/grid_layout/GridLayout';
import PriceFilter from './PriceFilter';
import SubcategoriesList from './SubcategoriesList';
import { Category } from 'interfaces/Category';
import { PriceInfo } from 'interfaces/PriceInfo';

import './Shop.scss';

const Shop = (props: any) => {

    const [auctions, setAuctions] = useState([])
    const [categories, setCategories] = useState([])
    const [activeCategories, setActiveCategories] = useState<Category[]>([])
    const [openedCategories, setOpenedCategories] = useState<Category[]>([])
    const [priceInfo, setPriceInfo] = useState<PriceInfo>()
    const [priceRange, setPriceRange] = useState<number[]>([]);

    useEffect(() => {
        const categoryId = props.match.params.categoryId

        AuctionService.getPriceInfo()
            .then(response => {
                if (response) {
                    setPriceInfo(response)
                    setPriceRange([response.minPrice, response.maxPrice])
                }
            })
        
        if (categoryId !== "all") {
            CategoryService.getCategory(categoryId)
            .then(response => {
                if (response) {
                    setActiveCategories([...activeCategories, response])
                    setOpenedCategories([...openedCategories, response])
                }
            })
        } 
        
        CategoryService.getAllCategories()
            .then(response => {
                if (response) {
                    setCategories(response)
                }
            })
		
		getFilteredAuctions()
    }, [])

    useEffect(() => {
        getFilteredAuctions()
    }, [activeCategories, priceRange])

    const getFilteredAuctions = () => {
        AuctionService.getFilteredAuctions(priceRange[0], priceRange[1], activeCategories.map(c => c.id))
            .then(response => {
                if (response) {
                    setAuctions(response)
                }
            })
    }

    const handleCategoryClick = (clickedCategory: any) => {
        if (!activeCategories.some((category: any) => category.id === clickedCategory.id)) {
            setActiveCategories([...activeCategories, clickedCategory])
            setOpenedCategories([...openedCategories, clickedCategory])
        } else {
            onRemoveTagClick(clickedCategory)
        }
    }

    const handleIconClick = (clickedCategory: any) => {
        if (!isOpenedCategory(clickedCategory)) {
            setOpenedCategories([...openedCategories, clickedCategory])
        } else {
            setOpenedCategories(openedCategories.filter((category: any) => category.id !== clickedCategory.id))
        }
    }

    const getIcon = (category: any) => {
        return isOpenedCategory(category) ? faMinus : faPlus
    }

    const isActiveCategory = (activeCategory: any) => {
        return activeCategories.some((category: any) => category.id === activeCategory.id) ? true : false
    }

    const isOpenedCategory = (openedCategory: any) => {
        return openedCategories.some((category: any) => category.id === openedCategory.id) ? true : false
    }

    const onClearAllClick = () => {
        setActiveCategories([]);
    }

    const onRemoveTagClick = (clickedCategory: any) => {
        if (activeCategories.length <= 1) {
            onClearAllClick()
            getFilteredAuctions()
        } else {
            setActiveCategories(activeCategories.filter(category => category.id !== clickedCategory.id))
            setOpenedCategories(openedCategories.filter(category => category.id !== clickedCategory.id))
        }
    }
    
    return (
        <div className="container shop-page">
            <div className="row">
                <div className="col-12 col-sm-3 col-lg filters">
                    <div className="prod-categories">
                        <h6 className="filter-title">PRODUCT CATEGORIES</h6>
                        <ul className="cat-list">
                            {categories.map((category: any) => {
                                return (
                                    <li key={category.id}>
                                        <div id="parent-category" className={isActiveCategory(category) ? 'active' : 'inactive'}>
                                            <p className="category" onClick={() => handleCategoryClick(category)}>{category.name}</p>
                                            <div><FontAwesomeIcon icon={getIcon(category)} onClick={() => handleIconClick(category)} size="xs" id="icon"/></div>
                                        </div>
                                        {isOpenedCategory(category) || isActiveCategory(category) ? 
                                            <SubcategoriesList category={category} 
                                                               activeCategories={activeCategories} 
                                                               setActiveCategories={setActiveCategories}
                                                               onRemoveTagClick={onRemoveTagClick}
                                            /> : ''
                                        }
                                    </li>
                                )})
                            }
                        </ul>
                    </div>
                    <PriceFilter auctions={auctions}
                                 priceInfo={priceInfo}
                                 priceRange={priceRange}
                                 setPriceRange={setPriceRange} 
                    />
                </div>
                <div className="col-12 col-sm-9 col-lg product-view">
                    <div className="tag-area">
                        {activeCategories.map((category: any) => {
                            return (
                                <div key={category.id} className="category-tag">{category.name} <span><FontAwesomeIcon icon={faTimesCircle} color="white" onClick={() => onRemoveTagClick(category)} /></span></div>
                            )
                        })}
                        {activeCategories.length > 0 ? 
                            <div className="clear-tags" onClick={onClearAllClick}>Clear all</div> : ''
                        }
                    </div>
                    <div>
                        <GridLayout 
                            auctions={auctions}
                            numOfCols={4}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shop;
