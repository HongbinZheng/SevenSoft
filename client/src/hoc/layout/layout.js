import React, { Component } from 'react';
import './layout.css'

import Header from '../../components/Header/header'
import NavBar from "../../components/navbar/NavBar"
import Footer from '../../components/footer/footer'


class Layout extends Component {

    state ={

    }

    render() {
        return (
            <div>
                <Header/>
                    <NavBar/>
                    <div style={{minHeight:window.innerHeight-245}}>
                    {this.props.children}
                    </div>
                <Footer/>
            </div>
        );
    }
}

export default Layout;