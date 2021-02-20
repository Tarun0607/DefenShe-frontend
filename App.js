import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import AnimatedSplash from "react-native-animated-splash-screen";
import RenderHome from './screens/RenderHome';
import HeaderComponent from './components/HeaderComponent';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
var locationPermission = false;
const Drawer = createDrawerNavigator();
export default class App extends Component{
  state = {
    isLoaded: false,
  }
  componentDidMount = async ()=>{
    setTimeout(()=>{
      this.setState({isLoaded: true})
    },1000)
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
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={RenderHome} />
            <Drawer.Screen name="Notifications" component={RenderHome} />
          </Drawer.Navigator>
        </NavigationContainer>
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
    flex: 1,
  },
});
