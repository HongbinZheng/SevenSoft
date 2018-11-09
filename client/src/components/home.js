import React, { Component } from 'react';
import Authserver from './authserver';

class Home extends Component {
    constructor(){
        super()
        this.state={
            isLogged:false
        }
        this.Auth = new Authserver()
    }

    componentWillMount(){
        if(this.Auth.loggedIn()){
            this.setState({isLogged: true})
            console.log(this.Auth.getUserName())
        }
    }

   

    render() {
        return (
            <div style = {{marginTop: "30px", marginLeft: "50px", marginRight:"50px"}}>
                <div id="carouselExampleIndicators" className="carousel slide w-100" style={{maxHeight:'400px'}} data-ride="carousel">
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
                <h1>This is order history</h1><br/>
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/>  <h1>This is watch lits</h1><br/> 
                <h1>This is watch lits</h1><br/>  
                </div>: null}
               
            </div>
        );
    }
}

export default Home;
