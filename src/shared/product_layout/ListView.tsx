import { faGavel, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'

import './ProductLayout.scss'

const ListView = (models: any) => {

	let images = [
		'https://media1.popsugar-assets.com/files/thumbor/CHzF5iQ31LcGCjSPu1xF0wjTypg/0x0:1500x2024/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2021/04/20/773/n/1922564/c9ce4a74607f107ac3b225.06048116_/i/Best-Women-Sneakers.jpg'
	]

	return (
		<Container>
			<div className="section list-view">
				{models.auctions.map((model: any) => {
					return (
						<Row className="list-view-row">
							<Col xs={4} key={model} className="card-h">
								<Link to={`/auctions/${model.id}`} className="bid-btn">
									<img src={images[0]} alt="sneakers" />
								</Link>
							</Col>
							<Col xs={8} key={model} className="card-h">
								<h3>{model.item.name}</h3>
								<p className="description">{model.item.description}</p>
								<p className="price">Start From ${model.startPrice}</p>
								<div className="button-box">
									<button className="button">Watchlist <FontAwesomeIcon icon={faHeart} className="icon" /></button>
									<Link to={`/auctions/${model.id}`} ><button className="button" id="bid-button">Bid <FontAwesomeIcon icon={faGavel} className="icon" /></button></Link>
								</div>
							</Col>
						</Row>
					)
				})}
			</div>
		</Container>
	)
}

export default ListView
