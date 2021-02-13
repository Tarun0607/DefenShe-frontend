import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class Trigger extends Component{
  state={
    display: 'Alert'
  }
  async createAlert(){
    console.log("touch")
    this.setState({display: 'Alert Created'})
  }
  render(){
    return(
      <TouchableNativeFeedback 
      style={styles.rootalert} 
      onPress={()=>{this.createAlert()}}>
        <View style={styles.trigger}>
            <Text style={styles.text}>{this.state.display}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }

}

const styles = StyleSheet.create({
    rootalert:{
      backgroundColor: '#221633',
      elevation: 3,
    },
    trigger: {
        flex:0.6,
        margin: '5%',
        width:'90%',
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 6,
        overflow: 'hidden',
    },
    text: {
        textAlign: 'center',
        justifyContent: 'center',
        width: '100%',
        fontSize: 30,
        fontWeight: '700',
    }
});