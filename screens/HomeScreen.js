import React,{Component} from 'react';
import { StyleSheet, View } from 'react-native';
import TriggerComponent from '../components/TriggerComponent.js';
import MapComponent from '../components/MapComponent';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  return token;
}

async function sendLocation(deviceId, latitude, longitude){
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({deviceID:deviceId,latitude:latitude,longitude:longitude}),
  };
  fetch("https://defenshe.azurewebsites.net/location/", requestOptions)
  .then(function (response) {
  })
  .catch(function (error) {
  });
}

export default class HomeScreen extends Component{
  state = {
    deviceID: '',
    latitude: 0.0,
    longitude: 0.0,
    locationFetched: false
  };
  updateLocationInterval = async ()=>{
    const location = await Location.getCurrentPositionAsync({});
    this.setState({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      locationFetched: true
    },()=>{
      setTimeout(()=>{
        sendLocation(this.state.deviceID,this.state.latitude,this.state.longitude)
        this.updateLocationInterval();
      },3000);
    })
  }
  async componentDidMount(){
    registerForPushNotificationsAsync()
    .then((token) => {
      this.setState({
        deviceID: token,
      },()=>{ 
        this.updateLocationInterval();
      })
    });
  }
  render(){
    if(this.state.locationFetched===true)
    return(
      <View style={styles.container}>
        <View style={styles.triggerview}>
          <TriggerComponent />
        </View>
        <View style={styles.mapview}>
          <MapComponent location={{latitude: this.state.latitude, longitude: this.state.longitude}} />
        </View>
      </View>
    )
    else
    return null;
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  triggerview: {
    flex: 0.2,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  mapview: {
    flex: 0.75,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});