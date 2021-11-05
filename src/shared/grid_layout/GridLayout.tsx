import './GridLayout.scss'

const GridLayout = () => {

	let images = [
		'https://media1.popsugar-assets.com/files/thumbor/CHzF5iQ31LcGCjSPu1xF0wjTypg/0x0:1500x2024/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2021/04/20/773/n/1922564/c9ce4a74607f107ac3b225.06048116_/i/Best-Women-Sneakers.jpg'
	]

	return (
		<div className="row section">
			<div className="col-12 col-sm-3 col-lg">
				<img src={images[0]} alt="sneakers" />
				<h4>Shoes Collection</h4>
				<p>Start From <span>$59.00</span></p>
			</div>
			<div className="col-12 col-sm-3 col-lg">
				<img src={images[0]} alt="sneakers" />
				<h4>Shoes Collection</h4>
				<p>Start From <span>$59.00</span></p>
			</div>
			<div className="col-12 col-sm-3 col-lg">
				<img src={images[0]} alt="sneakers" />
				<h4>Shoes Collection</h4>
				<p>Start From <span>$59.00</span></p>
			</div>
			<div className="col-12 col-sm-3 col-lg">
				<img src={images[0]} alt="sneakers" />
				<h4>Shoes Collection</h4>
				<p>Start From <span>$59.00</span></p>
			</div>
			<div className="col-12 col-sm-3 col-lg">
				<img src={images[0]} alt="sneakers" />
				<h4>Shoes Collection</h4>
				<p>Start From <span>$59.00</span></p>
			</div>
			<div className="col-12 col-sm-3 col-lg">
				<img src={images[0]} alt="sneakers" />
				<h4>Shoes Collection</h4>
				<p>Start From <span>$59.00</span></p>
			</div>
			<div className="col-12 col-sm-3 col-lg">
				<img src={images[0]} alt="sneakers" />
				<h4>Shoes Collection</h4>
				<p>Start From <span>$59.00</span></p>
			</div>
			<div className="col-12 col-sm-3 col-lg">
				<img src={images[0]} alt="sneakers" />
				<h4>Shoes Collection</h4>
				<p>Start From <span>$59.00</span></p>
			</div>
		</div>
	)
}

export default GridLayout
