import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';
import MapView from 'react-native-maps';
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
export default class Map extends Component{
  state = {
    region: {
      latitude: this.props.location.latitude,
      longitude: this.props.location.longitude,
      latitudeDelta: 0.006,
      longitudeDelta: 0.006,
    },
  }
  componentDidMount(){
  }
  render(){
    return(
      <View style={styles.mapRoot}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          followsUserLocation={false}
          userLocationUpdateInterval={2000}
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