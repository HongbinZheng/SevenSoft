import React, {Component} from 'react';

class CartItem extends Component {
    deleteItem(id) {
        this.props.onDelete(id);
    }
    render() {
        return (
            <li className="list-group-item CartItem">
                <h3 className="card-title text-left"><strong>{this.props.item.name}<button type="button" className="btn btn-secondary float-right" onClick={this.deleteItem.bind(this, this.props.item.id)}>X</button></strong></h3>

                <h5 className="card-text text-left">Qty: {this.props.item.quantity}</h5>
                <h4 className="card-text text-right">${this.props.item.price}</h4>
            </li>
        )
    }
}

export default CartItem;