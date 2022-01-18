import { Link, NavLink, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faSkype, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faCross, faSearch, faTimes, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap';

import AuthService from 'services/AuthService'
import logo from 'assets/logo.png'

import './Header.scss'
import { ENTER_KEY } from 'constants/KeyCodes';

const Header = () => {
	const [loggedUser, setIsLogged] = useState(false)
	const [showDropdown, setShowDropdown] = useState(false)
	let search = new URLSearchParams(useLocation().search).get("searchText");
	const [searchText, setSearchText] = useState(search?.toString())

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

	const onSearchChange = (e: any) => {
        setSearchText(e.target.value)
    }

    const onEnterPressed = (e: any) => {
        if (e.keyCode === ENTER_KEY) {
            onSearch()
        }
    }

	const onSearch = () => {
        window.location.replace(`/shop/all?searchText=${searchText}`)
    }

	const handleRemoveSearch = () => {
		window.location.replace("/shop/all")
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
							<div className="searchbar">
								<input type="text" placeholder="Search ..." value={searchText} onChange={onSearchChange} onKeyDown={onEnterPressed}></input>
								{ search ? <FontAwesomeIcon icon={faTimes} size="xs" id="close-icon" onClick={handleRemoveSearch}/> : "" }
								<FontAwesomeIcon icon={faSearch} onClick={onSearch} />
							</div>
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
										<NavLink to="/my_account/profile" activeClassName="active" id="my-account-navlink">MY ACCOUNT</NavLink>
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
