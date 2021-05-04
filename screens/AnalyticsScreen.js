import React,{Component} from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ScrollView} from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import WebViewComponent from '../components/WebViewAnalytics';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
const windowWidth = Dimensions.get('window').width;
export default class RenderAnalytics extends Component{
  state = {
  }
  componentDidMount = async ()=>{
  await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/8691691433'); // Test ID, Replace with your-admob-unit-id
  await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
  await AdMobInterstitial.showAdAsync();
  }
  render(){
    return(
    <View style={styles.container}>
      <View style={styles.header}> 
        <HeaderComponent props={this.props}/>
      </View>
      <View style={styles.webView}>
        <WebViewComponent />
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
  },
  header: {
    width: '100%',
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webView:{
    flex: 1,
  },
  textFont: {
    alignSelf: 'center',
    fontSize: 30,
  }
});
