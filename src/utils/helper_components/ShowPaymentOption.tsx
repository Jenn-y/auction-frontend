import PaymentModal from "components/MyAccount/PaymentModal";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuctionService from "services/AuctionService";

const ShowPaymentOption = (props: any) => {
	const [highestBid, setHighestBid] = useState<Number>()
	const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        AuctionService.getHighestBid(props.auctionId)
			.then(response => {
				if (response) {
					setHighestBid(response)
				}
			})
    }, [])

	const onPayButton = () => {
		setOpenModal(true)
	}
	
	return (
		<>
		{props.price === highestBid && new Date(props.endDate).getTime() < Date.now() ?
			<button className="pay-btn" onClick={onPayButton}>PAY</button> :
			<Link to={`/auctions/${props.auctionId}`} >VIEW</Link>
		}
		{openModal ? 
			<PaymentModal 
				setOpenModal={setOpenModal}
				user={props.user} 
			/> : ""	
		}
		</>
    )
}

export default ShowPaymentOption;
