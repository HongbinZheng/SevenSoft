import React, { Component } from 'react';

class ConfirmationPage extends Component {

    render() {
      //windows.location.reload(); reload cart
        return (
            <div className="row" style={{marginLeft:'25%', marginTop:'8%'}}>
            <div className="col" style={{maxWidth:'200px'}}>
                <img className="float-right" style={{width:'100%'}} src="/images/home/Order.png" alt="order placed"></img>
            </div>
            <div className="col">
                <h1></h1>
                <h1 style={{fontSize:60}}>Thank you!</h1>
                <h1 style={{fontSize:30}}>
                Your order has been placed
            </h1>
                <h1 style={{fontSize:30}}> Order Summary will be email to you shortly</h1>
            </div>
            
            </div>



        );
    }
}

export default ConfirmationPage;
