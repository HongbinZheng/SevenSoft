import React, { Component } from 'react';
import axios from 'axios';
class Aisle extends Component {
    state = { item:[]
    };

componentWillMount(){
   let items = this.props.match.params.aisle;
   console.log(this.props.match.params.aisle)
   axios.get(`/api/getItems?aisle=${items}`)
       .then(response => {
           console.log(response.data);
           const item = response.data
           this.setState({ item })
       })
}


render() {
   console.log(this.state.item);
   return (
       this.state  ? 
       <div>
        <h1>
        {this.state.item.map(items => 
        items.discount !== 1 ? <div key={items.itemNo}>
        <li> {items.name} || Price: {items.price * items.discount} IT"S ON SALE NOW || Rating {items.avgstars}
        </li> </div> : <div key={items.itemNo}> <li>
        {items.name} || Price: {items.price} || Rating {items.avgstars}
        </li> </div>
        )
        }  
        </h1>
       </div> : <div>
           This is nothing page
       </div>
   );
}
}

export default Aisle;