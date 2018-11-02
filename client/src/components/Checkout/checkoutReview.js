import React, { Component } from 'react';

class CheckoutReview extends Component {
    constructor(props) {
        super(props)
        if(localStorage.getItem('cart') != null) {
            var cartString = localStorage.getItem('cart')
            var cart = JSON.parse(cartString)
            this.state ={cartItems: this.getItemsFromCart(cart), totalPrice: 0}
          } 
          this.getTotalPrice(this.state.cartItems);
    }

    getItemsFromCart = (cart) => {
        var cartItems = []
        for(var itemID in cart) {
          cartItems.push(cart[itemID])
        }
        return cartItems
      }

      getTotalPrice(items) {
        var tPrice = 0
        items.forEach((item) => {
            tPrice += item.price * item.discount * item.quantityInCart
        })
        return tPrice
    }

    render() {        
        console.log(this.state)
        return (
            <div className="container"> 
                {this.state.cartItems.map(item => {
                    return(
                    <div className="container">
                    <div className="row">
                    </div>
                    <div className="row">
                      <div className="col">
                        {item.name}
                      </div>
                      <div className="col">
                        {item.quantityInCart}
                      </div>
                      <div className="col">
                        {item.price*item.discount*item.quantityInCart}
                      </div>
                    </div>
                  </div>
                    )
                })}
               
            </div>
        );
    }
}

export default CheckoutReview;