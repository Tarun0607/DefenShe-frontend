import React,{Component} from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
const windowWidth = Dimensions.get('window').width;
export default class RenderExplore extends Component{
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
        <Text style={styles.textFont}>News Feed</Text>
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
  textView:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textFont: {
    fontSize: 30,
  }
});
