import React from 'react';
import style from './footer.css'

const Footer = () => {
        return (
            <div className={style.footer}>
                <div className={style.info}>
                    <h1><p>Contact information</p></h1>
                         <p>No contact info avaliable</p>
                         <p>TAKE WHAT YOU GET</p>                   
                </div>
            </div>
        );
}

export default Footer;