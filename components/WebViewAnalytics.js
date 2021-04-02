import React,{Component} from 'react';
import { StyleSheet,View,Dimensions} from 'react-native';
import { WebView } from 'react-native-webview';
const windowWidth = Dimensions.get('window').width;
export default class WebViewAnalytics extends Component{
  render(){
    return(
        <View style={styles.webViewContainer}>        
            <WebView source={{ uri:'https://datastudio.google.com/embed/u/0/reporting/f9915176-47e8-4025-b2b1-68f8c02246b3/page/MKtAC' }} style={styles.webViewBox} />
        </View>
    )
  }
}
const styles = StyleSheet.create({
    webViewContainer:{
        flex:1,
        width: windowWidth+3
    },
    webViewBox:{
        flex:1,
        width: windowWidth+3
    }
});
