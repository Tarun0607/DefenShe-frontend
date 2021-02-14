import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';
import MapView from 'react-native-maps';
const overlay = true;
export default class Map extends Component{
  render(){
    return(
      <View style={styles.mapRoot}>
        <MapView
          style={styles.map}
          region={{
            latitude: this.props.location.latitude,
            longitude: this.props.location.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001
          }}>
          <MapView.Marker
              key={1}
              coordinate={{latitude: this.props.location.latitude, longitude: this.props.location.longitude}}
              title={"Your Location"}
              description={""}
          />
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