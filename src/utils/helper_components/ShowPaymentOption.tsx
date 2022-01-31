import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AuctionService from "services/AuctionService";
import PaymentModal from "components/MyAccount/PaymentModal";

const ShowPaymentOption = (props: any) => {
	const [highestBid, setHighestBid] = useState<Number>()
	const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        AuctionService.getHighestBid(props.auction.id)
			.then(response => {
				if (response) {
					setHighestBid(response)
				}
			})
    }, [])

	useEffect(() => {
    }, [openModal])

	const onPayButton = () => {
		setOpenModal(true)
	}
	
	return (
		<>
			{props.auction.status === 'SOLD' && props.price === highestBid ?
				<button className="paid-btn">PAID</button> :
				<>
					{props.price === highestBid && new Date(props.auction.endDate).getTime() < Date.now() ?
						<button className="pay-btn" onClick={onPayButton}>PAY</button> :
						<Link to={`/auctions/${props.auction.id}`} >VIEW</Link>
					}
				</>
			}
			{openModal ? 
				<PaymentModal 
					setOpenModal={setOpenModal}
					user={props.user}
					price={props.price}
					auction={props.auction} 
				/> : ""	
			}
		</>
    )
}

export default ShowPaymentOption;
