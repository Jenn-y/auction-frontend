import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faSkype, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react'

import AuthService from 'services/AuthService'
import logo from 'assets/logo.png'

import './Header.scss'

const Header = () => {
	const [loggedUser, setIsLogged] = useState(false)

	useEffect(() => {
		const user = AuthService.getCurrentUser()
		if (user != null) setIsLogged(true)
	}, [])

	const logout = () => {
		AuthService.logout()
		toast.success("Logout sucessful!", { hideProgressBar: true });
		window.location.replace("/")
	}

	return (
		<>
			<div className="header-area black-header">
				<div className="container">
					<div className="row">
						<div className="col-6 footer_social_area">
							<a href="https://www.facebook.com/dzenita.djulovic/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faFacebook} /></a>
							<a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
							<a href="https://twitter.com/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
							<a href="https://join.skype.com/invite/nHXgfPkkV7sM" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faSkype} /></a>
						</div>
						{!loggedUser ?
							<div className="col-6 header-right">
								<span><NavLink to="/login">Login</NavLink></span>
								<span className="or-span">or</span>
								<span><NavLink to="/register">Create an account</NavLink></span>
							</div> :
							<div className="col-6 header-right">
								<span><button onClick={logout}>Logout</button></span>
							</div>
						}
					</div>
				</div>
			</div>
			<div className="header-area white-header">
				<div className="container">
					<div className="row">
						<div className="col-3 logo">
							<Link to="/"><img src={logo} alt="" /></Link>
						</div>
						<div className="col-4">
							{/* search bar to be added later here */}
						</div>
						<div className="col-5 wr-header">
							<span><NavLink to="/" exact activeClassName="active">HOME</NavLink></span>
							<span><NavLink to="/about" activeClassName="active">SHOP</NavLink></span>
							<span><NavLink to="/about" activeClassName="active">MY ACCOUNT</NavLink></span>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Header
