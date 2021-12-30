import { useEffect, useState } from "react"

import AuctionService from "services/AuctionService"

const NoOfAuctions = (props: any) => {
    const [numOfAuctions, setNumOfAuctions] = useState(0)

    useEffect(() => {
        AuctionService.getCountBySubcategory(props.subcategoryId)
            .then(response => {
                if (response) {
                    setNumOfAuctions(response)
                }
            })
    }, [])

    return (
        <span>{numOfAuctions}</span>
    )
}

export default NoOfAuctions
