import { faAngleRight, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'

import { Auction } from 'interfaces/Auction'
import AuctionService from 'services/AuctionService'
import AuthService from 'services/AuthService'

import './SingleProduct.scss'
import { Bid } from 'interfaces/Bid'
import BiddersTable from 'components/Bidders/BiddersTable'

const SingleProduct = (props: any) => {

	const [detailsActive, setDetails] = useState(true)
	const [sellerInfoActive, setSellerInfo] = useState(false)
	const [customerRevActive, setCustomerRev] = useState(false)
	const [loggedUser, setIsLogged] = useState(false)
	const [item, setItem] = useState<Auction>()
	const [bids, setBids] = useState<Bid>()

	useEffect(() => {
		const user = AuthService.getCurrentUser()
		if (user != null) setIsLogged(true)
		
		AuctionService.getItem(props.match.params.id)
			.then(response => {
				if (response) {
					setItem(response)
				}
			})
		
		if (user) {
			AuctionService.getBids(props.match.params.id, user.authenticationToken)
				.then(response => {
					if (response) {
						setBids(response)
					}
				})
		}
	}, [])

	const handleDetails = () => {
		setDetails(true)
		setSellerInfo(false)
		setCustomerRev(false)
	}

	const handleSellerInfo = () => {
		setDetails(false)
		setSellerInfo(true)
		setCustomerRev(false)
	}

	const handleCustomerRev = () => {
		setDetails(false)
		setSellerInfo(false)
		setCustomerRev(true)
	}

	let images = [
		'https://media1.popsugar-assets.com/files/thumbor/CHzF5iQ31LcGCjSPu1xF0wjTypg/0x0:1500x2024/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2021/04/20/773/n/1922564/c9ce4a74607f107ac3b225.06048116_/i/Best-Women-Sneakers.jpg'
	]

	return (
		<>
			<div className="container">
				<div className="row product">
					{item ?
						<>
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
								<h1 className="prod-title">{item?.item.name}</h1>
								<h4 className="prod-price">Start from <span>${item.item.startPrice}</span></h4>
								{loggedUser ?
									<div className="bid-section">
										<input type="text" required name="price" placeholder="Enter your bid" />
										<button className="bid-btn">PLACE BID <FontAwesomeIcon icon={faAngleRight} /></button>
									</div> : ''
								}
								<div className="bid-stats">
									<p>Highest bid: <span>${item.highestBid}</span></p>
									<p>No of bids: <span>2</span></p>
									<p>Time left: <span>10 days</span></p>
								</div>
								<div className="watchlist">
									<button>Watchlist <FontAwesomeIcon icon={faHeart} className="heart" /></button>
								</div>
								<div className="details-section">
									<button className={detailsActive ? 'active' : ''}
										onClick={handleDetails} >Details</button>
									<button className={sellerInfoActive ? 'active' : ''}
										onClick={handleSellerInfo}>Seller Information</button>
									<button className={customerRevActive ? 'active' : ''}
										onClick={handleCustomerRev}>Customer Reviews</button>
								</div>
								{detailsActive ?
									<div className="item-details">
										<p>{item.item.description}</p>
									</div> : ''
								}
								{sellerInfoActive ?
									<div className="item-details">
										<p>{item.seller.firstName} {item.seller.lastName}</p>
									</div> : ''
								}
							</div>
						</> : ''
					}
				</div>
				{loggedUser && bids ?
					<BiddersTable
						bids={bids}
					/> : ''
				}
			</div>
		</>
	)
}

export default SingleProduct
