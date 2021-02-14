import React,{Component} from 'react';
import { Alert, Modal, TouchableHighlight, StyleSheet, Text, View, TouchableNativeFeedback, Dimensions } from 'react-native';

export default class Trigger extends Component{
  state={
    display: 'ALERT',
    modalVisible: false,
    modalTimer: 6,
  }
  confirmAlert = ()=>{
    this.setState({
      display: 'Alert Created'
    })
  }
  updateTimer = ()=>{
    this.setState({
      modalTimer: this.state.modalTimer-1,
    },()=>{
      if(this.state.modalTimer!==0 && this.state.modalVisible){
        setTimeout(()=>{
          this.updateTimer();
        },1000)
      }else{
        this.setState({modalVisible: false, modalTimer: 6})
      }
    })
  }
  async createAlert(){
    console.log("touch")
    this.setState({modalVisible: true})
    this.updateTimer()
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
              <View style={styles.modalButtons}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={() => {
                  this.confirmAlert();
                  this.setState({modalVisible: !this.state.modalVisible, modalTimer: 6});
                }}>
                <Text style={styles.textStyle}>Yes ({this.state.modalTimer})</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={() => {
                  this.setState({modalVisible: !this.state.modalVisible, modalTimer: 6});
                }}>
                <Text style={styles.textStyle}>No</Text>
              </TouchableHighlight>
              </View>
              
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
        marginTop: 22,
    },
    modalView: {
        flex:0.2,
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
    modalButtons: {
      flex:1,
      margin: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        width: '40%',
        margin: '5%',
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
        fontWeight: '700',
        fontSize: 20,

    },
});