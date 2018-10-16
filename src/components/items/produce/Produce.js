import React, { Component } from 'react';
import axios from 'axios'

class Produce extends Component {
    state = { item:[]
         };

    componentWillMount(){
        let items = 'produce';
        axios.get(`/api/getItems?aisle=${items}`)
            .then(response => {
                console.log(response.data);
                const item = response.data
                this.setState({ item })
            })
    }
    render() {
        console.log(this.state.formData);

        return (
            this.state  ? 
            <div>
             <h1>   This is produce page
             {this.state.item.map(items =><li key={items.itemNo}>{items.name} || Price: {items.price} || Rating {items.avgstars}</li>)}  
             </h1>
            </div> : <div>
                This is nothing page
            </div>
        );
    }
}

export default Produce;