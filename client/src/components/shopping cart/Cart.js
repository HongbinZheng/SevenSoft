import React from 'react';
import CartItem from './CartItem';

class Cart extends React.Component {
    constructor(props) {
        super(props);
 
        if(localStorage.getItem('cart') != null) {
          var cartString = localStorage.getItem('cart')
          var cart = JSON.parse(cartString)
          this.state ={cartItems: this.getItemsFromCart(cart), totalPrice: 0}
        } else {
          this.state = {cartItems: [], totalPrice: 0}
        }
         this.getTotalPrice(this.state.cartItems);
         this.handleRemove = this.handleRemove.bind(this)
         this.handleIncrease = this.handleIncrease.bind(this)
         this.handleDecrease = this.handleDecrease.bind(this)
    }

    getItemsFromCart = (cart) => {
        var cartItems = []
        for(var itemID in cart) {
          cartItems.push(cart[itemID])
        }
        return cartItems
      }

    handleIncrease = (itemID) => {
        if (localStorage.getItem('cart') != null) {
            var cartString = localStorage.getItem('cart')
            var cart = JSON.parse(cartString)
            if (cart.hasOwnProperty(itemID)) {
                var item = cart[itemID]
                item.quantityInCart += 1
                cart[itemID] = item
                localStorage.setItem('cart', JSON.stringify(cart))
                this.setState({ cartItems: this.getItemsFromCart(cart) })
                var event = new Event('cartChanged');
                window.dispatchEvent(event);
            }
        }
    };

    handleDecrease = (itemID) => {
        if(localStorage.getItem('cart') != null) {
          var cartString = localStorage.getItem('cart')
          var cart = JSON.parse(cartString)
          if(cart.hasOwnProperty(itemID)) {
            if(cart[itemID].quantityInCart === 1){
                this.handleRemove(itemID);
            }else{
            var item = cart[itemID]
            item.quantityInCart -= 1
            cart[itemID] = item
            localStorage.setItem('cart', JSON.stringify(cart))
            this.setState({cartItems: this.getItemsFromCart(cart)})
            var event = new Event('cartChanged');
            window.dispatchEvent(event);}
          }
        }
      }

    // Remove the item from the cart
    handleRemove = (itemID) => {
        if (localStorage.getItem('cart') != null) {
            var cartString = localStorage.getItem('cart')
            var cart = JSON.parse(cartString)
            if (cart.hasOwnProperty(itemID)) {
                delete cart[itemID]
                localStorage.setItem('cart', JSON.stringify(cart))
                this.setState({ cartItems: this.getItemsFromCart(cart) })
                var event = new Event('cartChanged');
                window.dispatchEvent(event);
            }
        }
    }

    getTotalPrice(items) {
        var tPrice = 0
        items.forEach((item) => {
            tPrice += item.price * item.discount * item.quantityInCart
        })
        return tPrice
    }
    

    render() {
        return(
            <div className="Cart card col-2 shadow rounded float-right" style={{position:"relative",border:"1px solid #000000"}}>
                    <h1 className="card-header text-center">Shopping Cart</h1>
                   
                    <CartItem items={this.state.cartItems}
                            handleRemove={(itemID) => this.handleRemove(itemID)}
                            handleIncrease={(itemID) => this.handleIncrease(itemID)}
                            handleDecrease={(itemID) => this.handleDecrease(itemID)}
                    />

                    <h2 className="card-text text-left" >Total: <div className="text-right">${this.getTotalPrice(this.state.cartItems).toFixed(2)}</div></h2>
            </div>

        )
    }
}

export default Cart;