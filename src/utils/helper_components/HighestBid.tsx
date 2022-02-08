import { useEffect, useState } from "react"

import AuctionService from "services/AuctionService"

const HighestBid = (props: any) => {
    const [highestBid, setHighestBid] = useState<Number>()

    useEffect(() => {
        AuctionService.getHighestBid(props.id)
			.then(response => {
				if (response) {
					setHighestBid(response)
				}
			})
    }, [])

    return (
        <span>{highestBid}</span>
    )
}

export default HighestBid
