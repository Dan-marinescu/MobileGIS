//@flow
import React, {createRef, Component } from 'react';
import './App.css';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import Routing from "./routingMachine";
import Control from 'react-leaflet-control';


let DefaultIcon = L.icon({
    iconUrl: icon,
    iconAnchor: [10, 55],
});

L.Marker.prototype.options.icon = DefaultIcon;
/*
type State = {
  hasLocation: boolean,
  latlng: {
    lat: number,
    lng: number,
  },
}*/

export default class App extends Component<{}, State>  {
 /* constructor()
  {
    this.routing = <Routing name="routeM" map={this.map} pointM={this.state.markers} />
    
  }*/
  state = {
    isMapInit: false,
    hasLocation: false,
    latlng: {
      lat: 31.0461,
      lng: 34.8516,
    },
    markers:[],
    rMarkers:[],
  }
/*
  let leafletElement = L.Routing.control({
      waypoints: [
        L.latLng(16.506, 80.648),
        L.latLng(17.384, 78.4866),
        L.latLng(12.971, 77.5945)
      ],
      // router: new L.Routing.Google(),
      lineOptions: {
        styles: [
          {
            color: "blue",
            opacity: 0.6,
            weight: 4
          }
        ]
      },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      showAlternatives: false
    }).addTo(map.leafletElement);

*/
  saveMap = map => {
      this.map = map;
      this.setState({
        isMapInit: true
      });
      //console.log('ffff');
    };

  mapRef = createRef<Map>()
/*
  handleClick = ()=>{
    const map = this.mapRef.current
    if (map != null) {
      map.leafletElement.locate()
    }
  }*/
  //map = L.map('map');

  addMarker = (e) => {
    const {markers} = this.state
    markers.push(e.latlng)
    this.setState({markers})
    //console.log(markers)
    //this.forceUpdate()
   // const el = document.getElementById("div22")
    //console.log(el)
    //el.remove()
  }

  routingEvent = event =>{
    const {rMarkers,markers} = this.state
    var rMarkers2 = [markers]
    //console.log('check')
   // console.log(rMarkers2)
    this.setState({rMarkers:rMarkers2})
    this.setState({markers:[]})

    //markers.push(e.latlng)
  }

   handleClick = event => {
    const { lat, lng } = event.latlng
    this.addMarker(event)
  }
  
  handleLocationFound = (e: Object) => {
    this.setState({
      hasLocation: true,
      latlng: e.latlng,
    })
  }

  render(){
    const marker = this.state.hasLocation ? (
      <Marker position={this.state.latlng}>
        <Popup>You are here</Popup>
      </Marker>
    ) : null


    return (
      <Map className="map" onClick={this.handleClick}  ref= {this.saveMap}
        onLocationfound={this.handleLocationFound}
       center={this.state.latlng} zoom={13}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.state.markers.map((position, idx) => 
          <Marker key={`marker-${idx}`} position={position}>
            <Popup>
              <span>Popup</span>
            </Popup>
          </Marker>
        )}
        <Control position="topleft" >
          <button 
            onClick={ () => this.setState({markers:[]}) }
          >
            Reset Markers
          </button>
        </Control>
         <Control position="topleft" >
          <button onClick={this.routingEvent}>
            Plan route
          </button>
          
        </Control>


        {this.state.isMapInit && <Routing id="routeI" name="routeM" map={this.map} pointM={this.state.rMarkers} /> }

      </Map>
   
    );
  }
}
        //{this.state.isMapInit && <Routing name="routeM" map={this.map} pointM={this.state.markers} />}
 // {this.state.isMapInit && this.state.routing.map(()=>{
  //         <Routing name="routeM" map={this.map} pointM={this.state.markers} />
   //     })}
//export default App;
