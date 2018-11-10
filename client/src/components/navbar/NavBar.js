import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import jwt from "jsonwebtoken";
import Cart from "../../components/shopping cart/Cart";
import Search from "../Search/search";
import Authserver from "../authserver";

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      isLogged: false,
      username: ""
    };
    this.Auth = new Authserver();
    this.handleLogout.bind(this);
  }

  componentDidMount() {
    if (this.Auth.loggedIn()) {
      var SERECT = "superserect";
      const token = localStorage.getItem("id_token");
      var decoded = jwt.verify(token, SERECT);
      this.setState({ isLogged: true, username: decoded });
    } else {
      this.setState({ isLogged: false });
    }
  }

    handleLogout(e) {
        e.preventDefault();
        this.Auth.logout();
        this.props.history.replace('/')
        window.location.reload()
    }


    render() {
        return (
            <div className="sticky-top" style={{ marginTop: '0px' }}>
                <nav className="navbar  navbar-expand-lg navbar-light bg-light" id="navBar">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse mx-auto" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto btn-group-lg">
                            <a href="/produce" className="btn btn-light text-center" role="button" aria-pressed="true">Produce</a>
                            <a href="/meats" className="btn btn-light text-center" role="button" aria-pressed="true">Meats</a>
                            <a href="/beverages" className="btn btn-light text-center" role="button" aria-pressed="true">Beverages</a>
                            <a href="/dairy" className="btn btn-light text-center" role="button" aria-pressed="true">Dairy</a>
                            <a href="/" className="btn btn-light text-center" role="button" aria-pressed="true">More>></a>
                        </ul>



                        {this.state.isLogged ?
                            <div >
                                <div className="nav-item dropdown btn btn-info">
                                    <a className="nav-link dropdown-toggle keep-open" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <b> Hello {this.state.username} </b>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="#" style={{ borderBottom: '1px solid #C2C2C2', fontFamily: 'Roboto', height: '40px', textAlign: 'center' }}><b>My Profile</b></a>
                                        <a className="dropdown-item" href="/orders" style={{ borderBottom: '1px solid #C2C2C2', fontFamily: 'Roboto', height: '45px', textAlign: 'center' }}><b>My Orders</b></a>
                                        <a className="dropdown-item" href="/watchList" style={{ fontFamily: 'Roboto', textAlign: 'center' }}><b>Watch list</b></a>
                                        <div className="dropdown-divider"></div>
                                        <button type="button" onClick={this.handleLogout.bind(this)} className="btn btn-info col-sm"><b>Logout</b></button>
                                    </div >
                                </div >
                            </div >
                            : <a href="/profile" className="btn btn-primary text-center" role="button" aria-pressed="true">Login</a>}

                    </div>
                </nav>
                <div className="float-right" style={{ top: 200 }}>
                    <Cart />
                </div>
                <div className="nav-item text-center" style={{ marginLeft: '40%' }}>
                    <form className="form-inline">
                        <div>
                            <Search />
                        </div>
                        <div style={{ position: "relative", marginLeft: '10px' }}>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
    
}

export default withRouter(NavBar);
