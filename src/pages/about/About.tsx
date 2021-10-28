import * as React from 'react'
import Footer from '../../shared/footer/Footer'
import Header from '../../shared/header/Header'
import './About.scss'

let images = [
	'https://image.shutterstock.com/image-photo/happy-cheerful-young-woman-wearing-600w-613759379.jpg',
	'https://image.shutterstock.com/image-photo/closeup-photo-amazing-short-hairdo-600w-1617540484.jpg',
	'https://image.shutterstock.com/image-photo/image-cheerful-african-american-woman-600w-1718299927.jpg',
]

const About = () => {
	return (
		<>
			<Header />
			<div className="container about">
				<div className="row">
					<div className="col-12 col-sm-6 col-lg">
						<h2>About Us</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
					</div>
					<div className="col-12 col-sm-6 col-lg images">
						<div className="row first-row">
							<img src={images[0]} alt="person 1" />
						</div>
						<div className="row second-row">
							<div className="col-12 col-sm-6 col-lg">
								<img src={images[1]} alt="person 2" />
							</div>
							<div className="col-12 col-sm-6 col-lg">
								<img src={images[2]} alt="person 3" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default About
