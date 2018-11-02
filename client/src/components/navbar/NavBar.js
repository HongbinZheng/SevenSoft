import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import jwt from'jsonwebtoken'
import Cart from '../../components/shopping cart/Cart';
import Search from '../Search/search';
import Authserver from '../authserver';


import CartItem from '../shopping cart/CartItem';

class NavBar extends Component {
        constructor(){
        super()
        this.state={
            isLogged:false,
            username:''
        }
        this.Auth = new Authserver()
        this.handleLogout.bind(this)
    }

    
        componentDidMount(){
            if(this.Auth.loggedIn()){
                var SERECT = "superserect"
                const token = localStorage.getItem('id_token')
                var decoded = jwt.verify(token, SERECT);
                console.log(decoded)
                this.setState({isLogged: true,username:decoded})
            }else{
                this.setState({isLogged: false})
            }
        }

        handleLogout(e){
            e.preventDefault();
            this.Auth.logout();
            this.props.history.replace('/')
            window.location.reload()
        }
    
    
        render(){
        return (
            <div className="sticky-top">
             <nav className="navbar  navbar-expand-lg navbar-light bg-light center" id = "navBar">
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
                     </ul>
                        
            
                        <form className="form-inline">
                            <Search />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        {this.state.isLogged ? 
                        <div >
                            <div className="nav-item dropdown ">
                                <a className="nav-link dropdown-toggle keep-open" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Hello {this.state.username}
                                </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#">My Profile</a>
                                    <a className="dropdown-item" href="#">My Orders</a>
                                    <a className="dropdown-item" href="#">Watch list</a>
                                    <div className="dropdown-divider"></div>
                                    <button type="button" onClick={this.handleLogout.bind(this)}>Logout</button>
                                </div >
                            </div >
                        </div >
                        : <a href="/profile" className ="btn btn-primary text-center" role="button" aria-pressed="true">Login</a>}
                        
                 </div>



             <Cart />
             </nav>
             </div>                    
        );
        }
    
}

export default withRouter(NavBar);         
        