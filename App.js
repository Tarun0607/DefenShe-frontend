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
    locationPermission: false
  }
  componentDidMount = async ()=>{
    Location.requestPermissionsAsync()
      .then(({status})=>{
        locationPermission = (status === 'granted');
          this.setState({ locationPermission: locationPermission })
        while(locationPermission===false){
          Location.requestPermissionsAsync()
          .then(({status})=>{
            locationPermission = (status === 'granted');
            this.setState({ locationPermission: locationPermission })
          })
        }
    })
    setTimeout( () => {
      this.setState({ isLoaded: true })
    },2000);
    
  }
  render(){
    renderHomeScreen = ()=>{
      if(this.state.locationPermission===true){
        return(
          <View style={styles.home}> 
            <HomeScreen />
          </View>
        )
      }else{
        return null;
      }
    }
    const HomeScreenRender = renderHomeScreen();
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
      {HomeScreenRender}
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
