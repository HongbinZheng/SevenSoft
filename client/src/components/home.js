import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Authserver from './authserver';
import axios from 'axios';

class Home extends Component {
    constructor(){
        super()
        this.state={
            isLogged:false,
            order:[],
            watchList:[],
            onSale:[]
        }
        this.Auth = new Authserver()
    }

    componentDidMount(){
        if(this.Auth.loggedIn()){
            this.setState({isLogged: true})
            var username = this.Auth.getUserName()
            axios.get(`/api/getLastOrder?username=${username}`)
                .then(res=>{
                    if(res.data.length > 0){
                    const orders = Object.values(res.data[0]);
                    this.setState({order:orders})
                    }
                })
                axios.get(`/api/getAllWatchList?username=${username}`)
                .then(res=>{
                    if(res.data.length > 0){
                    console.log(res.data);
                    const items = Object.values(res.data);
                    this.setState({watchList:res.data})
                    console.log(this.state.watchList)
                    const onSaleItem = [];
                    items.forEach(item=>{
                        if(item.discount < 1){
                            onSaleItem.push(item)
                        }
                    })
                    this.setState({onSale:onSaleItem})
                }
                })
        }
    }

   

    render() {
        console.log(this.props);
        return (
            <div style = {{marginTop: "5%", marginLeft: "50px", marginRight:"50px", minHeight:window.innerHeight-245, width:'90%', textAlign:'center'}}>
                <div id="carouselExampleIndicators" className="carousel slide w-100 h-50" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100" src="/images/home/Ad1.png" alt="First Ads"></img>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="/images/home/Ad2.png" alt="Second Ads"></img>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="/images/home/Ad3.png" alt="Third Ads"></img>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="/images/home/Ad4.png" alt="Fourth Ads"></img>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>

            
                {this.state.isLogged ? 
                <div>
                    <div style={{marginTop:"30px"}}>
                <h1 style={{fontFamily:'Roboto'}}>Most Recent Order</h1><br/>
                {this.state.order.length > 0 ?
                     <div className="col-lg-12 col-md-12 col-sm-12 d-flex p-2" style={{height:"240px", overflowX:"scroll",border:'1px solid #C2C2C2', backgroundColor:"#D5E6E8",borderRadius:"25px"}}>
                       {this.state.order.map((items) =>{
                           return(
                           <div key={items.itemid}>
                           <Link to={`/aisle/${items.aisle}/${items.name}`}>
                               <div className="card" style={{width:"200px",height:'180px',margin:"10px",border:'1px solid #C2C2C2',textAlign:'center' }}>
                               <div>
                                <img className="card-img-top" src={`/images/aisle/${items.name}.png`} style={{textAlign:'center',width:"197px",height:"100px"}} alt="Card cap"/>
                                <div className="card-body">
                                <p className="card-title" style={{color:'#708090'}}><b>{items.name}</b></p>
                                </div>
                                </div>
                           </div>
                           </Link>
                           </div>)}
                       )}
                     </div>
                      :
                      <div>
                          <h3 style={{fontFamily:'Roboto'}}>Never bought anything yet</h3>
                      </div>
                      }
                    </div>
                    <div style={{marginTop:'30px'}}>
                <h1 style={{fontFamily:'Roboto'}}>On Sales Items In You Watch List</h1><br/>
                {this.state.watchList.length > 0 ?
                    this.state.onSale.length > 0 ? 
                    <div>
                    <div className="col-lg-12 col-md-12 col-sm-12 d-flex p-2" style={{maxHeight:"240px", overflowX:"scroll",border:'1px solid #C2C2C2', backgroundColor:"#D5E6E8",marginBottom:30}}>
                        {this.state.onSale.map((items)=>{
                            return(
                                <div key={items.itemid}>
                                <Link to={`/aisle/${items.aisle}/${items.name}`}>
                                    <div className="card" style={{width:"200px",height:'180px',margin:"10px",border:'1px solid #C2C2C2',textAlign:'center' }}>
                                    <div>
                                     <img className="card-img-top" src={`/images/aisle/${items.name}.png`} style={{textAlign:'center',width:"197px",height:"100px"}} alt="Card cap"/>
                                     <div className="card-body">
                                     <p className="card-title" style={{textAlign:'center',color:'#708090'}}><b>{items.name}</b></p>
                                     </div>
                                     </div>
                                </div>
                                </Link>
                                </div>)
                        })
                        }
                    </div>
                    </div>
                    : 
                    <div>
                        <h2 style={{fontFamily:'Roboto'}}>Nothing in your watch list in on sales</h2>
                    </div>
                :
                <div>
                    <h3 style={{fontFamily:'Roboto'}}>Nothing in your Watch List</h3>
                </div>
                    }
                </div>
                </div>: null}
               
            </div>
        );
    }
}

export default Home;
