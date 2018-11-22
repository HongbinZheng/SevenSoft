import React from "react";
import { Link } from 'react-router-dom'

const Suggestions = props => {
    
    const options = props.suggests.map(r => <div><Link to={`/aisle/${r.aisle}/${r.name}`} ><li style={{border:'1px solid #C2C2C2'}} key={r.itemNo}>{r.name}</li></Link></div>);
    return(
    <div style={{textAlign:'center', width:'500px', fontWeight:'bold', background:"rgba(255, 255, 255, 0.5)", border:'1px solid #C2C2C2'}}>
    {options}
    </div>
    ) ;
};

export default Suggestions;
