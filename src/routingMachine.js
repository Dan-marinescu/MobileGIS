import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";

class Routing extends MapLayer {
  //markers = {};


  constructor(props) {
    super(props);
    this.state = {
    };
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


   // this.routing = leafletElement;


    return leafletElement.getPlan();
  }
  componentDidMount() {
      console.log("update")
  }
  componentDidUpdate({ markers }) {

    const { map ,pointM} = this.props;

    if (this.routing) {
      this.props.map.leafletElement.removeControl(this.routing);
      //L.DomEvent.off(this.props.map.leafletElement, 'click', this.createPopupsHandler);
    }
    console.log("update2")
    console.log(this.routing);

    console.log(pointM);
    console.log(this.props.pointM);
 
    let leafletElement = L.Routing.control({
      waypoints: this.props.pointM
    }).addTo(map.leafletElement);
    this.routing = leafletElement;
    return leafletElement.getPlan();
  }
/*
  componentWillUnmount() {
    console.log("unmount");
    if (this.props.map) {
      this.props.map.leafletElement.removeControl(this.routing);
      //L.DomEvent.off(this.props.map.leafletElement, 'click', this.createPopupsHandler);
    }
  }*/


}
export default withLeaflet(Routing);
