import React,{Component} from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ScrollView} from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import { WebView } from 'react-native-webview';
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
        <View style={{flex:1}}> 
        <WebView source={{ uri:'https://datastudio.google.com/embed/u/0/reporting/f9915176-47e8-4025-b2b1-68f8c02246b3/page/MKtAC' }} style={{ flex:1 }} />
        </View>
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
  textView:{
    flex: 1,
  },
  textFont: {
    alignSelf: 'center',
    fontSize: 30,
  }
});
