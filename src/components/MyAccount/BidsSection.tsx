import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import shoppingCart from 'assets/shoppingCart.png';
import { Bid } from 'interfaces/Bid';
import AuctionService from 'services/AuctionService';
import HighestBid from 'shared/helper_components/HighestBid';
import NoOfBids from 'shared/helper_components/NoOfBids';
import ShowPaymentOption from 'utils/helper_components/ShowPaymentOption';
import AuthService from 'services/AuthService';

const BidsSection = (props: any) => {
	const [user, setUser] = useState()
	const [bids, setBids] = useState([])
	let defaultImage = [
		'https://sankosf.com/wp-content/themes/gecko/assets/images/placeholder.png'
	]

	useEffect(() => {
		setUser(AuthService.getCurrentUser())
		AuctionService.getBidsByBidderId(props.user.id, props.user.authenticationToken)
			.then(response => {
				if (response) {
					setBids(response)
				}
			})
	}, [])

    return (
        <div className="bids">
			<div className="table-section">
				<table className="table">
					<thead>
						<tr>
							<th>Item</th>
							<th>Name</th>
							<th>Time left</th>
							<th>Your bid</th>
							<th>No. bids</th>
							<th>Highest bid</th>
							<th>Auction</th>
						</tr>
					</thead>
					<tbody>
						{bids.map((bid: Bid) => {
							return (
								<tr className="bids-list" key={bid.id}>
									<td className="title">
										<div className="thumb">
											<img className="img-fluid" src={bid.auction.item.imageLink ? bid.auction.item.imageLink : defaultImage[0]} alt="" />
										</div>
									</td>
									<td>
										<h5>{bid.auction.item.name}</h5>
									</td>
									<td className="bid-date">
										<p className="date">{moment(bid.auction.endDate).fromNow()}</p>
									</td>
									<td className="bid-amount">
										<p>$ {bid.bidAmount}</p>
									</td>
									<td>
										<NoOfBids auctionId={bid.auction.id} token={props.user.authenticationToken}/>
									</td>
									<td className="bid-amount">
										<HighestBid auctionId={bid.auction.id} bidAmount={bid.bidAmount} />
									</td>
									<td>
										<ShowPaymentOption 
											price={bid.bidAmount}
											auction={bid.auction}
											user={user}
										/>
									</td>
								</tr>
							)
						})}
						{bids.length === 0 ? 
							<td colSpan={7} className="no-items">
								<img alt="shopping bag" src={shoppingCart} />
								<p>You do not have any items you bid on.</p>
								<button><Link to="/shop/all">START BIDDING</Link></button>
							</td> : ''
						}
					</tbody>
				</table>
			</div>
		</div>
    );
}

export default BidsSection
