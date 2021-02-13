import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import AnimatedSplash from "react-native-animated-splash-screen";
import * as Location from 'expo-location';
import HomeScreen from './screens/HomeScreen';
import HeaderComponent from './components/HeaderComponent';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
var locationPermission = false;
export default class App extends Component{
  state = {
    isLoaded: false,
  }
  async componentDidMount(){
    setTimeout( () => {
      this.setState({ isLoaded: true })
    },2000);
    Location.requestPermissionsAsync()
      .then(({status})=>{
        locationPermission = (status === 'granted');
        while(locationPermission===false){
          Location.requestPermissionsAsync()
          .then(({status})=>{
            locationPermission = (status === 'granted');
          })
        }
    })
  }
  render(){
    return(
      <AnimatedSplash
        translucent={true}
        isLoaded={this.state.isLoaded}
        logoImage={require("./assets/splash.png")}
        backgroundColor={"black"}
        logoHeight={windowHeight}
        logoWidth={windowWidth}
      >
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}> 
        <HeaderComponent />
      </View>
      <View style={styles.home}> 
        <HomeScreen />
      </View>
      
    </View>
    </AnimatedSplash>
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
  home: {
    width: '100%',
    flex: 0.9,
  },
});
