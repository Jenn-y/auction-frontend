import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuctionService from "services/AuctionService";

const ShowPaymentOption = (props: any) => {
	const [highestBid, setHighestBid] = useState<Number>()

    useEffect(() => {
        AuctionService.getHighestBid(props.auctionId)
			.then(response => {
				if (response) {
					setHighestBid(response)
				}
			})
    }, [])

	
	return (
		<>
		{props.price === highestBid && new Date(props.endDate).getTime() < Date.now() ?
			<Link to={`/auctions/${props.auctionId}`} className="pay-btn">PAY</Link> :
			<Link to={`/auctions/${props.auctionId}`} >VIEW</Link>
		}
		</>
    )
}

export default ShowPaymentOption;
