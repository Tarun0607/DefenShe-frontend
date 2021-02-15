import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import axios from 'axios';
const overlay = true;
const points = [{latitude: 12.946214, longitude: 80.131781, weight: 1},
                {latitude: 12.947214, longitude: 80.138181, weight: 1},
                {latitude: 12.947274, longitude: 80.138281, weight: 1},
                {latitude: 12.946214, longitude: 80.138181, weight: 1},
                {latitude: 12.947914, longitude: 80.137181, weight: 1},
                {latitude: 12.946814, longitude: 80.139781, weight: 1},
                {latitude: 12.945214, longitude: 80.134781, weight: 1},
                {latitude: 12.945114, longitude: 80.134981, weight: 1},
                {latitude: 12.944214, longitude: 80.134781, weight: 1},
                {latitude: 12.945214, longitude: 80.135781, weight: 1},
                {latitude: 12.946214, longitude: 80.134681, weight: 1},
                {latitude: 12.945714, longitude: 80.138281, weight: 1},
	];
const API_KEY = "AIzaSyB6pOeU_MpjIcKlQz2jD-epOm7nO1cxXzk";
export default class Map extends Component{
  state = {
    region: {
      latitude: this.props.location.latitude,
      longitude: this.props.location.longitude,
      latitudeDelta: 0.006,
      longitudeDelta: 0.006,
    },
    renderVictim: false,
    victimLatitude: null,
    victimLongitude: null,
  }
  fetchVictimLocation = async (deviceID)=>{
    var requestOptions = {
      method: 'GET',
      url: "https://defenshe.azurewebsites.net/trigger/",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({deviceID:deviceID}),
    };
    axios(requestOptions)
    .then((response)=>{
      console.log(response.data)
      this.setState({
        renderVictim: response.data.render,
        victimLatitude: response.data.latitude,
        victimLongitude: response.data.longitude,
      },()=>{
        setTimeout(()=>{
          this.fetchVictimLocation(deviceID);
        },2000);
      })
    })
    .catch((error)=>{
      this.fetchVictimLocation(deviceID);
    });
  }
  componentDidMount(){
    this.fetchVictimLocation(this.props.deviceID);
  }
  render(){
    const renderDirection = ()=>{
      try{
        var directionComponent=(
          <MapViewDirections
          origin={{latitude: this.props.location.latitude, longitude: this.props.location.longitude}}
          destination={{latitude: 12.943775, longitude: 80.139447,}}
          strokeWidth={6}
          strokeColor="hotpink"
          apikey={API_KEY}
        />
        )
        return directionComponent;
      }catch{
        return null;
      }
    }
    const mapDirections = renderDirection();
    return(
      <View style={styles.mapRoot}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          followsUserLocation={true}
          userLocationUpdateInterval={3000}
          initialRegion={this.state.region}
          onRegionChange = {async (region,gesture) => {if(gesture===true)this.setState({region:region})}}
          >
          <MapView.Marker
              key={1}
              coordinate={{latitude: this.props.location.latitude, longitude: this.props.location.longitude}}
              title={"Your Location"}
              description={""}
          />
          <MapView.Heatmap points={points}
                         opacity={0.2}
                         radius={50}
                         maxIntensity={10}
                         gradientSmoothing={5}/>
          {/* <MapView.Polyline
          coordinates={points} /> */}
          <MapView.Circle
          center={{latitude: this.props.location.latitude, longitude: this.props.location.longitude}}
          radius={310}
          strokeWidth={0.4}
          fillColor={"rgba(12,45,12,0.1)"} />
          {mapDirections}
          <View style={styles.overlay}>
          </View>
        </MapView>
      </View>     
    )
  }
}

const styles = StyleSheet.create({
    overlay:{
      backgroundColor: 'blue'
    },
    mapRoot:{
      flex: 1,
      width: '90%', 
      borderRadius: 20,
      overflow: 'hidden',
      elevation: 3,
    },
    map: {
        flex: 1,
        width: '100%',
    },
});