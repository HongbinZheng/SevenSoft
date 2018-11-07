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

    ratingChanged = (item,key,index,newRating) => {
       console.log(item)
       console.log(key)
       console.log(index)
       console.log(newRating)
       axios.get(`/api/getOneItem?item=${item.name}`)
           .then(res =>{
               console.log(res.data[0])
               this.setState({ratingNum:res.data[0].nrates, avgRating:res.data[0].avgstars})

       console.log(this.state.ratingNum)
       console.log(this.state.avgRating)
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
                <div className="container" style={{display:"flex", marginTop: "50px", marginBottom: "300px", width: "750px", textAlign: "center" }}>
                {/* get each orders. */}
                    {Object.keys(this.state.orders).map((key) => {
                        return (
                            <div key={key} className="container" style={{border: "2px solid #000000", width: "700px", height: "150px", alignItems: 'center', backgroundColor: "white" }}>
                               {/** get each items orders  */}
                                {this.state.orders[key].map((item,index) => {
                                    return (
                                        <div className="row" style={{ marginTop: "30px",textAlign:"center" }} key={item.itemid}>
                                           <div className="col">
                                                <img className="card-img-top" style={{ width: '40%', height: '40%' }} src={`/images/aisle/${item.name}.png`} alt='Card cap' />
                                                <h5>{item.name}</h5>
                                                {/** if user already rated the item, it will display the rating user give, if not, they can rate the item the purchase */}
                                                {item.myRate === 0 ?
                                                <div>
                                                <h5><ReactStars
                                                    count={5}
                                                    value={item.myRate}
                                                    size={24}
                                                    onChange={this.ratingChanged.bind(this,item,key,index)}
                                                    edit={true}/></h5>
                                                </div>
                                                : 
                                                <div>
                                                <h5><ReactStars
                                                    count={5}
                                                    value={item.myRate}
                                                    size={24}
                                                    edit={false}
                                                    color2={'#ffd700'} /></h5>
                                                </div>
                                            }
                                            </div>
                                            <div className="col">
                                                <h3>
                                                    {item.quantityInCart}</h3>
                                            </div>
                                            <div className="col">
                                                <h3 className="card-text">${(item.price * item.discount * item.quantityInCart).toFixed(2)}</h3>
                                            </div>
                                            <div className="col">
                                                <button onClick={()=>this.handleAddToCart(item)}>Add To Cart</button>
                                            </div>
                                        </div>
                                     )
                                })}
                            </div>
            )
        })}
                </div>
            </div>: <div>no history orders</div>
        )
    }
}

export default OrdersPage;