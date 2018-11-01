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
                    {this.props.children}
                <Footer/>
            </div>
        );
    }
}

export default Layout;