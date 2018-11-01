import React, { Component } from 'react';
import axios from 'axios';
import ReactStars from 'react-stars';

class Item extends Component {
    state ={
        quantityInCart:0
    }
    componentWillMount(){
        let item =this.props.match.params.item;
        console.log(this.props.match.params.aisle)
        axios.get(`/api/getOneItem?item=${item}`)
            .then(res=>{
                console.log(res.data[0]);
                this.setState(res.data[0]);
            })
    }
    handleAddtoCart(stuff){
        console.log(stuff)
        var quantityInCart = this.state.quantityInCart
        var item = {
           itemid: stuff.itemNo,
           name: stuff.name,
           price: stuff.price,
           discount: stuff.discount,
        }
        console.log(item)
        if(localStorage.getItem('cart') !== null) {
          var cartString = localStorage.getItem('cart')
          console.log(cartString);
          var cart = JSON.parse(cartString)
          if(cart[stuff.itemNo]){
            item.quantityInCart = cart[stuff.itemNo].quantityInCart +1
        }else{
           // quantityInCart += 1
            item.quantityInCart = 1;
        }    
          cart[stuff.itemNo] = item
          localStorage.setItem('cart', JSON.stringify(cart))
          this.setState({quantityInCart: quantityInCart})
           } else {
          var cart = {}
          item.quantityInCart = ++quantityInCart
          cart[stuff.itemNo] = item
          localStorage.setItem('cart', JSON.stringify(cart))
          this.setState({quantityInCart: quantityInCart})
      }
  }

    render() {
        console.log(this.props)
        console.log(this.state)
        return (
        <div className="container" style={{minHeight:window.innerHeight-245}}>
            <div className="row">
            <div className="col-sm">
              <img style={{ width:"75%",height:"75%",left:"50px",top:"55%"}} src={`/images/aisle/${this.state.name}.png`} alt="Card cap"></img>
              </div>
              <div className="col align-self-end" style={{top:"100px"}}>
                <h2>{this.state.name}</h2>
                <h4>Aisle:{this.state.aisle}</h4>
                <h5><ReactStars
                    count={5}
                    value={this.state.avgstars}
                    size={24}
                    edit={false}
                    color2={'#ffd700'} /></h5>
                <br/>
                
                {this.state.discount !== 1 ? 
                <div>
                <h2 style={{textDecorationLine:"line-through"}}>${this.state.price}</h2>
                <h2 style={{color:"red",fontStyle:"italic"}}>On Sale!! ${this.state.price * this.state.discount}</h2>
                <h6>per {this.state.per}</h6>
                </div>
                :
                <div>
                <h2>{this.state.price * this.state.discount}</h2>
                <h6>per {this.state.per}</h6>
                </div>
                }


                <h5>description:{this.state.description}</h5>
                <br/>
                <h3><button type="button" onClick={()=>this.handleAddtoCart(this.state)} className="btn btn-primary"> Add to Cart</button>
                <button type="button" className="btn btn-primary" style={{marginLeft:"20px"}}>Add to Watch List</button>
                </h3>
                
              </div>
              <div className="col align-self-end">
              </div>
            </div>
          </div>
        );
    }
}

export default Item;