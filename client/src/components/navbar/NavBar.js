import React from 'react';
import {Link } from 'react-router-dom';
import style from './navbar.css';


const NavBar = () => {
        return (
             <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light center" id = "navBar">
                 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                     <span className="navbar-toggler-icon"></span>
                 </button>

                 <div className="collapse navbar-collapse mx-auto" id="navbarSupportedContent">
                     <ul className="navbar-nav mr-auto btn-group-lg">
                        <a href="/produce" className ="btn btn-light text-center" role="button" aria-pressed="true">Produce</a>
                        <a href="/meats" className ="btn btn-light text-center" role="button" aria-pressed="true">Meats</a>
                        <a href="/beverages" className ="btn btn-light text-center" role="button" aria-pressed="true">Beverages</a>
                        <a href="/dairy" className ="btn btn-light text-center" role="button" aria-pressed="true">Dairy</a>
                        <a href="/" className ="btn btn-light text-center" role="button" aria-pressed="true">More>></a>
                        <a href="/profile" className ="btn btn-light text-center" role="button" aria-pressed="true">Login</a>
                     </ul>
                 </div>
             </nav>        
        );
    
    
}

export default NavBar;         
        