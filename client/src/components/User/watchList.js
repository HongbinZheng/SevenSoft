import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import Authserver from '../authserver';


class WatchList extends Component {
    constructor(){
        super()
        this.state ={
            item:[],
            onSale:[],
            notOnSale:[]
        }
        this.Auth = new Authserver()
    }

    componentWillMount(){
        if (this.Auth.loggedIn()) {
            var username = this.Auth.getUserName()
           axios.get(`/api/getAllWatchList?username=${username}`)
                .then(res=>{
                    console.log(res.data);
                    const items = Object.values(res.data);
                    const onSaleItem = [];
                    const notOnSaleItem = [];
                    this.setState({item:res.data})
                    console.log(this.state.item)
                    items.forEach(item=>{
                        item.discount < 1 ? 
                        onSaleItem.push(item) :
                        notOnSaleItem.push(item)
                    })
                    this.setState({onSale:onSaleItem,notOnSale:notOnSaleItem})
                })
        }
    }


    render() {
        return (
        <div className = "container-fluid" style={{minHeight:window.innerHeight-245}}>
        {this.state.item.length > 0 ?
        <div>
        <div className="row">
       <h1>On Sales Item</h1>
        {this.state.onSale.length > 0 ?
        <div className="w-100" style={{marginTop:20}}>
         {this.state.onSale.map(items =>{
         return(
            <div>
            <div key={items.itemNo} className='rounded float-left' style={{margin:'10px',border:'1px solid #C2C2C2'}}>
                <div className='card' style={{width:'20rem', height:'28rem'}} >
                    <Link to={`/${items.aisle}/${items.name}`}>
                    <img className='card-img-top' style={{width:'318px',height:'212.28px'}} src={`/images/aisle/${items.name}.png`} alt='Card cap'></img>
                    </Link>
                    <div className='card-body'>
                    <Link to={`/${items.aisle}/${items.name}`}>
                    <h2 className='card-title' style={{textAlign:'center', height: '50px', color:'#708090', marginTop:'20px'}}>{items.name}</h2>
                    </Link>
                    </div>
                    
                    {items.discount !== 1 ?
                    <div style = {{position: 'relative', textAlign:'center', marginBottom:'23px'}}>
                    <p className='card-text' style={{textAlign:'center',textDecorationLine:'line-through', fontSize: 25, color:'grey', display:'inline'}}>${items.price}</p>
                    <p className='card-text' style={{textAlign:'center',color:'red',fontStyle:'bold', display:'inline', fontSize: 30}}>${items.price * items.discount}</p>
                    </div>
                    :
                    <div style={{marginBottom:'24px'}}>
                    <p className='card-text' style={{textAlign:'center', fontSize: 30, fontStyle:'bold'}}>${items.price * items.discount}</p>
                    </div>
                    }
                    
                    <button onClick={()=>this.handleAddtoCart(items)} className='btn btn-info' style={{position:'relative', marginBottom:'0px'}} >Add to cart  <i className="fas fa-cart-plus"></i></button>
                </div>
            </div> 
            </div>)})}
            </div>
        : 
        <div className="w-100" style={{marginTop:20}}>
            Sorry, nothing in your list is on sale.
        </div> }
        </div>
        <div className="row">
        <h1>Rest Of your WatchList</h1>
        {this.state.notOnSale.length === 0 && this.state.onSale.length > 0 ? 
        <div className="w-100" style={{marginTop:20}}>
           <h1>Congrats, everything in you list is on sales!!!!</h1>
        </div> 
        :
         <div className="w-100" style={{marginTop:20}}>
             {this.state.notOnSale.map(items =>{
            return(
            <div key={items.itemNo} className='rounded float-left' style={{margin:'10px',border:'1px solid #C2C2C2'}}>
                <div className='card' style={{width:'20rem', height:'28rem'}} >
                    <Link to={`/${items.aisle}/${items.name}`}>
                    <img className='card-img-top' style={{width:'318px',height:'212.28px'}} src={`/images/aisle/${items.name}.png`} alt='Card cap'></img>
                    </Link>
                    <div className='card-body'>
                    <Link to={`/${items.aisle}/${items.name}`}>
                    <h2 className='card-title' style={{textAlign:'center', height: '50px', color:'#708090', marginTop:'20px'}}>{items.name}</h2>
                    </Link>
                    </div>
                    
                    {items.discount !== 1 ?
                    <div style = {{position: 'relative', textAlign:'center', marginBottom:'23px'}}>
                    <p className='card-text' style={{textAlign:'center',textDecorationLine:'line-through', fontSize: 25, color:'grey', display:'inline'}}>${items.price}</p>
                    <p className='card-text' style={{textAlign:'center',color:'red',fontStyle:'bold', display:'inline', fontSize: 30}}>${items.price * items.discount}</p>
                    </div>
                    :
                    <div style={{marginBottom:'24px'}}>
                    <p className='card-text' style={{textAlign:'center', fontSize: 30, fontStyle:'bold'}}>${items.price * items.discount}</p>
                    </div>
                    }
                    
                    <button onClick={()=>this.handleAddtoCart(items)} className='btn btn-info' style={{position:'relative', marginBottom:'0px'}} >Add to cart  <i className="fas fa-cart-plus"></i></button>
                </div>
            </div> 
             )})}
         </div>
        }
        </div> 
        </div>: 
        <div>
        <h1>You nerver add something in your watchlist!</h1>
        </div>}
       </div>
        );
            
    }
}

export default WatchList;