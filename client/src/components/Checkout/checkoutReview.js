import React, { Component } from 'react';

class CheckoutReview extends Component {
    constructor(props) {
        super(props)
        this.state={

        }
        if(localStorage.getItem('cart') != null) {
            var cartString = localStorage.getItem('cart')
            var cart = JSON.parse(cartString)
            this.state ={cartItems: this.getItemsFromCart(cart), totalPrice: 0,qty:0}
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
            <div className="container" style={{marginTop:"50px",marginBottom:"300px",width:"750px",textAlign:"center"}}> 
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
                <div className="col" style={{marginTop:"50px"}}>
                <h2 className="card-text text-right" >Subtotal: ${this.getTotalPrice(this.state.cartItems).toFixed(2)}</h2>
                </div>
            </div>
        );
    }
}

export default CheckoutReview;