import { faFacebook, faInstagram, faSkype, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import './Header.scss'
import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom'

const Header = () => {
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
          <div className="col-6 header-right">
            <span><NavLink to="/">Login</NavLink></span>
            <span className="or-span">or</span>
            <span><NavLink to="/">Create and account</NavLink></span>
          </div>
        </div>
      </div>
    </div>
    <div className="header-area white-header">
      <div className="container">
        <div className="row">
          <div className="col-3 logo">
            <img src={logo} alt="" />
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