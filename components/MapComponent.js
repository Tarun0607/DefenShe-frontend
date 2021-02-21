import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import axios from 'axios';
import {AppExports} from '../config/apiKey';
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
const API_KEY = AppExports[0].googleServiceKey;

export default class Map extends Component{
  state = {
    region: {
      latitude: this.props.location.latitude,
      longitude: this.props.location.longitude,
      latitudeDelta: 0.006,
      longitudeDelta: 0.006,
    },
    renderVictim: false,
    victimLatitude: 0.0,
    victimLongitude: 0.0,
  }
  fetchVictimLocation = async ()=>{
    var requestOptions = {
      method: 'get',
      url: "https://defenshe.azurewebsites.net/trigger/"+this.props.deviceID,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios(requestOptions)
    .then((response)=>{
      if(response.data.render===true){
        this.setState({ 
          victimLatitude: Number(response.data.latitude["$numberDecimal"]),
          victimLongitude: Number(response.data.longitude["$numberDecimal"]),
          renderVictim: response.data.render,
        })
      }else{
        this.setState({
          renderVictim: response.data.render,
        })
      }
    })
    .catch((error)=>{
    });
  }
  componentDidMount(){
    setInterval(async () => await this.fetchVictimLocation(), 3000);
  }
  render(){
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
          <MapView.Heatmap 
            points={points}
            opacity={0.2}
            radius={50}
            maxIntensity={10}
            gradientSmoothing={5}
          />
          <MapView.Circle
            center={{latitude: this.props.location.latitude, longitude: this.props.location.longitude}}
            radius={310}
            strokeWidth={0.4}
            fillColor={"rgba(12,45,12,0.1)"} 
          />
          {(this.state.renderVictim === true) && (
  					<MapViewDirections
            origin={{latitude: this.props.location.latitude, longitude: this.props.location.longitude,}}
            destination={{latitude: this.state.victimLatitude, longitude: this.state.victimLongitude,}}
            strokeWidth={4}
            strokeColor="black"
            apikey={API_KEY}
            />
  				)}
          {(this.state.renderVictim === true) && (
  					<MapView.Marker
            key={1}
            coordinate={{latitude: this.state.victimLatitude, longitude: this.state.victimLongitude,}}
            title={"Victim's Location"}
            description={""}
            />
  				)}
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
      flex: 0.9,
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