import React, { Component } from 'react';

class CartItemlist extends Component {

    constructor(props) {
        super(props)
        // var item = this.props.item
        if(localStorage.getItem('cart') != null) {
          var cartString = localStorage.getItem('cart')
          var cart = JSON.parse(cartString)
          if(cart.hasOwnProperty(this.props.item.itemID)) {
            var quantityInCart = cart[this.props.item.itemID].quantityInCart
            console.log('Quantity of item with itemID '+this.props.item.itemID+ ' is ' + quantityInCart);
            this.state = {quantityInCart: quantityInCart}
            console.log("State " + this.state.quantityInCart);
          } else {
            this.state = {
              quantityInCart: 0
            }
          }
        } else {
          this.state = {
            quantityInCart: 0
          }
        }
      }


    render() {
        return (
            <div>
            <li className="list-group-item CartItem">
                <h3 className="card-title text-left"><strong>{this.props.item.name}<button type="button" className="btn btn-secondary float-right">X</button></strong></h3>
                <h5 className="card-text text-left">Qty: {this.props.item.quantityInCart}</h5>
                <h4 className="card-text text-right">${(this.props.item.price * this.props.item.discount * this.props.item.quantityInCart).toFixed(2)}</h4>
            </li>
            </div>
        );
    }
}

export default CartItemlist;