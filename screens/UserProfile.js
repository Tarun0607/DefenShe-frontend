import {
  AdMobBanner,
  PublisherBanner,
} from 'expo-ads-admob'
import React, { Component } from 'react'
import HeaderComponent from '../components/HeaderComponent';
import { SafeAreaView, ScrollView, View, StyleSheet, Text, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

export default class UserProfile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}> 
          <HeaderComponent props={this.props}/>
        </View>
        <View style={styles.cardView}> 
          <ScrollView>
          </ScrollView>
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
  cardView:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
  