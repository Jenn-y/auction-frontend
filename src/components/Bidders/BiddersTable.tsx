import moment from 'moment'

import { Bid } from 'interfaces/Bid';

import './BiddersTable.scss'

const BiddersTable = (bids: any) => {
    return (
        <div className="row bidders">
			<div className="col-md-12">
				<div className="table-section">
					<table className="table">
						<thead>
							<tr>
								<th>BIDDER</th>
								<th>DATE</th>
								<th>BID</th>
							</tr>
						</thead>
						<tbody>
							{bids.bids.map((bid: Bid) => {
								return (
									<tr className="bidders-list" key={bid.id}>
										<td className="title">
											<div className="thumb">
												<img className="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" />
											</div>
											<div className="bidder-details">
												<div className="bidder-list-title">
													<h5>{bid.buyer.firstName} {bid.buyer.lastName}</h5>
												</div>
											</div>
										</td>
										<td className="bid-date">
											<p className="date">{moment(bid.bidDate).format("MMMM Do YYYY")}{" "}</p>
										</td>
										<td className="bid-amount">
											<p>$ {bid.bidAmount}</p>
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
    );
}

export default BiddersTable;
