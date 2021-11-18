import { faAngleRight, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { toast } from 'react-toastify';

import { Auction } from 'interfaces/Auction'
import AuctionService from 'services/AuctionService'
import AuthService from 'services/AuthService'
import BiddersTable from 'components/Bidders/BiddersTable'
import { User } from 'interfaces/User'
import { validateBidAmount } from 'utils/Validations';
import { HIGHER_BID_EXIST } from 'constants/ErrorMessages';

import './SingleProduct.scss'

const SingleProduct = (props: any) => {

	const [detailsActive, setDetails] = useState(true)
	const [sellerInfoActive, setSellerInfo] = useState(false)
	const [loggedUser, setIsLogged] = useState(false)
	const [user, setUser] = useState<User>()
	const [item, setItem] = useState<Auction>()
	const [bids, setBids] = useState([])
	const [bid, setBid] = useState({bidAmount: '', bidDate: new Date(), buyer: user, auction: item})

	useEffect(() => {
		const user = AuthService.getCurrentUser()
		if (user != null) {
			setIsLogged(true)
		}
		
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
		if (user) getUser()
	}, [])

	const getUser = () => {
		const currentUser = AuthService.getCurrentUser()
		
		AuthService.getUser(currentUser.email, currentUser.authenticationToken)
			.then(response => {
				if (response) {
					setUser(response)
				}
			})
	}

	const handleChange = (e: any) => {
		setBid(Object.assign({}, bid, { [e.target.name]: e.target.value }))
	}

	const handleSubmit = (e: any) => {
		e.preventDefault();

		if (validateBidAmount(Number(bid.bidAmount), item?.highestBid)){
			const currentUser = AuthService.getCurrentUser()
			
			if (user){
				bid!.buyer = user
				bid!.auction = item
			}

			AuctionService.addBid(bid, currentUser.authenticationToken)
				.then(
					() => {
						toast.success("Congrats! You are the highest bidder!", { hideProgressBar: true });
						window.location.reload();
					}
				)
		} else {
			toast.warning(HIGHER_BID_EXIST, { hideProgressBar: true });
		}
	}

	const handleDetails = () => {
		setDetails(true)
		setSellerInfo(false)
	}

	const handleSellerInfo = () => {
		setDetails(false)
		setSellerInfo(true)
	}

	let images = [
		'https://media1.popsugar-assets.com/files/thumbor/CHzF5iQ31LcGCjSPu1xF0wjTypg/0x0:1500x2024/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2021/04/20/773/n/1922564/c9ce4a74607f107ac3b225.06048116_/i/Best-Women-Sneakers.jpg'
	]

	return (
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
							<h4 className="prod-price">Start from <span>${item.highestBid}+</span></h4>
							{loggedUser ?
								<form onSubmit={handleSubmit}>
									<div className="bid-section">
										<input type="text" onChange={handleChange} value={bid?.bidAmount} name="bidAmount" placeholder="Enter your bid" required />
										<button className="bid-btn" type="submit">PLACE BID <FontAwesomeIcon icon={faAngleRight} /></button>
									</div>
								</form> : ''
							}
							<div className="bid-stats">
								<p>Highest bid: <span>${item.highestBid}</span></p>
								<p>No of bids: <span>{bids.length}</span></p>
								<p>Time left: <span>{moment(item.endDate).fromNow()}</span></p>
							</div>
							<div className="watchlist">
								<button>Watchlist <FontAwesomeIcon icon={faHeart} className="heart" /></button>
							</div>
							<div className="details-section">
								<button className={detailsActive ? 'active' : ''}
									onClick={handleDetails} >Details</button>
								<button className={sellerInfoActive ? 'active' : ''}
									onClick={handleSellerInfo}>Seller Information</button>
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
			{loggedUser && bids && user?.email === item?.seller.email ?
				<BiddersTable
					bids={bids}
				/> : ''
			}
		</div>
	)
}

export default SingleProduct
