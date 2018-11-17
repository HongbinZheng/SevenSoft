import React from 'react';
import CartItem from './CartItem';
import { withRouter } from "react-router-dom";
import CustomizedBadge from './cartButton';

class Cart extends React.Component {
    constructor(props) {
        super(props);
        if(localStorage.getItem('cart') != null) {
          var cartString = localStorage.getItem('cart')
          var cart = JSON.parse(cartString)
          this.state ={cartItems: this.getItemsFromCart(cart), totalPrice: 0,hide:false}
        } else {
          this.state = {cartItems: [], totalPrice: 0,hide:false}
        }
         this.getTotalPrice(this.state.cartItems);
         this.handleRemove = this.handleRemove.bind(this)
         this.handleIncrease = this.handleIncrease.bind(this)
         this.handleDecrease = this.handleDecrease.bind(this)
         this.timer = this.timer.bind(this)
    }

    componentDidMount(){
        if(localStorage.getItem('cart') != null) {
            var cartString = localStorage.getItem('cart')
            var cart = JSON.parse(cartString)
            this.state ={cartItems: this.getItemsFromCart(cart), totalPrice: 0,hide:false}
          }
          this.countdown = setInterval(this.timer, 1000);

    }

    timer() {
        if(localStorage.getItem('cart') !== ""){
        var cartString = localStorage.getItem('cart')
        var cart = JSON.parse(cartString)
        var newItem =[];
        //console.log(this.state.cartItems)
        for(var itemID in cart){
            newItem.push(cart[itemID])
        }
        if(!(JSON.stringify(newItem) == JSON.stringify(this.state.cartItems))){
           this.setState({cartItems:newItem})
        }
        }
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
            if(cart[itemID].quantityInCart === 1 || cart[itemID].quantityInCart === 0){
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

    getTotalQyt(){
        var qty = 0
        if (localStorage.getItem('cart') != null) {
            var cartString = localStorage.getItem('cart')
            var cart = JSON.parse(cartString)
            console.log(cart)
            var result = Object.keys(cart).map(function(key) {
                return cart[key];
              });
              console.log(result)
            result.forEach(item=>{
                qty += item.quantityInCart
            })
        }
        return qty
    }
     handleCheckoutClick = (items) => {
         if(items.length !== 0){
            this.props.history.push('/review')
         }
      }
    
    render() {
        return(
            this.state.cartItems.length > 0 ?
              <div className = "CartDiv" style = {{position:'absolute', right:'45px', top:'100px'}}>
                <span className="btn btn-success" role="button" data-toggle="collapse" data-target="#cartopen" aria-expanded="false" aria-controls="#cartopen" aria-haspopup="true" text-align="center" margin = "auto" style={{width:'60px', height:'60px', borderRadius:'50%',textAlign:"center"}}>
                   <CustomizedBadge qty={this.getTotalQyt()}/>
                 </span> 
                 <div className="collapse" id="cartopen" style={{border:"1px solid #C2C2C2", backgroundColor:"#ffffff", width:'300px'}}>
                {/* <div className="Cart card shadow rounded float-right " style={{position:"relative", border:"1px solid #000000", right:"10px", top: "10px"}}>  */}
                <div>
                {/* <div className="Cart card shadow rounded float-right " style={{position:"relative", border:"1px solid #000000", right:"10px", top: "10px"}}> */}
                    <h3 className="card-header text-center" style={{backgroundColor:"#5cb85c"}}>Shopping Cart</h3>
                    <div> 
                    <CartItem items={this.state.cartItems}
                            handleRemove={(itemID) => this.handleRemove(itemID)}
                            handleIncrease={(itemID) => this.handleIncrease(itemID)}
                            handleDecrease={(itemID) => this.handleDecrease(itemID)}
                    />
                    </div>
                    <h2 className="card-text text-left" style={{marginLeft:10,fontFamily:'cursive'}} >Total: <div className="text-right" style={{marginRight:10,fontFamily:'cursive'}}>${this.getTotalPrice(this.state.cartItems).toFixed(2)}</div></h2>
                        <button className="fas fa-shopping-cart fa-5x btn btn-info" style={{textAlign:"center",fontSize:30, marginLeft: '50px', marginBottom:'10px', marginTop:'10px'}} onClick={()=>this.handleCheckoutClick(this.state.cartItems)}> CheckOut </button>
                    </div>
            </div>
            </div> : null
           // </div>
           // </div>
        )
    }
}

export default withRouter(Cart);