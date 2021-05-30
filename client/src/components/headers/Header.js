import React, {useContext, useEffect} from 'react';
import {Link} from 'react-router-dom'
import { GlobalState } from '../../GlobalState';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faStore } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import logo from './logo_site.png';
import AOS from 'aos';
import "aos/dist/aos.css";

function Header(){

  useEffect(() => {
    AOS.init({});
  })

    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin

    const logoutUser = async () => {
        await axios.get('/user/logout');
        localStorage.removeItem('firstLogin')
        window.location.href = "/";
    }

    const adminRouter = () =>{
      return(
        <React.Fragment>

<li data-aos="fade-in" class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <FontAwesomeIcon icon={faList} /> Back-Office
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
        <a className="dropdown-item"><Link className="nav-link" to="/create_product"><FontAwesomeIcon icon={faPlus} /> Manage Products</Link></a>
            <a className="dropdown-item"><Link className="nav-link" to="/category"><FontAwesomeIcon icon={faList} /> Manage Categories</Link></a>
        </div>
      </li>    
        
        </React.Fragment>
        
      )
    }

    const loggedRouter = () =>{
      return(
        <React.Fragment>
            <li data-aos="fade-in" className="nav-item"><Link className="nav-link" to="/history"><FontAwesomeIcon icon={faHistory} /> History</Link></li>
            <li data-aos="fade-in" className="nav-item"><Link className="nav-link" to="/" onClick={logoutUser}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Link></li>
        </React.Fragment>
      )
    }

    return(
    <header>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <Link to="/" exact="" className="navbar-brand"><img data-aos="zoom-in" src={logo} /></Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">
      <li data-aos="fade-in" className="nav-item">
        <Link to="/" exact="" className="nav-link"><FontAwesomeIcon icon={faStore} /> {isAdmin ? 'Products' : 'Shop'}</Link></li>

        {isAdmin && adminRouter()}

        {
        isLogged ? loggedRouter() : <React.Fragment><li class="nav-item dropdown">
        <a data-aos="fade-in" class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <FontAwesomeIcon icon={faUser} /> Authentication
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a className="dropdown-item"><Link to="/login" className="nav-link"><FontAwesomeIcon icon={faUser} /> Login</Link></a>
            <a className="dropdown-item"><Link to="/register" className="nav-link"><FontAwesomeIcon icon={faUserPlus} /> Register</Link></a> 
        </div>
      </li></React.Fragment>
        }

      
      <li data-aos="fade-in" className="nav-item">
        {
          isLogged ? <Link to="/cart" className="nav-link"><FontAwesomeIcon icon={faShoppingCart} /> Cart</Link> : '' 
        }
      </li>
    </ul>
  </div>
</nav>
</header>
    )
}

export default Header;