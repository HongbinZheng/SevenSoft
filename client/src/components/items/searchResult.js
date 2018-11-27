import React, { Component } from "react";
import { Link } from "react-router-dom";

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemResults: [],
      quantityInCart: 0
    };
    if(localStorage.getItem('items') !== null) {
      var cartString = localStorage.getItem('items')
      var items = JSON.parse(cartString)
      this.state ={itemResults: this.getItems(items), quantityInCart:0}
      localStorage.removeItem("items");
    } 

    this.handleAddtoCart = this.handleAddtoCart.bind(this);
  }
  getItems(item){
    var cartItems = []
        for(var itemID in item) {
          cartItems.push(item[itemID])
        }
        return cartItems
  }

  // componentWillMount() {
  //   localStorage.getItem("items")
  //     this.setState({
  //       itemResults: JSON.parse(localStorage.getItem("items"))
  //     });
  //     if(this.state.itemResults.length > 0){
  //     localStorage.removeItem("items");
  //     }
  // }


  handleAddtoCart(stuff) {
    var quantityInCart = this.state.quantityInCart;
    var item = {
      itemid: stuff.itemNo,
      name: stuff.name,
      price: stuff.price,
      discount: stuff.discount,
      avgStars: stuff.avgstars,
      nrates: stuff.nrates
    };
    
    if (localStorage.getItem("cart") != null) {
      var cartString = localStorage.getItem("cart");
      var cart = JSON.parse(cartString);

      if (cart[stuff.itemNo]) {
        item.quantityInCart = cart[stuff.itemNo].quantityInCart + 1;
      } else {
        // quantityInCart += 1
        item.quantityInCart = 1;
      }
      cart[stuff.itemNo] = item;
      localStorage.setItem("cart", JSON.stringify(cart));
      this.setState({ quantityInCart: quantityInCart });
    } else {
      var cart = {};
      item.quantityInCart = ++quantityInCart;
      cart[stuff.itemNo] = item;
      localStorage.setItem("cart", JSON.stringify(cart));
      this.setState({ quantityInCart: quantityInCart });
    }
  }

  render() {
    return this.state.itemResults.length > 0 ? (
      <div
        className="container-fluid"
        style={{minHeight:window.innerHeight-245, marginTop:'54px', fontFamily:'Lucida Handwriting'}}
      >
      <div style={{margin:'auto'}}>
        <h1>
          {this.state.itemResults.map(items => (
            <div
              key={items.itemNo}
              className="rounded float-left"
              style={{ margin: "10px", border: "1px solid #C2C2C2",display:"inline-block" }}
            >
              <div className="card" style={{ width: "20rem", height: "28rem" }}>
                <Link to={`/aisle/${items.aisle}/${items.name}`}>
                  <img
                    className="card-img-top"
                    style={{ width: "318px", height: "212.28px" }}
                    src={`/images/aisle/${items.name}.png`}
                    alt="Card cap"
                  />
                </Link>
                <div className="card-body">
                  <Link to={`/aisle/${items.aisle}/${items.name}`}>
                    <h2
                      className="card-title"
                      style={{
                        textAlign: "center",
                        height: "50px",
                        color: "  #708090",
                        marginTop:'20px'
                      }}
                    >
                      {items.name}
                    </h2>
                  </Link>
                  </div>

                  {items.discount !== 1 ? (
                    <div style={{ position: "relative", textAlign: "center", marginBottom:'23px' }}>
                      <p
                        className="card-text"
                        style={{
                          textAlign: "center",
                          textDecorationLine: "line-through",
                          fontSize: 25,
                          color: "grey",
                          display: "inline"
                        }}
                      >
                        ${(items.price).toFixed(2)}
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
                        ${(items.price * items.discount).toFixed(2)}
                      </p>
                    </div>
                  ) : (
                  <div style={{marginBottom:'24px'}}>
                    <p
                      className="card-text"
                      style={{
                        textAlign: "center",
                        fontSize: 30,
                        height: "40px"
                      }}
                    >
                      ${(items.price * items.discount).toFixed(2)}
                    </p>
                    </div>
                  )}
                <button
                  onClick={() => this.handleAddtoCart(items)}
                  className="btn btn-info"
                  style={{ position: "relative", marginBottom: "0px" }}
                >
                  Add to cart <i className="fas fa-cart-plus" />
                </button>
              </div>
            </div>
          ))}
        </h1>
      </div>
      </div>
    ) : (
      <div className="row" style={{marginLeft:'25%', marginTop:'8%'}}>
            <div className="col" style={{maxWidth:'200px'}}>
                <img className="float-right" style={{width:'240%'}} src="/images/home/404.png" alt="No search results"></img>
            </div>
            <div className="col">
                
                <h1 style={{fontSize:60, marginTop:'7%'}}>Ugh...Sorry!</h1>
                <h1 style={{fontSize:30}}>
                Seems like we don't have what you're looking for...
            </h1>
            </div>
            
            </div>
    );
  }
}

export default SearchResult;