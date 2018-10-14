import React, { Component } from 'react';
import './App.css';
import firebase from './config/firebase';
import login from './screen/login';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

var provider = new firebase.auth.FacebookAuthProvider();

class App extends Component {
  constructor(){
    super()
    this.state = {
      coords: null,
    }
  this.setPosition = this.setPosition.bind(this)
  }
  
  login(){
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log('user***', user);
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log('error***', error);
    });
  }
  componentDidMount(){
    this.setPosition()
  }
    setPosition(){
      // const { coords } = this.state
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({coords: position.coords})
      // console.log(coords);
    });
  }
  updateCoords({latitude, longitude}) {
    this.setState({coords: {latitude, longitude}})
  }
  
  

  render() {
    const { coords } = this.state
    return (
      <div className="App">
        <button onClick={this.login}>Login With Facebook</button>
        <button onClick={this.setPosition}>position</button>
        <logIn/>
       {coords &&

         <MyMapComponent
         isMarkerShown
         googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
         loadingElement={<div style={{ height: `100%` }} />}
         containerElement={<div style={{ height: `400px` }} />}
         mapElement={<div style={{ height: `100%` }} />}
         coords={coords}
         draggable={true}
/>  
        }
      </div>
    );
  }
}
const MyMapComponent = withScriptjs(withGoogleMap((props) =>
<GoogleMap
    defaultZoom={15}
    center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
    >

    {props.isMarkerShown && <Marker onDrag={(abc) => {console.log(abc.latLng.lat());
    }} draggable={true} position={{ lat: props.coords.latitude, lng: props.coords.longitude}}
     />}
  </GoogleMap>

))


export default App;