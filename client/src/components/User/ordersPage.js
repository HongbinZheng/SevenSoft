import React, { Component } from 'react';
import {firebaseDB} from '../../firebase';
import Authserver from'../authserver'
import jwt from'jsonwebtoken'
import ReactStars from 'react-stars';
import axios from 'axios'

class OrdersPage extends Component {
    constructor(props) {
        super(props)
        this.state ={
            username:'',
            orders:{},
            quantityInCart:0,
            ratingNum:'',
            avgRating:''
        }
        this.Auth = new Authserver();
    }

    componentWillMount(){
        if(this.Auth.loggedIn()){
            var SERECT = "superserect"
            const token = localStorage.getItem('id_token')
            var decoded = jwt.verify(token, SERECT);
            firebaseDB.ref(`/orders/${decoded}`).once('value')
                        .then((snapshot)=>{
                            this.setState({orders:snapshot.val(),username:decoded})
                        })
        }else{
            this.props.history.push('/')
        }
    }

    handleAddToCart(stuff){
        var quantityInCart = this.state.quantityInCart
        var item = {
            itemid: stuff.itemid,
            name: stuff.name,
            price: stuff.price,
            discount: stuff.discount,
            avgStars:stuff.avgstars,
            nrates:stuff.nrates
         }
         if(localStorage.getItem('cart') !== null) {
           var cartString = localStorage.getItem('cart')
           var cart = JSON.parse(cartString)
           if(cart[stuff.itemid]){
             item.quantityInCart = cart[stuff.itemid].quantityInCart +1
         }else{
            // quantityInCart += 1
             item.quantityInCart = 1;
         }    
           cart[stuff.itemid] = item
           localStorage.setItem('cart', JSON.stringify(cart))
           this.setState({quantityInCart: quantityInCart})
            } else {
           var cart = {}
           item.quantityInCart = ++quantityInCart
           cart[stuff.itemid] = item
           localStorage.setItem('cart', JSON.stringify(cart))
           this.setState({quantityInCart: quantityInCart})
       }
    }

    ratingChanged = (item,key,index,newRating) => {
       axios.get(`/api/getOneItem?item=${item.name}`)
           .then(res =>{
               this.setState({ratingNum:res.data[0].nrates, avgRating:res.data[0].avgstars})

       let totalRate = this.state.ratingNum * this.state.avgRating;
       item.myRate = newRating;
       let user = this.state.username
       totalRate = totalRate + newRating
       let ratingNumber = this.state.ratingNum + 1;
       let itemName = item.name;
       let newAvgRates = totalRate / ratingNumber;
       firebaseDB.ref(`/orders/${user}/${key}/${index}`).update({myRate:newRating})

       axios.post('/api/updateRating',{ratingNumber,itemName,newAvgRates})
       .then(res=>console.log(res))
       window.location.reload()
      })

     }


    render() {        
        return (
            this.state.orders ?
            <div>
                <div className="container" style={{marginTop: "5%", marginBottom: "5%", width: "100%", textAlign: "center", fontFamily:'Lucida Handwriting'}}>
                {/* get each orders. */}
                    {Object.keys(this.state.orders).map((key) => {
                        return (
                            <div key={key} className="container-fluid" style={{marginBottom:20, border: "2px solid #c2c2c2",borderRadius:"25px", width: "100%", height: "auto", alignItems: 'center',backgroundColor: "white" }}>
                               {/** get each items orders  */}
                               <h3 style={{marginTop:'2%'}}>Order Number: {key} </h3>
                                {this.state.orders[key].map((item,index) => {
                                    return (
                                        <div className="row" style={{ margin: "30px",textAlign:"center",backgroundColor: "white",height:'180px',borderBottom:"1px solid #c2c2c2" }} key={item.itemid}>
                                           <div className="col" style={{margin:20, width:"100px"}}>
                                                <img className="card-img-top" style={{ width: '90%', height: '80%' }} src={`/images/aisle/${item.name}.png`} alt='Card cap' />
                                                <h6 style={{marginTop:'6%', fontSize:20}}>{item.name}</h6>
                                                
                                            </div>
                                            <div className="col" style={{width:'500px', marginTop:'50px'}}>
                                                <h3>Qty: 
                                                    {item.quantityInCart}</h3>
                                                    {/** if user already rated the item, it will display the rating user give, if not, they can rate the item the purchase */}
                                                {item.myRate === 0 ?
                                                <div>
                                                <h5><ReactStars
                                                    count={5}
                                                    value={item.myRate}
                                                    size={38}
                                                    onChange={this.ratingChanged.bind(this,item,key,index)}
                                                    edit={true}/></h5>
                                                </div>
                                                : 
                                                <div>
                                                <h5><ReactStars
                                                    count={5}
                                                    value={item.myRate}
                                                    size={38}
                                                    edit={false}
                                                    color2={'#ffd700'} /></h5>
                                                </div>
                                            }
                                            </div>
                                            <div className="col" style={{marginTop:'50px'}}>
                                                <h3 className="card-text">${(item.price * item.discount * item.quantityInCart).toFixed(2)}</h3>
                                            </div>
                                            <div className="col" style={{marginTop:'50px'}}>
                                                <button className='btn btn-info' onClick={()=>this.handleAddToCart(item)}>Add To Cart</button>
                                            </div>
                                        </div>
                                     )
                                })}
                            </div>
            )
        })}
                </div>
            </div>: <div className="row" style={{marginLeft:'18%', marginTop:'10%'}}>
            <div className="col" style={{maxWidth:'200px'}}>
                <img className="float-right" style={{width:'240%'}} src="/images/home/404.png" alt="No search results"></img>
            </div>
            <div className="col">
                
                <h1 style={{fontSize:60, marginTop:'7%'}}>What's the 1st order gonna be...</h1>
                <h1 style={{fontSize:30}}>
                Check out our great products and make your first order.
            </h1>
            </div>
            
            </div>
        )
    }
}

export default OrdersPage;