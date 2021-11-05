import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import GridLayout from 'shared/grid_layout/GridLayout'

import './LandingPage.scss'

const LandingPage = () => {

	const [newArrivalsActive, setNewArrivalsActive] = useState(true)
	const [lastChanceActive, setLastChanceActive] = useState(false)

	const handleNewArrivals = () => {
		setNewArrivalsActive(true)
		setLastChanceActive(false)
	}

	const handleLastChance = () => {
		setNewArrivalsActive(false)
		setLastChanceActive(true)
	}

	let images = [
		'https://media1.popsugar-assets.com/files/thumbor/CHzF5iQ31LcGCjSPu1xF0wjTypg/0x0:1500x2024/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2021/04/20/773/n/1922564/c9ce4a74607f107ac3b225.06048116_/i/Best-Women-Sneakers.jpg'
	]

	return (
		<>
			<div className="heading">
				<div className="container">
					<div className="row highlight">
						<div className="col-12 col-sm-4 col-lg">
							<h6 className="cat-title">CATEGORIES</h6>
							<ul className="cat-list">
								<li><div className="category"><a href="#">Fashion</a></div></li>
								<li><div className="category"><a href="#">Accesories</a></div></li>
								<li><div className="category"><a href="#">Jewelry</a></div></li>
								<li><div className="category"><a href="#">Shoes</a></div></li>
								<li><div className="category"><a href="#">Sportware</a></div></li>
								<li><div className="category"><a href="#">Home</a></div></li>
								<li><div className="category"><a href="#">Electronics</a></div></li>
								<li><div className="category"><a href="#">Mobile</a></div></li>
								<li><div className="category"><a href="#">Computer</a></div></li>
								<li><div className="category"><a href="#">All Categories</a></div></li>
							</ul>
						</div>
						<div className="col-12 col-sm-4 col-lg product-desc">
							<h4 className="prod-title">Running shoes</h4>
							<h4 className="price">Start from $59.00</h4>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit odio a erat lobortis auctor. Curabitur sodales pharetra placerat. Aenean auctor luctus tempus. Cras laoreet et magna in dignissim. Nam et tincidunt augue. Vivamus quis malesuada velit. In hac habitasse platea dictumst. </p>
							<button className="bid-btn">BID NOW <FontAwesomeIcon icon={faAngleRight} /></button>
						</div>
						<div className="col-12 col-sm-4 col-lg">
							<img src={images[0]} alt="sneakers" />
						</div>
					</div>
				</div>
			</div>
			<div className="main">
				<div className="container">
					<div className="row tab-navs">
						<div className="col-12 col-sm-12 col-lg">
							<div className="list">
								<button className={newArrivalsActive ? 'active' : ''}
									onClick={handleNewArrivals} >New Arrivals</button>
								<button className={lastChanceActive ? 'active' : ''}
									onClick={handleLastChance}>Last Chance</button>
							</div>
						</div>
					</div>
					<GridLayout />
				</div>
			</div>
		</>
	)
}

export default LandingPage
