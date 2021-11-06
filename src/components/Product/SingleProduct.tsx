import { faAngleRight, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './SingleProduct.scss'

const SingleProduct = () => {

	let images = [
		'https://image.shutterstock.com/image-photo/happy-cheerful-young-woman-wearing-600w-613759379.jpg',
		'https://image.shutterstock.com/image-photo/closeup-photo-amazing-short-hairdo-600w-1617540484.jpg',
		'https://image.shutterstock.com/image-photo/image-cheerful-african-american-woman-600w-1718299927.jpg',
	]

	return (
		<>
			<div className="container">
				<div className="row product">
					<div className="col-12 col-sm-4 col-lg">
						<div className="row">
							<div className="col-12 col-sm-12 col-lg">
								<img src={images[0]} alt="person 1" className="main-img" />
							</div>
							<div className="row">
								<div className="col-12 col-sm-3 col-lg">
									<img src={images[0]} alt="person 1" className="secondary-img" />
								</div>
								<div className="col-12 col-sm-3 col-lg">
									<img src={images[0]} alt="person 1" className="secondary-img" />
								</div>
								<div className="col-12 col-sm-3 col-lg">
									<img src={images[0]} alt="person 1" className="secondary-img" />
								</div>
								<div className="col-12 col-sm-3 col-lg">
									<img src={images[0]} alt="person 1" className="secondary-img" />
								</div>
							</div>
						</div>
					</div>
					<div className="col-12 col-sm-8 col-lg">
						<h1 className="prod-title">Running Shoes</h1>
						<h4 className="prod-price">Start from <span>$240.00</span></h4>
						<div className="bid-section">
							<input type="text" required name="price" placeholder="Enter $260.00 or more" />
							<button className="bid-btn">PLACE BID <FontAwesomeIcon icon={faAngleRight} /></button>
						</div>
						<div className="bid-stats">
							<p>Highest bid: <span>$240.00</span></p>
							<p>No of bids: <span>2</span></p>
							<p>Time left: <span>10 days</span></p>
						</div>
						<div className="watchlist">
							<button>Watchlist <FontAwesomeIcon icon={faHeart} className="heart" /></button>
						</div>
						<div className="details-section">
							<p>Details</p>
						</div>
						<div className="item-details">
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
							<ul>
								<li>Duis aute irure dolor in reprehenderit in voluptate</li>
								<li>Voluptate velit esse cillum dolore eu fugiat nulla pariatur</li>
								<li>Excepteur sint occaecat cupidatat non proident</li>
								<li>Sunt in culpa qui officia deserunt mollit anim id est laborum</li>
								<li>Sed ut perspiciatis unde omnis iste natus error sit</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default SingleProduct
