import React, { Component } from 'react'
import { Card, Icon } from 'react-native-elements'
import {Image, PixelRatio, ImageBackground,TouchableHighlight, Platform, ScrollView, StyleSheet, Text, View, Dimensions, LogBox,Modal, TextInput, TouchableNativeFeedback } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as Font from 'expo-font';
import Email from './Email'
import Separator from './Separator'
import Tel from './Tel'
import {VCCredentials} from '../../config/config';
import SvgQRCode from 'react-native-qrcode-svg';
const windowWidth = Dimensions.get('window').width;
import axios from 'axios';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
  const newSize = size * scale 
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}
const styles = StyleSheet.create({
  creditView: {
    marginTop: 20,
    marginBottom: 20,
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  creditPlate: {
    width: "60%",
    height: 100,
    borderRadius: 10,
    backgroundColor: 'rgb(122, 184, 240)',
    elevation: 10,
    overflow: 'hidden'
  },
  creditFeedbackView: {
    flex: 1,
  },
  creditTextView: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  creditScore: {
    flex: 0.5,
    textAlign: 'center',
    fontSize: normalize(42),
    fontFamily: 'LobsterTwo',
    color: 'black',
  },
  creditLabel: {
    padding: 10,
    flex: 0.5,
    textAlign: 'left',
    fontSize: normalize(16),
    fontFamily: 'sans-serif-medium',
    color: 'black',
  },
  verificationWarning:{
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  verificationWarningText:{
    fontSize: 15,
    backgroundColor: 'rgba(255, 45, 0, 0.6)',
    fontWeight: '500',
    borderRadius: 5,
    textAlign: 'center',
    width: '90%'
  },
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45,
  },
  headerContainer: {
    width: windowWidth,
  },
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  headerRowOne: {
    flexDirection: 'row',
    width: '100%',
  },
  editIcon: {
    backgroundColor: "rgba(245,245,245,0.2)",
    padding: 10,
    borderRadius: 20,
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityText: {
    margin: 5,
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    paddingLeft: 3,
  },
  userImage: {
    marginLeft: "30%",
    marginHorizontal: 'auto',
    borderColor: '#FFF',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: "40%",
  },
  userNameText: {
    width: '100%',
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
  modalView: {
      flex:0.8,
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
  QRModalView: {
      height: Dimensions.get('window').height/2,
      width: Dimensions.get('window').width/1.2,
      alignSelf: 'center',
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
  modalScroll: {
    flex:1,
  },
  modalButtons: {
    flex:0.2,
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
  formContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  formInput: {
    width: "90%",
    height: 44,
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    backgroundColor: 'rgba(240,240,240,0.5)',
    fontWeight: '700'
  },
})

class Profile extends Component {
  state={
    modalVisible: false,
    isUpdated: false,
    deviceID: "",
    credit: 0,
    creditConnected: false,
    accessToken: "",
    did: "",
    isAffinidiLogged: false,
    hasUnsignedVC: false,
    qrModal: false,
    unsignedVC: {},
    QRValue: ""
  }
  async loadFonts() {
    await Font.loadAsync({
        'LobsterTwo': require('../../assets/fonts/LobsterTwo-Bold.otf'),
    });
    this.setState({ fontsLoaded: true });
  }

  AffinidiAccessTokenGenerator = async ()=>{
    var requestOptions = {
      method: 'POST',
      url: "https://cloud-wallet-api.prod.affinity-project.org/api/v1/users/login",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": VCCredentials.ApiHash,
      },
      data: VCCredentials.data
    };
    axios(requestOptions)
    .then((response)=>{
      this.setState(response.data);
      this.setState({isAffinidiLogged: true},()=>{
        this.generateUnsignedVC();
      });
    })
    .catch((err)=>{
      this.setState({isAffinidiLogged: false});
    })
  }

  fetchCredits= async ()=>{
    const deviceID = await SecureStore.getItemAsync("deviceID");
    this.setState({deviceID},()=>{
      var requestOptions = {
        method: 'GET',
        url: "https://defenshe.azurewebsites.net/credit/"+this.state.deviceID,
        headers: {
          "Content-Type": "application/json",
        }
      };
      axios(requestOptions)
      .then((response)=>{
        this.setState(response.data,()=>{
          setTimeout(this.fetchCredits, 10000);
        })
      })
      .catch((err)=>{
        console.log(err);
      })
    });
  }

  generateUnsignedVC = async ()=>{
    var body = {
      "type":"PhoneCredentialPersonV1",
      "data":{
          "@type":["Person", "PersonE", "PhonePerson"],
          "deviceID": this.state.deviceID,
          "name": this.state.name,
          "credit": this.state.credit,
          "email": this.state.email,
          "mobile": this.state.mobile
          },
      "holderDid":this.state.did,
    }
    var requestOptions = {
      method: 'POST',
      url: 'https://affinity-issuer.prod.affinity-project.org/api/v1/vc/build-unsigned',
      headers: { 
        'Api-Key': VCCredentials.ApiHash, 
        'Content-Type': 'application/json'
      },
      data : body
    };
    if(this.state.isAffinidiLogged===true){
      axios(requestOptions)
      .then((response)=>{
        this.setState({hasUnsignedVC: true, unsignedVC: response.data, QRValue: response.data.unsignedVC.holder.id});
      })
      .catch((err)=>{
        console.log("err")
        this.setState({hasUnsignedVC: false});
      })
    }
  }

  componentDidMount = async ()=>{
    await this.loadFonts();
    let result = await SecureStore.getItemAsync("isUpdated");
    if (result) {
      this.setState({isUpdated: true});
      let name = await SecureStore.getItemAsync("name");
      let email = await SecureStore.getItemAsync("email");
      let mobile = await SecureStore.getItemAsync("mobile");
      let address = await SecureStore.getItemAsync("address");
      let city = await SecureStore.getItemAsync("city");
      let country = await SecureStore.getItemAsync("country");
      let zipcode = await SecureStore.getItemAsync("zipcode");
      this.setState({name, email, mobile, address, city, country, zipcode});
    }
    this.fetchCredits();
    await this.AffinidiAccessTokenGenerator();
  }

  submitForm= async ()=>{
    var requestOptions = {
      method: 'POST',
      url: "https://defenshe.azurewebsites.net/credit/",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({deviceID:this.state.deviceID,name:this.state.name, credit:0}),
    };
    axios(requestOptions)
    this.setState({isUpdated: true});
    SecureStore.setItemAsync("isUpdated","true");
    SecureStore.setItemAsync("name",this.state.name);
    SecureStore.setItemAsync("email",this.state.email);
    SecureStore.setItemAsync("mobile",this.state.mobile);
    SecureStore.setItemAsync("address",this.state.address);
    SecureStore.setItemAsync("city",this.state.city);
    SecureStore.setItemAsync("country",this.state.country);
    SecureStore.setItemAsync("zipcode",this.state.zipcode);
    await this.generateUnsignedVC();
  }
  renderHeader = () => {
    const {
      avatar,
      avatarBackground,
    } = this.props;
    const {
      name,
      city, 
      country
    } = this.state.isUpdated?this.state:this.props
    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{uri: avatarBackground}}
        >
          <View style={styles.headerColumn}>
            <View style={styles.headerRowOne}> 
              <Image
                style={styles.userImage}
                source={{uri: avatar}}
              />
              <Icon
                name="edit"
                color="white"
                iconStyle={styles.editIcon}
                onPress={()=>{this.setState({modalVisible: true})}}
              />
            </View>
            <Text style={styles.userNameText}>{name} </Text>
            <View style={styles.userAddressRow}>
                <Icon
                  name="place"
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                />
                <Text style={styles.userCityText}>{city}, {country}  </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }
  renderCredit =() =>{
    if(this.state.creditConnected===true){
      if(this.state.fontsLoaded===true)
      return(
        <View style={styles.creditView}>
          <View style={styles.creditPlate}>
            <TouchableNativeFeedback 
            style={styles.creditFeedbackView}
            onPress={()=>{
              this.setState({qrModal: true});
            }}>
              <View style={styles.creditTextView}>
                <Text style={styles.creditScore}>{this.state.credit}</Text>
                <Text style={styles.creditLabel}>DEFENSHE CREDITS</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      )
      else
      return(
        <View style={styles.creditView}>
          <View style={styles.creditPlate}>
          </View>
        </View>
      )
    }else{
      return(
        <View style={styles.verificationWarning}>
          <Text style={styles.verificationWarningText}>Update your profile to set-up credit profile </Text>
        </View>
      )
    }
    
  }
  renderTel = () => {
    const name="mobile";
    const {
      mobile
    } = this.state.isUpdated?this.state:this.props;
    return (
      <Tel
        name={name}
        number={mobile}
      />
    )
  }

  renderEmail = () => {
    const name="email";
    const {
      email
    } = this.state.isUpdated?this.state:this.props;
    return(
      <Email
        name={name}
        email={email}
      />
    )   
  }

  renderVerificationWarning =() =>{
    if(this.state.creditConnected===true)
    return(
      <View 
      style={styles.verificationWarning}>
        <Text style={styles.verificationWarningText}>You need to verify your Identity to get monetized. </Text>
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <ScrollView style={styles.modalScroll}>
                  <View style={styles.formContainer}>
                    <TextInput
                      value={this.state.name}
                      onChangeText={(name) => this.setState({ name })}
                      placeholder={'Name'}
                      style={styles.formInput}
                    />
                    <TextInput
                      value={this.state.mobile}
                      onChangeText={(mobile) => this.setState({ mobile })}
                      placeholder={'Mobile'}
                      style={styles.formInput}
                    />
                    <TextInput
                      value={this.state.email}
                      onChangeText={(email) => this.setState({ email })}
                      placeholder={'Email'}
                      style={styles.formInput}
                    />
                    <TextInput
                      value={this.state.address}
                      onChangeText={(address) => this.setState({ address })}
                      placeholder={'Address Line 1'}
                      style={styles.formInput}
                    />
                    <TextInput
                      value={this.state.city}
                      onChangeText={(city) => this.setState({ city })}
                      placeholder={'City'}
                      style={styles.formInput}
                    />
                    <TextInput
                      value={this.state.country}
                      onChangeText={(country) => this.setState({ country })}
                      placeholder={'Country'}
                      style={styles.formInput}
                    />
                    <TextInput
                      value={this.state.zipcode}
                      onChangeText={(zipcode) => this.setState({ zipcode })}
                      placeholder={'Zipcode'}
                      style={styles.formInput}
                    />
                  </View>
                  <View style={styles.modalButtons}>
                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                    onPress={() => {
                      this.submitForm();
                      this.setState({modalVisible: false})
                    }}>
                    <Text style={styles.textStyle}>Update</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                    onPress={() => {
                      this.setState({modalVisible: false})
                    }}>
                    <Text style={styles.textStyle}>Cancel</Text>
                  </TouchableHighlight>
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
          <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.qrModal}>
            <View style={styles.centeredView}>
              <View style={styles.QRModalView}>
              <Text style={{fontSize: normalize(17), marginBottom: 8}}>Scan QR to verify VC</Text>
              <SvgQRCode value={this.state.QRValue?this.state.QRValue:"null"} size={280}/>
              <Icon
                name="close"
                color="white"
                size={60}
                iconStyle={{marginTop:20, backgroundColor: 'black', borderRadius: 30}}
                onPress={()=>{this.setState({qrModal: false})}}
              />
              </View>
            </View>
          </Modal>
          <Card containerStyle={styles.cardContainer}>
            {this.renderHeader()}
            {this.renderTel()}
            {Separator()}
            {this.renderEmail()}
            {Separator()}
            {this.renderCredit()}
            {this.renderVerificationWarning()}
          </Card>
        </View>
      </ScrollView>
    )
  }
}

export default Profile;
