import React, { Component } from 'react';

class search extends Component {
    state = {
        query:'',
    }

    handleInputChange = () => {
        this.setState({ query: this.search.value})
    }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default search;