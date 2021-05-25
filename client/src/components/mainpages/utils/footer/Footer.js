import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../../../headers/logo_site.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { faAt } from '@fortawesome/free-solid-svg-icons'


function Footer() {
    return (
        <footer className="container-fluid">
            <Link to="/">
                <img className="footer-logo" src={logo} alt="Arvazon Logo" />
            </Link>
            <div className="footer-info">
            <FontAwesomeIcon icon={faAt}  size="2x" title="Edit category" />
            <p className="text-white">&nbsp;info@arvazon.com</p>
            </div>
            <div className="footer-info">
            <FontAwesomeIcon icon={faMapMarkerAlt}  size="2x" title="Edit category" />
            <p className="text-white">&nbsp;Turin, Italy</p>
            </div>
            <hr className="hr-footer"></hr>
            <p className="marginb0 text-white">&copy; ArvaZon 2021 - All rights reserved</p>
        </footer>
    )
}

export default Footer
