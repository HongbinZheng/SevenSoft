import React from 'react';
import style from './header.css';

const Header = () => {
   
    const logo = () =>{
        return(
            <a href="/" className={style.logo}>
                <img alt="Medium Banner" src="/images/home/medium banner.png"/>
            </a>
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