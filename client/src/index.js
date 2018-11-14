import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {StripeProvider} from "react-stripe-elements";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './components/navbar/navbar.css'
import './firebase'

import Routes from './route'

const App = () =>{
    return (
    <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    </StripeProvider>
    )


}

ReactDOM.render(<App />, document.getElementById('root'));



