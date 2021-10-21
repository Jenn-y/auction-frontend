import * as React from 'react'
import './Footer.scss'
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faInstagram, faTwitter, faSkype } from "@fortawesome/free-brands-svg-icons"

const Footer = () => (
  <footer className="footer_area">
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-6 col-lg">
          <div className="general-info">
            <h5 className="title">AUCTION</h5>
            <div className="footer_menu">
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/terms_conditions">Terms and Conditions</Link></li>
                <li><Link to="/privacy_policy">Privacy and Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg">
          <div className="general-info">
            <h5 className="title">GET IN TOUCH</h5>
            <div className="footer_menu">
              <ul>
                <li>Call Us At +123 797-567-2535</li>
                <li>support@auction.com</li>
                <div className="footer_social_area">
                  <a href="https://www.facebook.com/dzenita.djulovic/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faFacebook} /></a>
                  <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
                  <a href="https://twitter.com/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
                  <a href="https://join.skype.com/invite/nHXgfPkkV7sM" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faSkype} /></a>
                </div>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg">
          {/* newsletter section to be added later here
          <div className="general-info">
            <h5 className="title">NEWSLETTER</h5>
            <div className="footer_menu">
              <ul>
                <li>Enter your email adress and get notified about new products. We hate spam!</li>
              </ul>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  </footer>
)
export default Footer