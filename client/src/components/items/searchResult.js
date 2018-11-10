import React, { Component } from "react";
import { Link } from "react-router-dom";

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemResults: [],
      quantityInCart: 0
    };
    this.handleAddtoCart = this.handleAddtoCart.bind(this);
  }

  componentWillMount() {
    localStorage.getItem("items") &&
      this.setState({
        itemResults: JSON.parse(localStorage.getItem("items"))
      });
  }

  componentDidMount() {
    localStorage.removeItem("items");
  }

  handleAddtoCart(stuff) {
    console.log(stuff);
    var quantityInCart = this.state.quantityInCart;
    var item = {
      itemid: stuff.itemNo,
      name: stuff.name,
      price: stuff.price,
      discount: stuff.discount,
      avgStars: stuff.avgstars,
      nrates: stuff.nrates
    };
    console.log(item);
    if (localStorage.getItem("cart") != null) {
      var cartString = localStorage.getItem("cart");
      var cart = JSON.parse(cartString);
      //console.log(cart[stuff.itemNo].quantityInCart)
      if (cart[stuff.itemNo]) {
        item.quantityInCart = cart[stuff.itemNo].quantityInCart + 1;
      } else {
        // quantityInCart += 1
        item.quantityInCart = 1;
      }
      cart[stuff.itemNo] = item;
      localStorage.setItem("cart", JSON.stringify(cart));
      this.setState({ quantityInCart: quantityInCart });
      window.location.reload();
    } else {
      var cart = {};
      item.quantityInCart = ++quantityInCart;
      cart[stuff.itemNo] = item;
      localStorage.setItem("cart", JSON.stringify(cart));
      this.setState({ quantityInCart: quantityInCart });
      window.location.reload();
    }
  }

  render() {
    console.log(this.state.itemResults);
    return this.state ? (
      <div
        className="container-fluid"
        style={{ minHeight: window.innerHeight - 245 }}
      >
        <h1>
          {this.state.itemResults.map(items => (
            <div
              key={items.itemNo}
              className="rounded float-left"
              style={{ margin: "10px", border: "1px solid #C2C2C2" }}
            >
              <div className="card" style={{ width: "20rem", height: "26rem" }}>
                <Link to={`/${items.aisle}/${items.name}`}>
                  <img
                    className="card-img-top"
                    style={{ width: "318px", height: "212.28px" }}
                    src={`/images/aisle/${items.name}.png`}
                    alt="Card cap"
                  />
                </Link>
                <div className="card-body">
                  <Link to={`/${items.aisle}/${items.name}`}>
                    <h2
                      className="card-title"
                      style={{
                        textAlign: "center",
                        height: "50px",
                        color: " 	#708090"
                      }}
                    >
                      {items.name}
                    </h2>
                  </Link>

                  {items.discount !== 1 ? (
                    <div style={{ position: "relative", textAlign: "center" }}>
                      <p
                        className="card-text"
                        style={{
                          textAlign: "center",
                          textDecorationLine: "line-through",
                          fontSize: 18,
                          color: "grey",
                          display: "inline"
                        }}
                      >
                        ${items.price}
                      </p>
                      <p
                        className="card-text"
                        style={{
                          textAlign: "center",
                          color: "red",
                          fontStyle: "bold",
                          display: "inline",
                          fontSize: 30
                        }}
                      >
                        ${items.price * items.discount}
                      </p>
                    </div>
                  ) : (
                    <p
                      className="card-text"
                      style={{
                        textAlign: "center",
                        fontSize: 30,
                        height: "40px"
                      }}
                    >
                      ${items.price * items.discount}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => this.handleAddtoCart(items)}
                  className="btn btn-dark"
                  style={{ position: "relative", bottom: "0px" }}
                >
                  Add to cart <i className="fas fa-cart-plus" />
                </button>
              </div>
            </div>
          ))}
        </h1>
      </div>
    ) : (
      <div>This is nothing page</div>
    );
  }
}

export default SearchResult;
