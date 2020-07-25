import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";
import React from 'react';
class Routing extends MapLayer {
  //markers = {};


  constructor(props) {
    super(props);
    // this.routing = null;
  }

  createLeafletElement() {
    console.log("mila");
    const { map ,pointM} = this.props;
 //   const { markers } = this.state.markers;
    //console.log(markers);
    console.log(pointM);
    console.log(this.props.pointM);
  /*  let leafletElement = L.Routing.control({
      waypoints: [L.latLng(31.0461, 34.8516), L.latLng(31.046331, 34.8533416), L.latLng(32.046331, 33.8533416)]
    }).addTo(map.leafletElement);*/
    let leafletElement = L.Routing.control({
      waypoints: this.props.pointM
    }).addTo(map.leafletElement);


   this.routing = leafletElement;


    return leafletElement.getPlan();
  }
  componentDidMount() {
      console.log("update")
  }
  shouldComponentUpdate() {
    console.log('Greeting - shouldComponentUpdate lifecycle');

    return false;
  }
  componentWillUnmount() {
    console.log("unmount");
    if (this.props.map) {
      this.props.map.leafletElement.removeControl(this.routing);
      //L.DomEvent.off(this.props.map.leafletElement, 'click', this.createPopupsHandler);
    }
  }


  componentDidUpdate({ markers }) {

    const { map ,pointM,routing} = this.props;
    console.log("###");
    console.log(this.routing==null);
    // if (this.routing != null) {
    //   // this.props.map.leafletElement
    //   this.props.map.leafletElement.removeControl(this.routing);
    //   this.routing = null;
    //   //L.DomEvent.off(this.props.map.leafletElement, 'click', this.createPopupsHandler);
    // }
    /*console.log("update2")
    console.log(this.routing);

    console.log(pointM);
    console.log(this.props.pointM);*/

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
      console.log('shawarma')
      //console.log(this.props.pointM)
      var Points =[];
      this.props.pointM.forEach(e=>{
        //console.log('e' + e )
        //console.log('lat ' + e[0].lat)
        //console.log('lng ' + e[0].lng)

        Points.push([e.lat,e.lng]);
      });
      //console.log(Points);
      var x = generatePermutations(Points);
      var l = [];
      if(x.length <2){
        console.log("no dist");
        console.log(this.routing);
        this.routing.setWaypoints([]);
        // let leafletElement = L.Routing.control({
        //             waypoints: []
        //           }).addTo(map.leafletElement);
        //           this.routing = leafletElement;
        //           return leafletElement.getPlan();
       
      }
      else{
          var myLocation = [this.props.pointM[0].lat,this.props.pointM[0].lng]
          const Undef = 1000000;
          x.forEach(e=>{
            if(e[0][0] == myLocation[0] && e[0][1] == myLocation[1])
            {
              var sum=0;
              for(var i=0; i < e.length-1 ; i++){
                sum+=distance(e[i][0], e[i][1], e[i+1][0], e[i+1][1], 'K');
              }
              l.push(sum);
            }else{
              l.push(Undef)
            }
          });
        //  console.log(l);
        // // console.log(Math.min.apply(null,l));
          var route = l.indexOf(Math.min.apply(null,l));
         // console.log(x[route])
          // return(x[route]);

          this.routing.setWaypoints(x[route]);
          console.log(x[route]);
          // let leafletElement = L.Routing.control({
          //   waypoints: x[route]
          // }).addTo(map.leafletElement);
          // this.routing = leafletElement;
          // return leafletElement.getPlan();
        
      }

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

  }
  render(){
    return <div></div>;
  }



}
export default withLeaflet(Routing);
