import React from 'react';
import CartItem from './CartItem';

class Cart extends React.Component {
    deleteItem(id){
        this.props.onDelete(id);
    }

    render() {
        let cartItems;
        let total = 0;
        if(this.props.items){
            cartItems = this.props.items.map(item => {
               return (
                <CartItem onDelete={this.deleteItem.bind(this)} key={item.name} item={item} />
               );
            });
            for(let i = 0; i < this.props.items.length; i++) {
                let price = parseFloat(this.props.items[i].price);
                let qty = parseInt(this.props.items[i].quantity);

                total += price * qty;
            }
        }


        return(
            <div className="Cart card col-2 shadow rounded float-right" style={{position:"relative",border:"1px solid #000000"}}>
                    <h1 className="card-header text-center">Shopping Cart</h1>
                <ul className="list-group list-group-flush">
                { cartItems ? <div>{cartItems}<br/><br/><br/></div> : <div><h2 style={{color:"grey"}}>No items yet! Go get something<br/><br/><br/></h2></div>}
                    
                </ul>
                <h2 className="card-text text-left" >Total: <div className="text-right">${total.toFixed(2)}</div></h2>
            </div>

        )
    }
}

export default Cart;