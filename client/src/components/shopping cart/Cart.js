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
        // this.getTotalPrice(this.state.cartItems);
        // this.handleRemove = this.handleRemove.bind(this)
        // this.handleIncrease = this.handleIncrease.bind(this)
        // this.handleDecrease = this.handleDecrease.bind(this)
    }

    componentDidMount(){
        var cartString = localStorage.getItem('cart')
        var cart = JSON.parse(cartString)
        let item ={
            cartItems:this.getItemsFromCart(cart)
        }
        console.log(item)
        console.log(this.state)
        if(item.cartItems.length !== this.state.cartItems.length){
            this.setState({cartItems:item.cartItems})
        }
    }

    getItemsFromCart = (cart) => {
        var cartItems = []
        for(var itemID in cart) {
          cartItems.push(cart[itemID])
        }
        return cartItems
      }

    render() {
        let total = 0;

        return(
            <div className="Cart card col-2 shadow rounded float-right" style={{position:"relative",border:"1px solid #000000"}}>
                    <h1 className="card-header text-center">Shopping Cart</h1>
                   
                    <CartItem items={this.state.cartItems}/>

                    <h2 className="card-text text-left" >Total: <div className="text-right">${total.toFixed(2)}</div></h2>
            </div>

        )
    }
}

export default Cart;