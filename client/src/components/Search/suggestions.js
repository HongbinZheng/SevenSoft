import React from "react";

const Suggestions = props => {
    const options = props.suggests.map(r => <li key={r.itemNo}>{r.name}</li>);

    return <ul>{options}</ul>;
};

export default Suggestions;
