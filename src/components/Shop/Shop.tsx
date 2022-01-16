import { faMinus, faPlus, faTimesCircle, faTh, faThList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import AuctionService from 'services/AuctionService';
import CategoryService from 'services/CategoryService';
import { Auction } from 'interfaces/Auction';
import { Category } from 'interfaces/Category';
import { PriceInfo } from 'interfaces/PriceInfo';
import GridView from 'shared/product_layout/GridView';
import ListView from 'shared/product_layout/ListView';
import PriceFilter from './PriceFilter';
import SubcategoriesList from './SubcategoriesList';
import SortingMenu from './SortingMenu';

import './Shop.scss';

const Shop = (props: any) => {
    let search = new URLSearchParams(useLocation().search).get("searchText")
    const searchText = search ? search : ""

    const [auctions, setAuctions] = useState<Auction[]>([])
    const [categories, setCategories] = useState([])
    const [activeCategories, setActiveCategories] = useState<Category[]>([])
    const [openedCategories, setOpenedCategories] = useState<Category[]>([])
    const [priceInfo, setPriceInfo] = useState<PriceInfo>()
    const [priceRange, setPriceRange] = useState<number[]>([])
    const [sortType, setSortType] = useState<string>("default")
    const [gridView, setGridView] = useState(true)
    const [didYouMeanText, setDidYouMeanText] = useState("")
    const [page, setPage] = useState(0)
    const [showExploreMoreButton, setShowExploreMoreButton] = useState(true)

    useEffect(() => {
        setDidYouMeanText("some")
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
        setPage(0)
        getFilteredAuctions()
    }, [activeCategories, priceRange, sortType])

    const getFilteredAuctions = () => {
        AuctionService.getFilteredAuctions(searchText, priceRange[0], priceRange[1], activeCategories.map(c => c.id), sortType, 0)
            .then(response => {
                if (response) {
                    setAuctions(response.content)
                    setShowExploreMoreButton(!response.last);
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

    const handleViewClick = () => {
		setGridView(!gridView)
	}

    const onDidYouMeanClick = () => {
        window.location.replace(`/shop/all?searchText=${didYouMeanText}`)
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

    const nextPage = () => {
        setPage(page + 1)
        AuctionService.getFilteredAuctions(searchText, priceRange[0], priceRange[1], activeCategories.map(c => c.id), sortType, page + 1)
            .then(response => {
                if (response) {
                    setAuctions([...auctions, ...response.content])
                    setShowExploreMoreButton(!response.last);
                }
            })
    }
    
    return (
        <div className="shop-page">
            <div className="did-you-mean">
                <p>Did you mean? <span onClick={onDidYouMeanClick}>{didYouMeanText}</span></p>
            </div>
        
            <div className="container">
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
                        <div className="sorting-view">
                            <div>
                                <SortingMenu sortType={sortType}
                                            setSortType={setSortType}
                                />
                            </div>
                            <div>
                                <button className={gridView ? 'view-button active' : 'view-button'} onClick={handleViewClick}><FontAwesomeIcon icon={faTh} className="view-icon" />Grid</button>
                                <button className={!gridView ? 'view-button active' : 'view-button'} onClick={handleViewClick}><FontAwesomeIcon icon={faThList} className="view-icon" />List</button>
                            </div>
                        </div>
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
                            {gridView ? 
                                <GridView 
                                    auctions={auctions}
                                    numOfCols={4}
                                /> :
                                <ListView 
                                    auctions={auctions}
                                />
                            }
                        </div>
                        {showExploreMoreButton ? 
                            <div className="expand">
                                <button className="explore-btn" onClick={nextPage}>Explore More</button>
                            </div> : ""
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shop;
