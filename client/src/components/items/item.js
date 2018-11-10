import React, { Component } from 'react';
import axios from 'axios';
import ReactStars from 'react-stars';
import Authserver from '../authserver';

class Item extends Component {
    constructor(){
        super()
        this.state ={
            item:{},
            username:'',
            quantityInCart:0,
            watchList:[],
            onWatchList:false,
            isLogged:false
        }
        this.Auth = new Authserver()
    }
    
    componentWillMount(){
        var item =this.props.match.params.item;
        console.log(this.props.match.params.aisle)
        axios.get(`/api/getOneItem?item=${item}`)
            .then(res=>{
                this.setState({item:res.data[0]});
                item = res.data[0];
            })
        if (this.Auth.loggedIn()) {
            this.setState({isLogged:true})
            var username = this.Auth.getUserName()
            console.log(item)
            this.setState({ username: username });
            axios.get(`/api/getWatchList?username=${username}&item=${item}`)
            .then(res=>{
                console.log(res.data)
                if(res.data.length > 0){
                    this.setState({onWatchList:true})
                }
            })
        }
    }


    handleAddtoCart(stuff){
        console.log(stuff)
        var quantityInCart = this.state.quantityInCart
        var item = {
           itemid: stuff.itemNo,
           name: stuff.name,
           price: stuff.price,
           discount: stuff.discount,
           avgStars:stuff.avgstars,
           nrates:stuff.nrates
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

  handleAddtoWatchLish(){
    if(this.state.isLogged){
    let username = this.state.username;
    let item = this.state.item
    axios.post(`/api/addToWatchList`,{username,item})
        .then(res=>{
            console.log(res.data)
            this.setState({onWatchList:true})
            })
        }
  }

    render() {
        console.log(this.state.item)
        return (
        <div className="container" style={{minHeight:window.innerHeight-245}}>
            <div className="row">
            <div className="col-sm">
              <img style={{width:"418px",height:"279.03px", marginTop:'100px'}} src={`/images/aisle/${this.state.item.name}.png`} alt="Card cap"></img>
              </div>
              <div className="col align-self-end" style={{position:'relative', top:"40px", marginLeft:'100px'}}>
                <h2 style = {{fontSize:55}}>{this.state.item.name}</h2>
                <p style = {{display:'inline', fontSize: 19}}>Aisle: </p>
                <p style = {{display:'inline', color: '#7FDBFF', fontSize: 19}}>{this.state.item.aisle}</p>
                <h5><ReactStars
                    count={5}
                    value={this.state.item.avgstars}
                    size={24}
                    edit={false}
                    color2={'#ffd700'} /></h5>
                <br/>
                <div style={{marginBottom:'10px'}}>
                {this.state.item.discount !== 1 ? 
                <div>
                <h2 style={{display:'inline',textDecorationLine:"line-through", fontSize:26, color:'grey'}}>${this.state.item.price} </h2>
           
                <h2 style={{display:'inline', color:"red",fontStyle:"italic"}}>  On Sale!!</h2>
            <div>
                <h2 style={{display:'inline', color:"red"}}> ${this.state.item.price * this.state.item.discount}</h2>
            
                <h6 style={{display:'inline'}}>  per {this.state.item.per}</h6>
                </div>
            </div>
                :
                <div>
                <h2 style={{display:'inline'}}>${this.state.item.price * this.state.item.discount}</h2>
                <h6 style={{display:'inline'}}>  per {this.state.item.per}</h6>
                </div>
                }
                </div>
                
                
                <h5>{this.state.item.description}</h5>
                <br/>
                <h3 style = {{width:'400px'}}><button type="button" onClick={()=>this.handleAddtoCart(this.state.item)} className="btn btn-info"> Add to Cart <i className="fas fa-cart-plus"></i></button>
                {this.state.onWatchList ? 
                <button type="button" className="btn btn-danger" style={{marginLeft:"20px"}}> <i className="fas fa-heart"></i> Added to Watch List</button>
                : 
                 <button type="button" className="btn btn-warning" style={{marginLeft:"20px"}} onClick={()=>this.handleAddtoWatchLish()}> <i className="far fa-heart"></i> Add to Watch List</button>
                }
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