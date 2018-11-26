import React, { Component } from 'react';

class NotFound extends Component {
    render() {
        return (
            <div>
        <div className="row" style={{marginLeft:'25%', marginTop:'10%'}}>
            <div className="col" style={{maxWidth:'200px'}}>
                <img className="float-right" style={{width:'240%'}} src="/images/home/404.png" alt="No search results"></img>
            </div>
            <div className="col">
                
                <h1 style={{fontSize:50, marginTop:'7%'}}>Hmmm... Where am I ??!</h1>
                <h1 style={{fontSize:30}}>
                I think they call this the 404 page.
            </h1>
            </div>
            
            </div>
        </div>
        );
    }
}

export default NotFound;