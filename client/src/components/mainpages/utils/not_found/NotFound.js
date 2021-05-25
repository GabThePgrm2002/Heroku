import React from 'react'
import logo from './notfound.svg';
import {Link} from 'react-router-dom';

function NotFound() {
    return (
        <>
        <div className="container center-block-message">
            <h1 className="page-title">Error 404 - Page Not Found</h1>
            <img className="img_not_found" src={logo} alt="" />
            <Link className="not_found_link" to="/">Back to Shop</Link>
        </div>
        </>
    )
}

export default NotFound
