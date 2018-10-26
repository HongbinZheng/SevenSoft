import React, { Component } from 'react';
import axios from 'axios';

class Item extends Component {
    state ={}
    componentWillMount(){
        let item =this.props.match.params.item;
        console.log(this.props.match.params.aisle)
        axios.get(`/api/getOneItem?item=${item}`)
            .then(res=>{
                console.log(res.data[0]);
                this.setState(res.data[0]);
            })
    }

    render() {
        console.log(this.props)
        console.log(this.state)
        return (
            <div>
                <h1>{this.state.name}</h1>
                {this.state.price * this.state.discount}
            </div>
        );
    }
}

export default Item;