import React,{Component} from 'react';
import { StyleSheet,View,Dimensions} from 'react-native';
import { WebView } from 'react-native-webview';
const windowWidth = Dimensions.get('window').width;
export default class WebViewAnalytics extends Component{
  render(){
    return(
        <View style={styles.webViewContainer}>        
            <WebView source={{ uri:'https://datastudio.google.com/embed/reporting/3229b48b-80be-4486-a2bd-05f59ef0a35c/page/qh7AC' }} style={styles.webViewBox} />
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
