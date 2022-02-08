import { useEffect, useState } from "react"
import AuctionService from "services/AuctionService"

const NoOfBids = (props: any) => {
	const [noOfBids, setNoOfBids] = useState()

	useEffect(() => {
		AuctionService.getNoOfBids(props.auctionId, props.token)
			.then(response => {
				setNoOfBids(response)
			})
	}, [])

	return (
		<p>{noOfBids}</p>
	)
}

export default NoOfBids
