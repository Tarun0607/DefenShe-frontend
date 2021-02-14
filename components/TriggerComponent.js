import React,{Component} from 'react';
import { Alert, Modal, TouchableHighlight, StyleSheet, Text, View, TouchableNativeFeedback, Dimensions } from 'react-native';

export default class Trigger extends Component{
  state={
    display: 'Alert',
    modalVisible: false,
    modalTimer: 4,
  }
  async createAlert(){
    console.log("touch")
    this.setState({modalVisible: true})
  }
  render(){
    return(
      <View style={{flex:1, width:'100%'}}>
        <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Do you want to create an emergency Call?</Text>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={() => {
                  this.setState({modalVisible: !this.state.modalVisible});
                }}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableHighlight>
              
            </View>
          </View>
        </Modal>
        <TouchableNativeFeedback 
        style={styles.rootalert} 
        onPress={()=>{this.createAlert()}}>
          <View style={styles.trigger}>
              <Text style={styles.text}>{this.state.display}</Text>
          </View>
          
        </TouchableNativeFeedback>
      </View>
      
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
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        flexDirection: "row",
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});