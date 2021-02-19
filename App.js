import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import AnimatedSplash from "react-native-animated-splash-screen";
import HomeScreen from './screens/HomeScreen';
import HomeScreenBackground from './screens/HomeScreenBackground';
import HeaderComponent from './components/HeaderComponent';
import * as Permissions from 'expo-permissions';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
var locationPermission = false;
export default class App extends Component{
  state = {
    isLoaded: false,
    locationPermission: false,
    locationPermissionType: false,
  }
  componentDidMount = async ()=>{
    Permissions.askAsync(Permissions.LOCATION)
    .then((status)=>{
      locationPermission = (status.status === 'granted');
      this.setState({ locationPermission: locationPermission },()=>{
        if(this.state.locationPermission===true){
          this.setState({locationPermissionType: (status.permissions.location.scope==="always")},()=>{
            setTimeout( () => {
              this.setState({ isLoaded: true })
            },500);
          })
        }
      })
    }) 
  }
  render(){
    renderHomeScreen = ()=>{
      if(this.state.isLoaded===true && this.state.locationPermission===true && this.state.locationPermissionType===false){
        return(
          <View style={styles.home}> 
            <HomeScreen />
          </View>
        )
      }else if(this.state.isLoaded===true && this.state.locationPermission===true && this.state.locationPermissionType===true){
        return(
          <View style={styles.home}> 
            <HomeScreenBackground />
          </View>
        )
      }else{
        return <View><Text style={{justifyContent: "center", textAlign: "center"}}>You need to enable location always to use this app</Text></View>;
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
