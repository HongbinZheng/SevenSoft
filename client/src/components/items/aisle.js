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
       <div style={{minHeight:window.innerHeight-245}}>
        <h1>
        {this.state.item.map(items => 
        //items.discount !== 1 ?
        <div key={items.itemNo} style={{float:"left",margin:"40px",border:"1px solid red"}}>
            <div class="card" style={{width:"20rem"}} >
                <img class="card-img-top" style={{width:"100px",height:"150px",left:"50px"}} src={`/images/aisle/${items.name}.png`} alt="Card image cap"></img>
                <div class="card-body">
                <h2 class="card-title" style={{textAlign:"center",background:"#E2D2D2"}}>{items.name}</h2>
                <p class="card-text" style={{textAlign:"center",background:"#D1B9B9"}}>{items.price * items.discount}</p>
                <p class="card-text" style={{textAlign:"center"}}>Rating:{items.avgstars}</p>
                <a href="#" class="btn btn-primary" >Add to cart</a>
                </div>
            </div>
        </div>
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