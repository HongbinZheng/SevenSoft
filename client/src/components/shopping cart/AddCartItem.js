import React, {Component} from 'react';


export default class CartAction {
    constructor() {
        this.state = {
            quantityInCart: 0
        }
    this.addToCart = this.addToCart.bind(this)
    }

     addToCart (items)  {
        console.log(items);
         var quantityInCart = this.state.quantityInCart
         var item = {
           itemid: this.props.itemid,
           image: this.props.image,
           name: this.props.name,
           price: this.props.price,
           sale: this.props.sale,
           weight: this.props.weight
         }
      console.log("Prop quantity is " +this.props.quantity);
         if(localStorage.getItem('cart') !== null) {
           var cartString = localStorage.getItem('cart')
           console.log(cartString);
           var cart = JSON.parse(cartString)
           console.log(cart)
           quantityInCart += 1
           item.quantityInCart = quantityInCart
           cart[this.props.itemid] = item
           localStorage.setItem('cart', JSON.stringify(cart))
           this.setState({quantityInCart: quantityInCart})
       } else {
         var cart = {}
         item.quantityInCart = ++quantityInCart
         cart[this.props.itemid] = item
         localStorage.setItem('cart', JSON.stringify(cart))
         this.setState({quantityInCart: quantityInCart})
       }
      return items;
    }

}

