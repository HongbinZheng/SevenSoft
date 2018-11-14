import React, { Component } from 'react';
import axios from 'axios'

const checkoutPanel = {background:'#FFFFFF', marginBottom:'0', padding:'1rem',"borderRadius":"25px", border:'4px solid #c2c2c2', maxWidth:'70rem',marginLeft:"30px",marginBottom:"30px"}

class Address extends Component {
    constructor(){
        super()
        this.state= {
            edit:false,
            address1:'',
            address2:'',
            city:'',
            state:'',
            Zip:'',
            username:''
        }
        this.handleonClick = this. handleonClick.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    
    componentWillMount(){
        this.setState({username:this.props.username})
        let username = this.props.username
        axios.get(`/api/getAddress?username=${username}`)
        .then(res=>{
            console.log(res.data)
            if(res.data){this.setState(res.data)}

        })
    }

    handleonClick(){
        let address = {
            address1:this.state.address1,
            address2:this.state.address2,
            city:this.state.city,
            state:this.state.state,
            Zip:this.state.Zip
        }
        let username = this.state.username
        if(this.state.edit){
            console.log(this.state)
            axios.post('/api/changeAddress',{address,username})
                .then(res=>console.log(res.data))
        }
        this.setState({edit:!this.state.edit})
    }
    onChange= ({target: { name, value }}) => {
        this.setState({[name]:value})
    }
    render() {
        console.log(this.state)
        return (
            <div>
                 {this.state.edit ?
                    <div style={checkoutPanel}>
                        <form>
                            <div className="form-group">
                                <div className="form-group">
                                    <label htmlFor="inputAddress">Address 1</label>
                                    <input type="text" className="form-control" name="address1" value={this.state.address1} onChange={this.onChange}></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputAddress2">Address 2</label>
                                    <input type="text" className="form-control" name='address2' value={this.state.address2} onChange={this.onChange}></input>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputCity">City</label>
                                    <input type="text" className="form-control" name='city' value={this.state.city} onChange={this.onChange}></input>
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputState">State</label>
                                    <select id="inputState" className="form-control" name='state' value={this.state.state} onChange={this.onChange}>
                                        <option defaultValue>Choose a State </option>
                                        <option value="AL">Alabama</option>
                                        <option value="AK">Alaska</option>
                                        <option value="AZ">Arizona</option>
                                        <option value="AR">Arkansas</option>
                                        <option value="CA">California</option>
                                        <option value="CO">Colorado</option>
                                        <option value="CT">Connecticut</option>
                                        <option value="DE">Delaware</option>
                                        <option value="DC">District Of Columbia</option>
                                        <option value="FL">Florida</option>
                                        <option value="GA">Georgia</option>
                                        <option value="HI">Hawaii</option>
                                        <option value="ID">Idaho</option>
                                        <option value="IL">Illinois</option>
                                        <option value="IN">Indiana</option>
                                        <option value="IA">Iowa</option>
                                        <option value="KS">Kansas</option>
                                        <option value="KY">Kentucky</option>
                                        <option value="LA">Louisiana</option>
                                        <option value="ME">Maine</option>
                                        <option value="MD">Maryland</option>
                                        <option value="MA">Massachusetts</option>
                                        <option value="MI">Michigan</option>
                                        <option value="MN">Minnesota</option>
                                        <option value="MS">Mississippi</option>
                                        <option value="MO">Missouri</option>
                                        <option value="MT">Montana</option>
                                        <option value="NE">Nebraska</option>
                                        <option value="NV">Nevada</option>
                                        <option value="NH">New Hampshire</option>
                                        <option value="NJ">New Jersey</option>
                                        <option value="NM">New Mexico</option>
                                        <option value="NY">New York</option>
                                        <option value="NC">North Carolina</option>
                                        <option value="ND">North Dakota</option>
                                        <option value="OH">Ohio</option>
                                        <option value="OK">Oklahoma</option>
                                        <option value="OR">Oregon</option>
                                        <option value="PA">Pennsylvania</option>
                                        <option value="RI">Rhode Island</option>
                                        <option value="SC">South Carolina</option>
                                        <option value="SD">South Dakota</option>
                                        <option value="TN">Tennessee</option>
                                        <option value="TX">Texas</option>
                                        <option value="UT">Utah</option>
                                        <option value="VT">Vermont</option>
                                        <option value="VA">Virginia</option>
                                        <option value="WA">Washington</option>
                                        <option value="WV">West Virginia</option>
                                        <option value="WI">Wisconsin</option>
                                        <option value="WY">Wyoming</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="inputZip">Zip</label>
                                    <input type="text" className="form-control" name='Zip' value={this.state.Zip} onChange={this.onChange}></input>
                                </div>
                            </div>
                        </form>
                        <br />
                        <button onClick={this.handleonClick} className='btn btn-info'>Save</button>
                    </div>
                    :
                    <div style={checkoutPanel}>
                    <div>
                        <form>
                            <div className="form-group">
                                <div className="form-group">
                                    <label htmlFor="inputAddress">Address 1 </label>
                                    <h3>{this.state.address1}</h3>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputAddress2">Address 2 </label>
                                    <h3>{this.state.address2}</h3>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputCity">City </label>
                                    <h3>{this.state.city}</h3>
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputState">State</label>
                                    <h3>{this.state.state}</h3>
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="inputZip">Zip</label>
                                    <h3>{this.state.Zip}</h3>
                                </div>
                            </div>
                        </form>
                        </div>
                        <br />
                        <button onClick={this.handleonClick} className='btn btn-info'>Edit</button>
                    </div>}
            </div>
        );
    }
}

export default Address;