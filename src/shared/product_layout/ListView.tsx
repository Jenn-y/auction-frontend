import { faGavel, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'

import './ProductLayout.scss'

const ListView = (models: any) => {

	let images = [
		'https://sankosf.com/wp-content/themes/gecko/assets/images/placeholder.png'
	]

	return (
		<Container>
			<div className="section list-view">
				{models.auctions.map((model: any) => {
					return (
						<Row className="list-view-row">
							<Col xs={4} key={model} className="card-h">
								<Link to={`/auctions/${model.id}`} className="bid-btn">
									<img src={model.item.imageLink ? model.item.imageLink : images[0]} alt="sneakers" />
								</Link>
							</Col>
							<Col xs={8} key={model} className="card-h">
								<h3>{model.item.name}</h3>
								<p className="desc">{model.item.description}</p>
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
