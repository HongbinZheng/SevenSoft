import React, { Component } from 'react';
import {firebaseDB} from '../../firebase';
import Authserver from'../authserver'
<<<<<<< HEAD
import jwt from'jsonwebtoken';

=======
import jwt from'jsonwebtoken'
>>>>>>> fetch_head

class CheckoutReview extends Component {
    constructor(props) {
        super(props)
        this.state={
<<<<<<< HEAD

=======
            promoCode:"",
            promo:''
>>>>>>> fetch_head
        }
        if(localStorage.getItem('cart') != null) {
            var cartString = localStorage.getItem('cart')
            var cart = JSON.parse(cartString)
<<<<<<< HEAD
            this.state ={cartItems: this.getItemsFromCart(cart), totalPrice: 0,qty:0}
          }
          this.getTotalPrice(this.state.cartItems);
          this.Auth = new Authserver();
    }

=======
            this.state ={cartItems: this.getItemsFromCart(cart), totalPrice: 0,qty:0,promoCode:"",promo:''}
          } 
          this.getTotalPrice(this.state.cartItems);
          this.handleOnClick = this.handleOnClick.bind(this)
          this.Auth = new Authserver();
    }

    handleOnChange=(event)=>{
        this.setState({promoCode:event.target.value})
    }

    handleOnClick(){
        if(this.state.promoCode === 'SAVE30'){
            this.setState({promo:true})
        }else{
            this.setState({promo:false})
        }
    }

>>>>>>> fetch_head
    getItemsFromCart = (cart) => {
        var cartItems = []
        for(var itemID in cart) {
          cartItems.push(cart[itemID])
        }
        return cartItems
      }

      handleCheckOut(items){
<<<<<<< HEAD
        // if(this.Auth.loggedIn()){
        //     var SERECT = "superserect"
        //     const token = localStorage.getItem('id_token')
        //     var decoded = jwt.verify(token, SERECT);
        //     items.forEach(item=>{item.myRate = 0});
        //     console.log(items);
        //     firebaseDB.ref(`/orders/${decoded}`).push(items);
        // }
        this.props.history.push('/Checkout')
=======
        if(this.Auth.loggedIn()){
            var SERECT = "superserect"
            const token = localStorage.getItem('id_token')
            var decoded = jwt.verify(token, SERECT);
            items.forEach(item=>{item.myRate = 0});
            console.log(items);
            firebaseDB.ref(`/orders/${decoded}`).push(items);
        }
        this.props.history.push('/')
>>>>>>> fetch_head
      }

      getTotalPrice(items) {
        var tPrice = 0
        items.forEach((item) => {
            tPrice += item.price * item.discount * item.quantityInCart
        })
<<<<<<< HEAD
        return tPrice
    }


    render() {
        console.log(this.state)
        return (
            <div className="container" style={{marginTop:"50px",marginBottom:"300px",width:"750px",textAlign:"center"}}>
=======
        if(this.state.promo){
            tPrice = tPrice * 0.7;
        }
        return tPrice
    }
    errorMessage(){
        let errorMessage = ""
        if(this.state.promo === false){
            errorMessage = "Wrong Promo Code"
        }
        return errorMessage
    }


    render() {        
        console.log(this.state)
        return (
            <div className="container" style={{marginTop:"50px",marginBottom:"300px",width:"750px",textAlign:"center"}}> 
>>>>>>> fetch_head
                <div className="row">
                      <div className="col">
                        Item Name
                      </div>
                      <div className="col">
                        Qty
                      </div>
                      <div className="col">
                        Price
                      </div>
                    </div>
                {this.state.cartItems.map((item,index) => {
                    return(
                    <div className="container" key={item.itemid} style={{border:"1px solid #000000",width:"700px",height:"150px",alignItems: 'center',backgroundColor:"white"}}>
                            <div className="row" style={{marginTop:"30px"}}>
                            <div className="col">
                                <img className="card-img-top" style={{width:'40%',height:'40%'}} src={`/images/aisle/${item.name}.png`} alt='Card cap'/>
                                    <h5>{item.name}</h5>
                                    </div>
                                    <div className="col">
                                    <h3>
                                    {item.quantityInCart}</h3>
                                    </div>
                                    <div className="col">
                                    <h3 className="card-text">${(item.price * item.discount*item.quantityInCart).toFixed(2)}</h3>
                                    </div>
                            </div>
                  </div>
                    )
                })}
<<<<<<< HEAD
=======
                    <div>
                    <input 
                    type="text" 
                    placeholder="Enter Promo Code" 
                    value={this.state.promoCode}
                    onChange={this.handleOnChange}
                    ></input>
                    <button onClick={this.handleOnClick}>Apply</button>
                    {this.state.promo === null ? null : this.errorMessage()}
                    </div>
>>>>>>> fetch_head
                <div className="col" style={{marginTop:"50px"}}>
                <h2 className="card-text text-right" >Subtotal: ${this.getTotalPrice(this.state.cartItems).toFixed(2)}</h2>
                <button className="check out button" onClick={()=>this.handleCheckOut(this.state.cartItems)}> Check Out</button>
                </div>
            </div>
        );
    }
}

<<<<<<< HEAD
export default CheckoutReview;
=======
export default CheckoutReview;
>>>>>>> fetch_head
