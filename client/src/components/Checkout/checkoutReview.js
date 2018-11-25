import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import Authserver from '../authserver'

const TAX_RATE = 0.09;

const quantityInCarts = [
    {
        value: 0,
        label: '0',
      },
    {
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 3,
      label: '3',
    },
    {
        value: 4,
        label: '4',
      },
      {
        value: 5,
        label: '5',
      },
      {
        value: 6,
        label: '6',
      },
      {
        value: 7,
        label: '7',
      },
      {
        value: 8,
        label: '8',
      },
      {
        value: 9,
        label: '9',
      },
      {
        value: 10,
        label: '10',
      },
  ];

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

      handleCheckOut(){
          if(this.getTotalPrice(this.state.cartItems) === 0){
              this.props.history.push('/')
          }
       this.setState({redirect:true})
      }

      handleOnClick(){
        if(this.state.promocode !== "SAVE15" && this.state.promocode !== "XMAS18"){
              this.setState({error:"Wrong Promo Code"})
        }else if( this.state.promocode === "SAVE15" && this.getTotalPrice(this.state.cartItems) < 25){
            this.setState({error:"Not qualify for using this code"})
        }else{
                this.setState({promo:true,error:null})
            }
      }

      handleOnChange(e){
        this.setState({promocode:e.target.value})
      }

      handleChange = prop => event => {
        if(localStorage.getItem('cart') != null) {
            var cartString = localStorage.getItem('cart')
            var cart = JSON.parse(cartString)
            var itemID = prop.itemid;
            if(cart.hasOwnProperty(itemID)) {
                if(event.target.value === 0){
                    delete cart[itemID]
                }else{
                var item = cart[itemID]
                item.quantityInCart = event.target.value
                cart[itemID] = item
            }
            localStorage.setItem('cart', JSON.stringify(cart))
            this.setState({cartItems: this.getItemsFromCart(cart)})
            }
            }
      };


      getTotalPrice(items) {
        var tPrice = 0
        items.forEach((item) => {
            tPrice += item.price * item.discount * item.quantityInCart
        })
        return tPrice
    }


  handleCheckOut(items) {
    // if(this.Auth.loggedIn()){
    //     var SERECT = "superserect"
    //     const token = localStorage.getItem('id_token')
    //     var decoded = jwt.verify(token, SERECT);
    //     items.forEach(item=>{item.myRate = 0});
    //     console.log(items);
    //     firebaseDB.ref(`/orders/${decoded}`).push(items);
    // }
    // this.props.history.push('/Checkout')
    this.setState({ redirect: true });
  }

  getTotalPrice(items) {
    var tPrice = 0;
    items.forEach(item => {
      tPrice += item.price * item.discount * item.quantityInCart;
    });
    return tPrice;
  }

    render() {
        const { redirect, carItems } = this.state
        const { classes } = this.props;

    if (redirect) {
      var obj = { ...this.state.cartItems };
      return (
        <Redirect
          to={{
            pathname: "/checkout",
            state: { referrer: obj }
          }}
        />
      );
    }
    var invoiceSubtotal = this.getTotalPrice(this.state.cartItems)
    if(this.state.promo && this.state.promocode === "SAVE15"){
        invoiceSubtotal = invoiceSubtotal * 0.85
    } else if(this.state.promo && this.state.promocode === "XMAS18"){
        invoiceSubtotal = invoiceSubtotal - 10
    }
    var invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;
    return (
        <div style={{textAlign:"center"}}>
            <div className="container" style={{width:"100%",textAlign:"center",marginTop:"5%",marginBottom:"4%"}}>
                <div style={{textAlign:"center"}}>
                <Paper className={classes.root} style={{border:"2px solid #c2c2c2",borderRadius:"25px"}}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontSize:25}}>Desc</TableCell>
                                <TableCell numeric style={{fontSize:25}}>Qty.</TableCell>
                                <TableCell numeric style={{fontSize:25}}>@</TableCell>
                                <TableCell numeric style={{fontSize:25}}>Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.cartItems.map((item, index) => {
                                return (
                                        <TableRow key={item.itemid}>
                                            <TableCell><img
                                            style={{width:"40%", display:'inline'}}
                                            src={`/images/aisle/${item.name}.png`}/>
                                            <h4 style={{fontSize:25, display:'inline', marginLeft:'20px'}}>{item.name}</h4>
                                            </TableCell>
                                            <TableCell numeric>
                                            <TextField
                                                style={{marginLeft:'1%', fontSize:25}}
                                                id="standard-select-currency"
                                                select
                                                className={classes.textField}
                                                value={item.quantityInCart}
                                                onChange={this.handleChange(item)}
                                                SelectProps={{
                                                    MenuProps: {
                                                        className: classes.menu,
                                                    },
                                                }}
                                                margin="normal"
                                            >
                                                {quantityInCarts.map(option => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>

                                            </TableCell>
                                            <TableCell numeric style={{fontSize:25}}>{ccyFormat(item.price * item.discount)}</TableCell>
                                            <TableCell numeric style={{fontSize:25}}>{ccyFormat((item.price * item.discount)*item.quantityInCart)}</TableCell>
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
                                    <TableCell style={{fontSize:25}}>Promo Code: </TableCell>
                                    <TableCell style={{fontSize:25}}>{this.state.promocode}</TableCell></div>
                                     : null}
                                </TableRow>
                            <TableRow>
                                <TableCell rowSpan={3} />
                                <TableCell colSpan={2} style={{fontSize:25}}>Subtotal</TableCell>
                                <TableCell numeric style={{fontSize:25}}>{ccyFormat(invoiceSubtotal)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{fontSize:25}}>Shipping</TableCell>
                                <TableCell></TableCell>
                                <TableCell numeric style={{fontSize:25}}>Free</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{fontSize:25}}>Tax</TableCell>
                                <TableCell numeric style={{fontSize:25}}>{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                                <TableCell numeric style={{fontSize:25}}>{ccyFormat(invoiceTaxes)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell colSpan={2} style={{fontSize:25}}>Total</TableCell>
                                <TableCell numeric style={{fontSize:25}}>{ccyFormat(invoiceTotal)}</TableCell>
                            </TableRow>
                            <TableRow>
                            <TableCell></TableCell><TableCell></TableCell>
                            <TableCell>
                            <button className="btn btn-info" onClick={()=>this.handleCheckOut(this.state.cartItems)} style={{fontSize:25}}> Continue to Checkout</button>
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
