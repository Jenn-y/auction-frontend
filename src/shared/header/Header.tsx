import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faSkype, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap';

import AuthService from 'services/AuthService'
import logo from 'assets/logo.png'

import './Header.scss'

const Header = () => {
	const [loggedUser, setIsLogged] = useState(false)
	const [showDropdown, setShowDropdown] = useState(false)

	useEffect(() => {
		const user = AuthService.getCurrentUser()
		if (user != null) setIsLogged(true)
	}, [])

	const logout = () => {
		AuthService.logout()
		toast.success("Logout sucessful!", { hideProgressBar: true });
		window.location.replace("/")
	}

	const onDropdownMenuClick = (section: any) => {
		window.location.replace(`/my_account/${section}`)
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
							<span><NavLink to="/shop/all" activeClassName="active">SHOP</NavLink></span>
							{loggedUser ? 
								<Dropdown className="account-dropdown"
										  onMouseLeave={() => setShowDropdown(false)}
										  onMouseOver={() => setShowDropdown(true)}
								>
									<Dropdown.Toggle id="dropdown-basic">
										<NavLink to="/my_account/profile" activeClassName="active">MY ACCOUNT</NavLink>
									</Dropdown.Toggle>

									<Dropdown.Menu show={showDropdown}>
										<Dropdown.Item as="button" onClick={() => onDropdownMenuClick("profile")}>Profile</Dropdown.Item>
										<Dropdown.Item as="button" onClick={() => onDropdownMenuClick("seller")}>Seller</Dropdown.Item>
										<Dropdown.Item as="button" onClick={() => onDropdownMenuClick("bids")}>Bids</Dropdown.Item>
										<Dropdown.Item as="button" onClick={() => onDropdownMenuClick("settings")}>Settings</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown> : ''
							}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Header
