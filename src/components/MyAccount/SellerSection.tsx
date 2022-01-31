import { useEffect, useState } from "react";
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import shoppingCart from 'assets/shoppingCart.png';
import AuctionService from "services/AuctionService";
import { Auction } from "interfaces/Auction";
import NoOfBids from "shared/helper_components/NoOfBids";
import HighestBid from "shared/helper_components/HighestBid";


const SellerSection = (props: any) => {
	const [active, setActive] = useState(true)
	const [sold, setSold] = useState(false)
	const [auctions, setAuctions] = useState<Auction[]>([])
	let defaultImage = [
		'https://sankosf.com/wp-content/themes/gecko/assets/images/placeholder.png'
	]

	useEffect(() => {
		getActiveAuctions()
	}, [])

	const getActiveAuctions = () => {
		AuctionService.getActiveAuctionsBySeller('ACTIVE', props.user.id, props.user.authenticationToken)
			.then(response => {
				if (response) {
					setAuctions(response)
				}
			})
	}

	const getSoldAuctions = () => {
		AuctionService.getActiveAuctionsBySeller('SOLD', props.user.id, props.user.authenticationToken)
			.then(response => {
				if (response) {
					setAuctions(response)
				}
			})
	}

	const onButtonClick = (tab: string) => {
		switch (tab) {
			case "active":
				setActive(true)
				setSold(false)
				getActiveAuctions()
				break;
			case "sold":
				setActive(false)
				setSold(true)
				getSoldAuctions()
				break;
		}
	}
	
    return (
		<div className="seller">
			<div>
				<button className={active ? 'seller-button active' : 'seller-button'} onClick={() => onButtonClick("active")}>Active</button>
				<button className={sold ? 'seller-button active' : 'seller-button'} onClick={() => onButtonClick("sold")}>Sold</button>
				{auctions.length !== 0 ? 
					<Link to="/auctions/add/new"><button className="add-button"><FontAwesomeIcon icon={faPlus} />ADD ITEM</button></Link> : ''
				}
			</div>
			<div className="table-section">
				<table className="table">
					<thead>
						<tr>
							<th>Item</th>
							<th>Name</th>
							<th>Time left</th>
							<th>Start price</th>
							<th>No. bids</th>
							<th>Highest bid</th>
							<th>Auction</th>
						</tr>
					</thead>
					<tbody>
					{auctions.map((auction: Auction) => {
							return (
								<tr className="bids-list" key={auction.id}>
									<td className="title">
										<div className="thumb">
											<img className="img-fluid" src={auction.item.imageLink ? auction.item.imageLink : defaultImage[0]} alt="" />
										</div>
									</td>
									<td>
										<h5>{auction.item.name}</h5>
									</td>
									<td className="bid-date">
										<p className="date">{moment(auction.endDate).fromNow()}</p>
									</td>
									<td className="bid-amount">
										<p>$ {auction.startPrice}</p>
									</td>
									<td>
										<NoOfBids auctionId={auction.id} token={props.user.authenticationToken}/>
									</td>
									<td className="bid-amount">
										<HighestBid auctionId={auction.id} bidAmount={auction.startPrice} />
									</td>
									<td>
										<Link to={`/auctions/${auction.id}`} >VIEW</Link>
									</td>
								</tr>
							)
						})}
						{auctions.length === 0 ? 
							<td colSpan={7} className="no-items">
								<img alt="shopping bag" src={shoppingCart} />
								<p>You do not have any 
									{active ? ' scheduled items for sale.' : ' sold items.'}
								</p>
								<Link to="/auctions/add/new"><button>START SELLING</button></Link>
							</td> : ''
					}
					</tbody>
				</table>
			</div>
		</div>
    );
}

export default SellerSection
