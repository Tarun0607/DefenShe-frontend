import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import AnimatedSplash from "react-native-animated-splash-screen";
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class App extends Component{
  state = {
    isLoaded: false,
  }
  async componentDidMount(){
    setTimeout( () => {
      this.setState({ isLoaded: true })
    },2000);
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
    </View>
    </AnimatedSplash>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
