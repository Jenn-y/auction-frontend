import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'

import './GridLayout.scss'

const GridLayout = (models: any) => {

	let images = [
		'https://media1.popsugar-assets.com/files/thumbor/CHzF5iQ31LcGCjSPu1xF0wjTypg/0x0:1500x2024/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2021/04/20/773/n/1922564/c9ce4a74607f107ac3b225.06048116_/i/Best-Women-Sneakers.jpg'
	]

	return (
		<Container>
			<Row className="section">
				{models.auctions.map((model: any) => {
					return (
						<Col xs={3} key={model.item.id} className="card-h">
							<Link to={`/auctions/${model.id}`} className="bid-btn">
								<img src={images[0]} alt="sneakers" />
							</Link>
							<h4>{model.item.name}</h4>
							<p>Start From <span>${model.item.startPrice}</span></p>
						</Col>
					)
				})}
			</Row>
		</Container>
	)
}

export default GridLayout
