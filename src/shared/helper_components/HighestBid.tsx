import { useEffect, useState } from "react"
import AuctionService from "services/AuctionService"

const HighestBid = (props: any) => {
	const [highestBid, setHighestBid] = useState(0)

	useEffect(() => {
		AuctionService.getHighestBid(props.auctionId)
			.then(response => {
				setHighestBid(response)
			})
	}, [])

	return (
		<p className={props.bidAmount >= highestBid ? 'green' : 'blue'}>$ {highestBid}</p>
	)
}

export default HighestBid
