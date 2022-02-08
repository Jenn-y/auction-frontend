import { mode } from 'd3'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import HighestBid from 'utils/helper_components/HighestBid'

import './ProductLayout.scss'

const GridView = (models: any) => {

	let images = [
		'https://sankosf.com/wp-content/themes/gecko/assets/images/placeholder.png'
	]

	return (
		<Container>
			<Row className="section">
				{models.auctions.map((model: any) => {
					return (
						<Col xs={models.numOfCols} key={model} className="card-h">
							<Link to={`/auctions/${model.id}`} className="bid-btn">
								<img src={model.item.imageLink ? model.item.imageLink : images[0]} alt="sneakers" />
							</Link>
							<h4>{model.item.name}</h4>
							<p>Start From <span>${model.startPrice}</span></p>
						</Col>
					)
				})}
			</Row>
		</Container>
	)
}

export default GridView
