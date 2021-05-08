import React,{Component} from 'react';
import {StyleSheet, Text, View, TouchableHighlight, Linking } from 'react-native';
import TriggerComponent from '../components/TriggerComponent.js';
import MapComponent from '../components/MapComponent';

import {RSAEncrypt,RSADecrypt} from '../functions/RSAAlgorithms';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import {
  AdMobBanner,
  PublisherBanner,
} from 'expo-ads-admob';
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
  // Encryption with one public RSA key
  const encryptedID = RSAEncrypt(deviceId);
  const encryptedLat = RSAEncrypt(latitude);
  const encryptedLon = RSAEncrypt(longitude);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({deviceID:encryptedID,latitude:encryptedLat,longitude:encryptedLon}),
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
    renderHomeScreen = ()=>{
      if(this.state.locationFetched===true)
      return(
        <View style={styles.container}>
          <View style={styles.triggerview}>
            <TriggerComponent deviceID={this.state.deviceID} location={{latitude: this.state.latitude, longitude: this.state.longitude}}/>
          </View>
          <View style={styles.mapview}>
            <MapComponent deviceID={this.state.deviceID} location={{latitude: this.state.latitude, longitude: this.state.longitude}} />
          </View>
          <View style={styles.panelView}>
            <View style={styles.pane}>
              <TouchableHighlight
                style={styles.sosButton} 
                onPress={()=>{Linking.openURL('tel:112')}}>
                  <View style={{flex:1,justifyContent: "center"}}>
                      <Text style={styles.text}>SOS</Text>
                  </View>
              </TouchableHighlight>
            </View>
            <View style={styles.ads}>
              <AdMobBanner servePersonalizedAds={true} bannerSize="largeBanner" adUnitID={"ca-app-pub-9152673793842667/2888813567"} />
            </View>
          </View>
        </View>
      )
      else
      return null;      
    };
    const HomeScreenRender = renderHomeScreen();
    return HomeScreenRender;
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  triggerview: {
    flex: 0.16,
    alignItems: 'center',
  },
  mapview: {
    flex: 0.64,
    alignItems: 'center',
  },
  panelView: {
    marginLeft: '5%',
    width: '90%',
    marginTop: 20,
    flex:0.15,
    flexDirection: "row",
    alignItems: 'center',
  },
  sosButton:{
    flex:1,
  },
  text: {
    textAlign: 'center',
    justifyContent: 'center',
    width: '100%',
    fontSize: 30,
    fontWeight: '700',
  },
  pane: {
    borderRadius: 10,
    overflow: "hidden",
    flex: 0.25,
    height: '75%',
    backgroundColor: 'red',
  },
  ads: {
    marginLeft: 10,
    overflow: "hidden",
    flex: 0.75,
    borderRadius: 10,
    borderWidth: 1
  }
});