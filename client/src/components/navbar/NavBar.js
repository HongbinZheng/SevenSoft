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
        return <div className="sticky-top" style={{ marginTop: "0px" }}>
            <nav className="navbar  navbar-expand-lg navbar-light bg-light" id="navBar">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>

              <div className="collapse navbar-collapse mx-auto" id="navbarSupportedContent" style={{ width: "100%" }}>
                <ul className="navbar-nav mr-auto btn-group-lg" style={{ marginLeft: "35%" }}>
                  <a href="/aisle/produce" className="btn btn-light text-center" role="button" aria-pressed="true">
                    Produce
                  </a>
                  <a href="/aisle/meats" className="btn btn-light text-center" role="button" aria-pressed="true">
                    Meats
                  </a>
                  <a href="/aisle/beverages" className="btn btn-light text-center" role="button" aria-pressed="true">
                    Beverages
                  </a>
                  <a href="/aisle/dairy" className="btn btn-light text-center" role="button" aria-pressed="true">
                    Dairy
                  </a>
                  <a href="/aisle" className="btn btn-light text-center" role="button" aria-pressed="true">
                    More>>
                  </a>
                </ul>
              </div>
              {this.state.isLogged ? <div>
                  <div className="nav-item dropdown btn btn-info">
                    <a className="nav-link dropdown-toggle keep-open" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <b> Hello {this.state.username} </b>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                      <a className="dropdown-item" href="/profile" style={{ borderBottom: "1px solid #C2C2C2", fontFamily: "Roboto", height: "40px", textAlign: "center" }}>
                        <b>My Profile</b>
                      </a>
                      <a className="dropdown-item" href="/orders" style={{ borderBottom: "1px solid #C2C2C2", fontFamily: "Roboto", height: "45px", textAlign: "center" }}>
                        <b>My Orders</b>
                      </a>
                      <a className="dropdown-item" href="/watchList" style={{ fontFamily: "Roboto", textAlign: "center" }}>
                        <b>Watch list</b>
                      </a>
                      <div className="dropdown-divider" />
                      <button type="button" onClick={this.handleLogout.bind(this)} className="btn btn-info col-sm">
                        <b>Logout</b>
                      </button>
                    </div>
                  </div>
                </div> : <div>
                  <Popup trigger={<button className="btn btn-primary"> Login/Sign Up</button>} modal contentStyle={{width:'250px'}}>
                    <div>
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
            </nav>
            <div className="float-right" style={{ top: 200 }}>
              <Cart />
            </div>
            <div className="nav-item" style={{ position: "absolute", width: "100%" }}>
              <form className="form-inline">
                <div style={{ position: "relative", margin: "auto" }}>
                  <Search />
                </div>
              </form>
            </div>
          </div>;
    }
    
}

export default withRouter(NavBar);