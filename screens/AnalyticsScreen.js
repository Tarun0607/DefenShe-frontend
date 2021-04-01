import React,{Component} from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ScrollView} from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
const windowWidth = Dimensions.get('window').width;
export default class RenderAnalytics extends Component{
  state = {
  }
  componentDidMount = async ()=>{
  }
  render(){
    return(
    <View style={styles.container}>
      <View style={styles.header}> 
        <HeaderComponent props={this.props}/>
      </View>
      <View style={styles.textView}> 
        <Text style={styles.textFont}>Analytics Screen</Text>
        <ScrollView style={styles.scrollView}>
          <Image
          style={styles.logo}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
          />
          <Text style={styles.textFont}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
            sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
            est laborum.
          </Text>
        </ScrollView>
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
  textScroll: {
    fontSize: 30,
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
  logo: {
    width: 300,
    height: 300,
  },
  textView:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textFont: {
    fontSize: 30,
  }
});
