import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactStars from 'react-stars';

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
//style={{background:"#E2D2D2"}},,background:"#D1B9B9",background:"#E2D2D2"

render() {
   console.log(this.state.item);
   return (
       this.state  ? 
       <div style={{minHeight:window.innerHeight-245}}>
        <h1>
        {this.state.item.map(items => 
        
        <div key={items.itemNo} className="rounded float-left" style={{margin:"40px",border:"1px solid #C2C2C2"}}>
            <div className="card" style={{width:"20rem"}} >
                <Link to={`/${items.aisle}/${items.name}`}>
                <img className="card-img-top" style={{width:"75%",height:"75%",left:"50px"}} src={`/images/aisle/${items.name}.png`} alt="Card image cap"></img>
                </Link>
                <div className="card-body">
                <Link to={`/${items.aisle}/${items.name}`}>
                <h2 className="card-title" style={{textAlign:"center"}}>{items.name}</h2>
                </Link>
                {items.discount !== 1 ? 
                <div>
                <p className="card-text" style={{textAlign:"center",textDecorationLine:"line-through"}}>{items.price}</p>
                <p className="card-text" style={{textAlign:"center",color:"red",fontStyle:"italic"}}>On Sale!! {items.price * items.discount}</p>
                </div>
                :
                <p className="card-text" style={{textAlign:"center"}}>{items.price * items.discount}</p>
                }
                <h5 className="card-text" >
                <ReactStars
                    count={5}
                    value={items.avgstars}
                    size={24}
                    edit={false}
                    color2={'#ffd700'} />
                </h5>
                <a href="#" className="btn btn-primary" >Add to cart</a>
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