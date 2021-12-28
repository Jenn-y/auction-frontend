import { useEffect, useState } from "react";
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";

import shoppingCart from 'assets/shoppingCart.png';
import AuctionService from "services/AuctionService";
import { Auction } from "interfaces/Auction";
import NoOfBids from "shared/helper_components/NoOfBids";
import HighestBid from "shared/helper_components/HighestBid";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


const SellerSection = (props: any) => {
	const [active, setActive] = useState(true)
	const [sold, setSold] = useState(false)
	const [auctions, setAuctions] = useState<Auction[]>([])

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

	const getInactiveAuctions = () => {
		AuctionService.getActiveAuctionsBySeller('INACTIVE', props.user.id, props.user.authenticationToken)
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
				getInactiveAuctions()
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
											<img className="img-fluid" src="https://media1.popsugar-assets.com/files/thumbor/CHzF5iQ31LcGCjSPu1xF0wjTypg/0x0:1500x2024/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2021/04/20/773/n/1922564/c9ce4a74607f107ac3b225.06048116_/i/Best-Women-Sneakers.jpg" alt="" />
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
								<img alt="shopping bag" src={shoppingCart} className="c-selling-item-list__shopping-bag-image" />
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
