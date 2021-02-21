import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback, Dimensions } from 'react-native';
import * as Font from 'expo-font';
import {FontAwesome5} from '@expo/vector-icons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Header extends Component{
    state = {
        fontsLoaded: false,
    }
    async loadFonts() {
        await Font.loadAsync({
            'Pacifico': require('../assets/fonts/Pacifico.ttf'),
        });
        this.setState({ fontsLoaded: true });
    }
    componentDidMount() {
        this.loadFonts();
    }
    render(){
        if(this.state.fontsLoaded===true)
        return(
            <View style={styles.headerRoot}>
                <FontAwesome5 onPress={()=>{this.props.props.navigation.toggleDrawer()}}style={styles.icon} size={30} name="bars" color="white"/>
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
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    text: {
        fontSize: 25,
        fontFamily: 'Pacifico',
    },
    icon: {
        alignItems: 'flex-end',
        position: 'absolute',
        right: 20,
        bottom: 6,
    }
});