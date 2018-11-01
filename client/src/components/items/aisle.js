import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cart from '../shopping cart/Cart';

class Aisle extends Component {
    constructor(){
    super();
    this.state = { 
        item:[],
        quantityInCart:0
    };
    this.shoppingCart = new Cart();
    this.handleAddtoCart = this.handleAddtoCart.bind(this)
    }
componentWillMount(){
   let items = this.props.match.params.aisle;
   axios.get(`/api/getItems?aisle=${items}`)
       .then(response => {
           const item = response.data
           this.setState({ item })
       })
}

handleAddtoCart(stuff){
      var quantityInCart = this.state.quantityInCart
      var item = {
         itemid: stuff.itemNo,
         name: stuff.name,
         price: stuff.price,
         discount: stuff.discount,
      }
      if(localStorage.getItem('cart') != null) {
        var cartString = localStorage.getItem('cart')
        var cart = JSON.parse(cartString)
        //console.log(cart[stuff.itemNo].quantityInCart)
        if(cart[stuff.itemNo]){
            item.quantityInCart = cart[stuff.itemNo].quantityInCart +1
        }else{
           // quantityInCart += 1
            item.quantityInCart = 1;
        }     
        cart[stuff.itemNo] = item
        localStorage.setItem('cart', JSON.stringify(cart))
        this.setState({quantityInCart: quantityInCart})
        window.location.reload()
         } else {
        var cart = {}
        item.quantityInCart = ++quantityInCart
        cart[stuff.itemNo] = item
        localStorage.setItem('cart', JSON.stringify(cart))
        this.setState({quantityInCart: quantityInCart})
        window.location.reload()
    }
}

render() {
   return (
       this.state  ? 
       <div style={{minHeight:window.innerHeight-245}}>
        <h1>
        {this.state.item.map(items =>      
        <div key={items.itemNo} className="rounded float-left" style={{margin:"40px",border:"1px solid #C2C2C2"}}>
            <div className="card" style={{width:"20rem", height:"26rem"}} >
                <Link to={`/${items.aisle}/${items.name}`}>
                <img className="card-img-top" style={{width:"318px",height:"212.28px"}} src={`/images/aisle/${items.name}.png`} alt="Card cap"></img>
                </Link>
                <div className="card-body">
                <Link to={`/${items.aisle}/${items.name}`}>
                <h2 className="card-title" style={{textAlign:"center"}}>{items.name}</h2>
                </Link>
                {items.discount !== 1 ? 
                <div>
                <p className="card-text" style={{textAlign:"center",textDecorationLine:"line-through"}}>${items.price}</p>
                <p className="card-text" style={{textAlign:"center",color:"red",fontStyle:"italic"}}>On Sale!! ${items.price * items.discount}</p>
                </div>
                :
                <p className="card-text" style={{textAlign:"center"}}>${items.price * items.discount}</p>
                }
                </div>
                <button onClick={()=>this.handleAddtoCart(items)} className="btn btn-primary" style={{position:"relative",bottom:"0px"}} >Add to cart <i class="fas fa-cart-plus"></i></button>
            </div>
        </div>
        )
        }  
        </h1>
       </div> : <div>
           This is nothing page
       </div>
   );
}
}

export default Aisle;