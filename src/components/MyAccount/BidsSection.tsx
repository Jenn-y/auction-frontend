import shoppingCart from 'assets/shoppingCart.png';
import { Bid } from 'interfaces/Bid';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuctionService from 'services/AuctionService';
import HighestBid from 'shared/helper_components/HighestBid';
import NoOfBids from 'shared/helper_components/NoOfBids';

const BidsSection = (props: any) => {
	const [bids, setBids] = useState([])

	useEffect(() => {
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
											<img className="img-fluid" src="https://media1.popsugar-assets.com/files/thumbor/CHzF5iQ31LcGCjSPu1xF0wjTypg/0x0:1500x2024/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2021/04/20/773/n/1922564/c9ce4a74607f107ac3b225.06048116_/i/Best-Women-Sneakers.jpg" alt="" />
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
										<Link to={`/auctions/${bid.auction.id}`} >VIEW</Link>
									</td>
								</tr>
							)
						})}
						{bids.length === 0 ? 
							<td colSpan={7} className="no-items">
								<img alt="shopping bag" src={shoppingCart} className="c-selling-item-list__shopping-bag-image" />
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
