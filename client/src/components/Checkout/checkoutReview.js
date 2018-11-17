import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'

import {firebaseDB} from '../../firebase';
import Authserver from'../authserver'
import jwt from'jsonwebtoken';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const TAX_RATE = 0.09;

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }


class CheckoutReview extends Component {
    constructor(props) {
        super(props)
        this.state={
            redirect:false,
            promo:false,
            promocode:""
        }
        if(localStorage.getItem('cart') != null) {
            var cartString = localStorage.getItem('cart')
            var cart = JSON.parse(cartString)
            this.state ={cartItems: this.getItemsFromCart(cart), totalPrice: 0,qty:0,redirect:false,promo:false}
          }
          this.getTotalPrice(this.state.cartItems);
          this.Auth = new Authserver();
          this.handleOnChange=this.handleOnChange.bind(this)
          this.handleOnClick=this.handleOnClick.bind(this)
    }

    getItemsFromCart = (cart) => {
        var cartItems = []
        for(var itemID in cart) {
          cartItems.push(cart[itemID])
        }
        return cartItems
      }

      handleCheckOut(items){
        // if(this.Auth.loggedIn()){
        //     var SERECT = "superserect"
        //     const token = localStorage.getItem('id_token')
        //     var decoded = jwt.verify(token, SERECT);
        //     items.forEach(item=>{item.myRate = 0});
        //     console.log(items);
        //     firebaseDB.ref(`/orders/${decoded}`).push(items);
        // }
       // this.props.history.push('/Checkout')
       this.setState({redirect:true})
      }

      handleOnClick(){
          if(this.state.promocode === "SAVE30"){
              this.setState({promo:true,error:null})
        }
            else{
                this.setState({error:"Wrong Promo Code"})
            }
      }

      handleOnChange(e){
        this.setState({promocode:e.target.value})
      }

      getTotalPrice(items) {
        var tPrice = 0
        items.forEach((item) => {
            tPrice += item.price * item.discount * item.quantityInCart
        })
        return tPrice
    }


    render() {
        const { redirect, carItems } = this.state
        const { classes } = this.props;

        if (redirect){
            var obj = {...this.state.cartItems}
        return (<Redirect to={{
            pathname: '/checkout',
            state: { referrer: obj }
        }} />)
    }
    var invoiceSubtotal = this.getTotalPrice(this.state.cartItems)
    if(this.state.promo){
        invoiceSubtotal = invoiceSubtotal * 0.7
    }
    var invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;
    return ( 
        <div style={{textAlign:"center"}}>
            <div className="container" style={{width:"1000px",textAlign:"center",marginTop:"100px"}}>    
                <div style={{textAlign:"center"}}>            
                <Paper className={classes.root} style={{border:"2px solid #c2c2c2",borderRadius:"25px"}}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Desc</TableCell>
                                <TableCell numeric>Qty.</TableCell>
                                <TableCell numeric>@</TableCell>
                                <TableCell numeric>Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.cartItems.map((item, index) => {
                                return (
                                        <TableRow key={item.itemid}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell numeric>{item.quantityInCart}</TableCell>
                                            <TableCell numeric>{ccyFormat(item.price * item.discount)}</TableCell>
                                            <TableCell numeric>{ccyFormat((item.price * item.discount)*item.quantityInCart)}</TableCell>
                                        </TableRow>
                                )
                            })}
                                <TableRow>
                                    <TableCell ><input placeholder="Promo Code" value={this.state.promocode} onChange={this.handleOnChange} /> <button className="btn btn-info" onClick={this.handleOnClick}>Submit</button> </TableCell>
                                    {this.state.error ? <TableCell>
                                        <div class="alert alert-danger" role="alert">
                                           {this.state.error}
                                        </div>
                                    </TableCell> : null}
                                    {this.state.promo ?
                                    <div> 
                                    <TableCell>Promo Code: </TableCell>
                                    <TableCell>SAVE30</TableCell></div>
                                     : null}
                                </TableRow>
                            <TableRow>
                                <TableCell rowSpan={3} />
                                <TableCell colSpan={2}>Subtotal</TableCell>
                                <TableCell numeric>{ccyFormat(invoiceSubtotal)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Tax</TableCell>
                                <TableCell numeric>{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                                <TableCell numeric>{ccyFormat(invoiceTaxes)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2}>Total</TableCell>
                                <TableCell numeric>{ccyFormat(invoiceTotal)}</TableCell>
                            </TableRow>
                            <TableRow>
                            <TableCell></TableCell><TableCell></TableCell>
                            <TableCell>
                            <button className="btn btn-info" onClick={()=>this.handleCheckOut(this.state.cartItems)} style={{marginTop:5}}> Continue to Checkout</button>
                            </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
                </div>
                </div>
                </div>
        )   
    }
}

CheckoutReview.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(CheckoutReview);