import React, { Component } from 'react';
import {Link } from 'react-router-dom'; 
import Style from './navbar.css'



class NavBar extends Component {
        render (){
     return(
         <div className={Style.navbar}>
            <nav className="navbar sticky-top navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className ="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className ="navbar-nav">
                        <a href="/produce" className ="btn btn-danger" role="button" aria-pressed="true">Produce</a>
                        <a href="/meats" className ="btn btn-danger" role="button" aria-pressed="true">Meats</a>
                        <a href="/beverages" className ="btn btn-danger" role="button" aria-pressed="true">Beverages</a>
                        <a href="/dairy" className ="btn btn-danger" role="button" aria-pressed="true">Dairy</a>
                        <a href="/profile" className ="btn btn-danger" role="button" aria-pressed="true">Login</a>
                    </ul>
                </div>
            </nav>
         </div>
                        
        );
     }
    
}

export default NavBar;