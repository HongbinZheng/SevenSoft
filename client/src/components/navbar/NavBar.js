import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import jwt from "jsonwebtoken";
import Cart from "../../components/shopping cart/Cart";
import Search from "../Search/search";
import Authserver from "../authserver";
import Popup from "reactjs-popup";
import Login from "../User/login";
import Register from "../User/register";
import "./navbar.css";

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
        return <div className="sticky-top" style={{ marginTop: "0px", boxShadow:'0 10px 20px -8px rgba(0, 0, 0,.7)' }}>
            <nav className="navbar  navbar-expand-lg navbar-light bg-light" id="navBar">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>

                        
                        
                      


              <div className="collapse navbar-collapse mx-auto" id="navbarSupportedContent" style={{ width: "100%"}}>
                  <a style={{fontFamily: "Lucida Handwriting", boxShadow:'0 10px 20px -8px rgba(0, 0, 0,.7)', fontSize:20}} href="/" className="btn btn-info text-center float-left" role="button" aria-pressed="true">Home</a>
                <ul className="navbar-nav mr-auto btn-group-lg" style={{marginLeft:'306px'}}>
                  <a style={{fontFamily: "Lucida Handwriting"}} href="/aisle/produce" className="btn btn-light text-center" role="button" aria-pressed="true">
                    Produce
                  </a>
                  <a style={{fontFamily: "Lucida Handwriting"}} href="/aisle/meats" className="btn btn-light text-center" role="button" aria-pressed="true">
                    Meats
                  </a>
                  <a style={{fontFamily: "Lucida Handwriting"}} href="/aisle/beverages" className="btn btn-light text-center" role="button" aria-pressed="true">
                    Beverages
                  </a>
                  <a style={{fontFamily: "Lucida Handwriting"}} href="/aisle/dairy" className="btn btn-light text-center" role="button" aria-pressed="true">
                    Dairy
                  </a>
                  <a style={{fontFamily: "Lucida Handwriting"}} href="/aisle" className="btn btn-light text-center" role="button" aria-pressed="true">
                    More
                  </a>
                </ul>
              
              {this.state.isLogged ? <div style={{boxShadow:'0 10px 20px -8px rgba(0, 0, 0,.7)'}}>
                  <div className="nav-item dropdown btn btn-info">
                    <a className="nav-link dropdown-toggle keep-open" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <b style={{fontFamily: "Lucida Handwriting"}}> Hello {this.state.username} </b>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                      <a className="dropdown-item" href="/profile" style={{ borderBottom: "1px solid #C2C2C2", fontFamily: "Lucida Handwriting", height: "40px", textAlign: "center" }}>
                        <b style={{fontFamily: "Lucida Handwriting"}}>My Profile</b>
                      </a>
                      <a className="dropdown-item" href="/orders" style={{ borderBottom: "1px solid #C2C2C2", fontFamily: "Lucida Handwriting", height: "45px", textAlign: "center" }}>
                        <b style={{fontFamily: "Lucida Handwriting"}}>My Orders</b>
                      </a>
                      <a className="dropdown-item" href="/watchList" style={{ fontFamily: "Lucida Handwriting", textAlign: "center" }}>
                        <b>Watch list</b>
                      </a>
                      <div className="dropdown-divider" />
                      <button type="button" onClick={this.handleLogout.bind(this)} className="btn btn-info col-sm">
                        <b style={{fontFamily: "Lucida Handwriting"}}>Logout</b>
                      </button>
                    </div>
                  </div>
                </div> : <div>
                  <Popup trigger={<button style={{fontFamily: "Lucida Handwriting", boxShadow:'0 10px 20px -8px rgba(0, 0, 0,.7)', fontSize:20}} className="btn btn-info"> Login/Sign Up</button>} modal contentStyle={{width:'250px'}}>
                    <div style={{fontFamily: "Lucida Handwriting"}}>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#login" role="tab"
                                   aria-controls="login" aria-selected="true">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#register" role="tab"
                                   aria-controls="register" aria-selected="false">Register</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="login" role="tabpanel"
                                 aria-labelledby="login-tab"><Login />
                            </div>
                            <div className="tab-pane fade" id="register" role="tabpanel"
                                 aria-labelledby="register-tab"><Register />
                            </div>
                        </div>
                    </div>
                  </Popup>
                </div>}
</div>
            </nav>
            <div className="float-right" style={{ top: 200 }}>
              <Cart />
            </div>
            <div className="nav-item" style={{ position: "absolute", width: "100%" }}>
              <form className="form-inline">
                <div style={{ position: "relative", margin: "auto"}}>
                  <Search />
                </div>
              </form>
            </div>
          </div>;
    }
    
}

export default withRouter(NavBar);