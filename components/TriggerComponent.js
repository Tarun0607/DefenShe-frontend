import React,{Component} from 'react';
import { Alert, Modal, TouchableHighlight, StyleSheet, Text, View, TouchableNativeFeedback, Dimensions } from 'react-native';
import axios from 'axios';
export default class Trigger extends Component{
  state={
    alertTriggered: false,
    display: 'ALERT',
    modalVisible: false,
    modalTimer: 6,
    alertColor: 'red',
  }
  triggerManager = async (reqType)=>{
    var requestOptions = {
      method: reqType,
      url: "https://defenshe.azurewebsites.net/trigger/",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({deviceID:this.props.deviceID, latitude:this.props.location.latitude, longitude: this.props.location.longitude}),
    };
    axios(requestOptions);
  }
  confirmAlert = ()=>{
    this.setState({
      display: 'Alert Created',
      alertColor: 'blue',
      alertTriggered: true,
    },()=>{
      setTimeout(()=>{
        this.setState({
          alertColor: 'red',
        },()=>{
          setTimeout(()=>{
            if(this.state.alertTriggered===true)
            this.confirmAlert();
          },300)
        })
      },300)
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
      }else if(this.state.modalVisible===true){
        this.setState({modalVisible: false, modalTimer: 6})
        this.triggerManager('post');
        this.confirmAlert();
      }else{
        this.setState({modalVisible: false, modalTimer: 6})
      }
    })
  }
  async createAlert(){
    console.log("touch")
    this.setState({modalVisible: true},
      ()=>{
        this.updateTimer();
      })
  }

  render(){
    const alertFlex = this.state.alertTriggered===true?0.65:1;
    const cancelFlex = this.state.alertTriggered===true?0.35:1;
    const alertTrigger= {
      backgroundColor: this.state.alertColor,
      flex: alertFlex,
      margin: '5%',
      width:'90%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      elevation: 6,
      overflow: 'hidden',
    };
    const cancelTrigger= {
      backgroundColor: 'lightgrey',
      flex: cancelFlex,
      margin: '5%',
      width:'90%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      elevation: 6,
      overflow: 'hidden',
    };
    const cancelAlert = ()=>{
      if(this.state.alertTriggered===true)
      return(
        <TouchableNativeFeedback
        display={false} 
        style={styles.rootalert} 
        onPress={()=>{this.triggerManager('delete'); this.setState({alertTriggered: false, display: 'ALERT'})}}>
          <View style={cancelTrigger}>
              <Text style={styles.text}>Cancel</Text>
          </View>
        </TouchableNativeFeedback>
      )
      else
      return null
    }
    var something = cancelAlert()
    return(
      <View style={{flex:0.7,flexDirection:'row', width:'100%'}}>
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
                  this.triggerManager('post');
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
        display={false} 
        style={styles.rootalert} 
        onPress={()=>{if(this.state.alertTriggered===false) this.createAlert()}}>
          <View style={alertTrigger}>
              <Text style={styles.text}>{this.state.display}</Text>
          </View>
        </TouchableNativeFeedback>
        {something}
      </View>
    )
  }

}

const styles = StyleSheet.create({
    rootalert:{
        borderRadius: 10,
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