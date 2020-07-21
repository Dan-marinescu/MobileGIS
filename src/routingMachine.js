import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";

class Routing extends MapLayer {
  //markers = {};
  state = {
      routing : L.Routing.control,
  }
  createLeafletElement() {
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
    return leafletElement.getPlan();
  }
  componentDidMount() {
      console.log("update")
  }
  componentDidUpdate({ markers }) {

    const { map ,pointM} = this.props;

    console.log("update2")
    console.log(pointM);
    console.log(this.props.pointM);
 
    let leafletElement = L.Routing.control({
      waypoints: this.props.pointM
    }).addTo(map.leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);
