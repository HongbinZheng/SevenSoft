import React, { Component } from 'react';
import axios from 'axios';
class Meats extends Component {
    state = { item:[]
    };

componentWillMount(){
   let items = 'meats';
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
        <h1>   This is Meats page
        {this.state.item.map(stuff =><li key={stuff.itemNo}>{stuff.name} || Price: {stuff.price} || Rating {stuff.avgstars}</li>)}  
        </h1>
       </div> : <div>
           This is nothing page
       </div>
   );
}
}

export default Meats;