//@flow
import React, {createRef, Component } from 'react';
import './App.css';
import L, { Point } from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import Routing from "./routingMachine";
import Control from 'react-leaflet-control';
import p5 from 'p5';

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
    // console.log('check')
  //  console.log(rMarkers2)


    function generatePermutations(Arr){
        var permutations = [];
        var A = Arr.slice();
      
        function swap(a,b){
          var tmp = A[a];
          A[a] = A[b];
          A[b] = tmp;
        }
      
        function generate(n, A){
          if (n == 1){
            permutations.push(A.slice());
          } else {
            for(var i = 0; i <= n-1; i++) {
              generate(n-1, A);
              swap(n % 2 == 0 ? i : 0 ,n-1);
            }
          }
        }
        
        generate(A.length, A);
        return permutations;
      }

            
      var x = generatePermutations([[11,11],[2,2],[3,3],[5,6],[4,4],[13,13],[14,14]]);
      var l = [];
      if(x.length <2){
        console.log("no dist");
      }

      x.forEach(e=>{
        var sum=0;
        for(var i=0; i < e.length-1 ; i++){
          sum+=distance(e[i][1], e[i][0], e[i+1][1], e[i+1][0], 'K');
        }
        l.push(sum);
      });
      console.log(l);
      console.log(Math.min.apply(null,l));
      var shit = Math.min.apply(null,l);
      var route = l.indexOf(shit);
      console.log(x[route])
      // return(x[route]);

      function distance(lat1, lon1, lat2, lon2, unit) {
        var radlat1 = Math.PI * lat1/180
        var radlat2 = Math.PI * lat2/180
        var radlon1 = Math.PI * lon1/180
        var radlon2 = Math.PI * lon2/180
        var theta = lon1-lon2
        var radtheta = Math.PI * theta/180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180/Math.PI
        dist = dist * 60 * 1.1515
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist
}



  this.setState({rMarkers:rMarkers2})
  this.setState({markers:[]})

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

