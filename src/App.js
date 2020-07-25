//@flow
import React, {createRef, Component } from 'react';
import './App.css';
import L, { Point } from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import Routing from "./routingMachine";
import Control from 'react-leaflet-control';
//import p5 from 'p5';

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
  // componentDidMount() {
  //   const script = document.createElement("script");
  //   script.async = true;
  //   script.src = "https://cdn.jsdelivr.net/npm/p5@1.0.0/lib/p5.min.js";

  //   this.div.appendChild(script);
  // }
 /* constructor()
  {
    this.routing = <Routing name="routeM" map={this.map} pointM={this.state.markers} />
    
  }*/
  state = {
    isMapInit: false,
    hasLocation: false,
    flag: true,
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
    const {markers,flag} = this.state
    if(flag){
      markers.push(e.latlng)
      this.setState({markers})
    }
    //console.log(markers)
    //this.forceUpdate()
   // const el = document.getElementById("div22")
    //console.log(el)
    //el.remove()
  }

  routingEvent = event =>{
    
    const {rMarkers,markers,flag} = this.state
    let rMarkers2 = markers.slice()
    const map = this.map
    // console.log(map)
    let pointer = this
    let myLocation=null
    if(map!=null&& flag==true)
    {


        myLocation = map.leafletElement.locate({setView:false,maxZoom:16}).on('locationfound',function(e){
        //console.log('loction bitch')
        //console.log(e.latlng)
        rMarkers2.unshift(e.latlng)
        if(rMarkers2.length>=2){
          pointer.setState({rMarkers:rMarkers2,markers:[],flag:false})
        }else{
          console.log("not enough points");
        }
        //console.log('END')

      });
      //console.log(myLocation)
    }
    //console.log(rMarkers2)

   // this.setState({rMarkers:rMarkers2})
    //this.setState({markers:[]})

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

  updateRoute = () =>{
    this.setState({markers:[],rMarkers:[],flag:true})
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
            onClick={  
              this.updateRoute
              }
          >
            Reset Markers
          </button>
        </Control>
         <Control position="topleft" >
          <button onClick={this.routingEvent}>
            Plan route
          </button>
          
        </Control>

        <Routing mapInit = {this.state.isMapInit}  id="routeI" name="routeM" map={this.map} pointM={this.state.rMarkers} /> 
        {/* {this.state.isMapInit} */}

      </Map>
   
    );
  }
}

