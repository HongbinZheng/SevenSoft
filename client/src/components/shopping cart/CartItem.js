import React from 'react';
import CartItemList from './Cart_Item_list'

const CartItem =(props)=> {
    const items = props.items.map((item) => {
        return (
            <CartItemList item={item} key={item.itemid}
            handleRemove={props.handleRemove}
            handleIncrease={props.handleIncrease}
            handleDecrease={props.handleDecrease}
            />
            
        )
      });
        if(props.items.length === 0) {
            return(
            <div>
              <div style={{textAlign: 'center', marginTop: '25%'}}>
                <h3>No Items</h3>
              </div>
            </div>
            )
          } else {
            return(
            <div style={{height:"auto", maxHeight:400,overflowY:"scroll"}}> 
              {items}
            </div>
            )
          }
        
}

export default CartItem;