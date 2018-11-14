import React from "react";

const Suggestions = props => {
    
    const options = props.suggests.map(r => <li style={{border:'1px solid #C2C2C2'}} key={r.itemNo}>{r.name}</li>);
    return(
    <div style={{background:"#ffffff",border:'1px solid #C2C2C2'}}>
    {options}
    </div>
    ) ;
};

export default Suggestions;
