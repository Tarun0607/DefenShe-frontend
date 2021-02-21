import React,{Component} from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import HomeScreen from './HomeScreen';
import HomeScreenBackground from './HomeScreenBackground';
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
      <View> 
        <Text>Analytics screen of defenshe</Text>
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
