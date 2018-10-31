import React from 'react';
import {Link } from 'react-router-dom';
import Cart from '../../components/shopping cart/Cart'


const NavBar = () => {
        return (
            <div className="sticky-top">
             <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
                 <a className="navbar-brand" href="/">Navbar</a>
                 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                     <span className="navbar-toggler-icon"></span>
                 </button>

                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
                     <ul className="navbar-nav mr-auto">
                         <li className="nav-item active">
                         </li>
                         <li className="nav-item">
                             <a className="nav-link" href="/Meats">Meats</a>
                             <a className="nav-link" href="/Dairy">Dairy</a>
                             <a className="nav-link" href="/Produce">Produce</a>
                             <a className="nav-link" href="/Beverages">Beverages</a>
                             <a className="nav-link" href="/Snacks">Snacks</a>
                             <a className="nav-link" href="/profile">Profile</a>                   
                         </li>
                         <li className="nav-item">
                             <a className="nav-link disabled" href="/">Disabled</a>
                         </li>
                     </ul>
                     <form className="form-inline my-2 my-lg-0">
                         <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                         <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                     </form>
                 </div>
             </nav>
             <Cart />
             </div>
                        
        );
     }
    

export default NavBar;