import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import AuctionService from 'services/AuctionService';
import GridLayout from 'shared/grid_layout/GridLayout';
import './Shop.scss';

const Shop = () => {

	const [auctions, setAuctions] = useState([])
	const [showSubcategories, setShowSubcategories] = useState(false)
	const [icon, setIcon] = useState<IconProp>(faPlus)

	useEffect(() => {
		AuctionService.getNewArrivals()
			.then(response => {
				if (response) {
					setAuctions(response)
				}
			})
	}, [])

	const handleOnClick = () => {
		if (showSubcategories) {
			setShowSubcategories(false)
			setIcon(faPlus)
		}
		else {
			setShowSubcategories(true)
			setIcon(faMinus)
		}
	}
	
    return (
        <div className="container">
			<div className="row">
				<div className="col-12 col-sm-3 col-lg left-side">
					<div className="prod-categories">
						<h6 className="cat-title">PRODUCT CATEGORIES</h6>
						<ul className="cat-list">
							<li>
								<div className="parent-category">
									<p className="category">Women</p>
									<div><FontAwesomeIcon icon={icon} size="xs" className="icon" onClick={handleOnClick} /></div>
								</div>
								{showSubcategories ? 
									<div>
										<div className="subcategory">
											<input type="checkbox" name="subcategory" />
											<label htmlFor="subcategory">Acessorise (120)</label>
										</div>
										<div className="subcategory">
											<input type="checkbox" name="subcategory" />
											<label htmlFor="subcategory">Bag (40)</label>
										</div>
										<div className="subcategory">
											<input type="checkbox" name="subcategory" />
											<label htmlFor="subcategory">Clothes (40)</label>
										</div>
										<div className="subcategory">
											<input type="checkbox" name="subcategory" />
											<label htmlFor="subcategory">Bad & Bath (40)</label>
										</div>
										<div className="subcategory">
											<input type="checkbox" name="subcategory" />
											<label htmlFor="subcategory">Swimming Tops (40)</label>
										</div>
										<div className="subcategory">
											<input type="checkbox" name="subcategory" />
											<label htmlFor="subcategory">Spot Tops & Shoes (40)</label>
										</div>
									</div> : ''
								}
							</li>
							<li>
								<div className="parent-category">
									<p className="category">Men</p>
									<div><FontAwesomeIcon icon={faPlus} size="xs" className="icon" /></div>
								</div>
							</li>
							<li>
								<div className="parent-category">
									<p className="category">Kids</p>
									<div><FontAwesomeIcon icon={faPlus} size="xs" className="icon" /></div>
								</div>
							</li>
							<li>
								<div className="parent-category">
									<p className="category">Accesorise</p>
									<div><FontAwesomeIcon icon={faPlus} size="xs" className="icon" /></div>
								</div>
							</li>
							<li>
								<div className="parent-category">
									<p className="category">Home</p>
									<div><FontAwesomeIcon icon={faPlus} size="xs" className="icon" /></div>
								</div>
							</li>
							<li>
								<div className="parent-category">
									<p className="category">Art</p>
									<div><FontAwesomeIcon icon={faPlus} size="xs" className="icon" /></div>
								</div>
							</li>
							<li>
								<div className="parent-category">
									<p className="category">Computers</p>
									<div><FontAwesomeIcon icon={faPlus} size="xs" className="icon" /></div>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div className="col-12 col-sm-9 col-lg right-side">
					<div>
						<GridLayout 
							auctions={auctions}
							numOfCols={4}
						/>
					</div>
					<div className="expand">
						<button className="explore-btn">EXPLORE MORE</button>
					</div>
				</div>
			</div>
		</div>
    );
}

export default Shop;
