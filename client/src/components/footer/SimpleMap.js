import React from "react";
import { compose, withProps,lifecycle } from "recompose";
import {  withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
    Marker } from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDW-Gy3YtzwfsT2pstjlMU2Q5U4TjRJZp8&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `800px`,width:"800px",textAlign:"center"}} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidUpdate(prevProps) {
    console.log(this.props)
    if(this.props.address !== prevProps.address){
      const DirectionsService = new window.google.maps.DirectionsService();
      DirectionsService.route({
        origin: `${this.props.address}`,
        destination: "San Jose",
        travelMode: window.google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
         
        } else {
          console.error(`error fetching directions ${result}`);
          console.log(result)
        }
      }); 
    }
    }
  })
)((props) =>(
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: 37.3353, lng: -121.8813 }}
  >
  {console.log(props)}
    {!props.address ?
    props.isMarkerShown && <Marker position={{ lat: 37.3353, lng: -121.8813 }} onClick={props.onMarkerClick} /> 
    :
    props.directions && <DirectionsRenderer directions={props.directions} />
    }
  </GoogleMap>
))


export default class SimpleMap extends React.PureComponent {
  state = {
    isMarkerShown: false,
    locations:'',
    address:'',
    add:false
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  handleInputAddress = e => {
    this.setState({ locations: e.target.value })
  }



  handleOnclick = () =>{
    this.setState({address:this.state.locations})
  }

  render() {
    return (
        <div>
        <div className="container" style={{border:"2px solid #c2c2c2",borderRadius:"25px",backgroundColor:"#ffffff",textAlign:"center",marginTop:"50px",marginBottom:"50px"}}>
        <div style={{textAlign:"center",margin:50}}>
        <div className="input-group">
            <input
                type="text"
                placeholder="tell us where you are"
                value={this.state.locations}
                onChange={this.handleInputAddress}
            />
            <div className="input-group-append">
            <button onClick={this.handleOnclick} type='submit' className="btn btn-info">Submit</button>
            </div>
            </div>
            <MyMapComponent
                    isMarkerShown={this.state.isMarkerShown}
                    onMarkerClick={this.handleMarkerClick}
                    address={this.state.address}
                />
            </div>
        </div>
        </div>
    )
  }
}

