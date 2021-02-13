import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback, Dimensions } from 'react-native';
import * as Font from 'expo-font';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Header extends Component{
    state = {
        fontsLoaded: false,
    }
    async loadFonts() {
        // await Font.loadAsync({
        //     LobsterTwo: require('../assets/fonts/Titillium-LightItalic.otf'),
        // });
        this.setState({ fontsLoaded: true });
    }
    componentDidMount() {
        this.loadFonts();
    }
    render(){
        if(this.state.fontsLoaded===true)
        return(
            <View style={styles.headerRoot}>
                <Text style={styles.text}>DefenShe</Text>
            </View>
        )
        else
        return null;
    }

}

const styles = StyleSheet.create({
    headerRoot: {
        flex:1,
        width:windowWidth,
        backgroundColor: '#2F96F3',
        justifyContent: 'flex-end'
    },
    text: {
        marginLeft: 10,
        width: '100%',
        fontWeight: 'bold',
        fontSize: 25,
    }
});