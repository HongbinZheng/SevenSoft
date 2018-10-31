import React from 'react';
import style from './header.css';
import {Link} from 'react-router-dom';

const Header = () => {
   
    const logo = () =>{
        return(
            <Link to="/" className={style.logo}>
                <img alt="Medium Banner" src="images/home/medium banner.png"/>
            </Link>
        )
    }
        return (
            <header className={style.header}>
                 <div>
                    {logo()}
                </div>
            </header>
        );
    
}

export default Header;