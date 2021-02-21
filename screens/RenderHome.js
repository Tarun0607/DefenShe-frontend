import React,{Component} from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import HomeScreen from './HomeScreen';
import HomeScreenBackground from './HomeScreenBackground';
import * as Permissions from 'expo-permissions';
import HeaderComponent from '../components/HeaderComponent';
const windowWidth = Dimensions.get('window').width;
var locationPermission = false;
export default class RenderHome extends Component{
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
        <HomeScreen />
        )
      }else if(this.state.isLoaded===true && this.state.locationPermission===true && this.state.locationPermissionType===true){
        return(
        <HomeScreenBackground />
        )
      }else{
        return <View><Text style={{justifyContent: "center", textAlign: "center"}}>You need to enable location always to use this app</Text></View>;
      }
    }
    const HomeScreenRender = renderHomeScreen();
    return(
    <View style={styles.container}>
      <View style={styles.header}> 
        <HeaderComponent props={this.props} />
      </View>
      <View style={styles.home}> 
      {HomeScreenRender}
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
  home: {
    width: '100%',
    flex: 1,
  },
});
