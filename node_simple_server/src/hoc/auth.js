import React, { Component } from 'react';
import Authserver from '../components/authserver'

export default function(ComposedComponent,reload){
class Auth extends Component {
    constructor(){
        super();
        this.state ={
            loading:true
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({loading:false})
        if(!Authserver.loggedIn()){
            if(reload){
            this.props.history.replace('/User');
        }else{
            if(reload === false){
                this.props.history.replace('/profile')
            }
        }
        }
    }

    render() {
        if(this.state.loading){
            return <div className="loader">Loading...</div>
        }
        return <ComposedComponent {...this.props} user={this.props.user} />
}
}}

//export default Auth;