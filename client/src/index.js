import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './components/navbar/navbar.css'

import Routes from './route'

const App = () =>{
    return (
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    )


}

ReactDOM.render(<App />, document.getElementById('root'));



