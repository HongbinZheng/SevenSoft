import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import User from './User';

class App extends Component {
    render(){
        return (
            <div>
                <User/>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

