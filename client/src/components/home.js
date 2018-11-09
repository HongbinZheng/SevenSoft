import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Authserver from './authserver';
import axios from 'axios';

class Home extends Component {
    constructor(){
        super()
        this.state={
            isLogged:false,
            order:[]
        }
        this.Auth = new Authserver()
    }

    componentDidMount(){
        if(this.Auth.loggedIn()){
            this.setState({isLogged: true})
            var username = this.Auth.getUserName()
            axios.get(`/api/getLastOrder?username=${username}`)
                .then(res=>{
                    const orders = Object.values(res.data[0]);
                    this.setState({order:orders})
                })
        }
    }

   

    render() {
        return (
            <div style = {{marginTop: "30px", marginLeft: "30px",minHeight:window.innerHeight-245}}>
                <div id="carouselExampleIndicators" className="carousel slide w-75 h-75" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
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
                <h1>Most Recent Order</h1><br/>
                {this.state.order ?
                     <div className="col-lg-12 col-md-12 col-sm-12 d-flex p-2" style={{maxHeight:"400px", overflowX:"scroll",border:'1px solid #C2C2C2', backgroundColor:"#D5E6E8"}}>
                       {this.state.order.map((items) =>{
                           return(
                           <div key={items.itemid}>
                           <Link to={`/${items.aisle}/${items.name}`}>
                               <div className="card" style={{width:"15rem",height:"auto",margin:"10px",border:'1px solid #C2C2C2' }}>
                                <img className="card-img-top" src={`/images/aisle/${items.name}.png`} style={{textAlign:'center',width:"100%",height:"100%"}} alt="Card cap"/>
                                <div className="card-body">
                                <p className="card-text" style={{textAlign:'center'}}>{items.name}</p>
                                </div>
                           </div>
                           </Link>
                           </div>)}
                       )}
                     </div>
                      :
                      <div>
                          <h3>Never bought anything yet</h3>
                      </div>
                      }
                    </div>
                <h1>This is watch lits</h1><br/>  
                </div>: null}
               
            </div>
        );
    }
}

export default Home;
