import React, { Component } from 'react'
import HeaderComponent from '../components/HeaderComponent';
import {View, StyleSheet, Text, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
import contactData from '../mocks/contact.json'
import Profile from '../components/profile/Profile';
export default class UserProfile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}> 
          <HeaderComponent props={this.props}/>
        </View>
        <View style={styles.cardView}> 
            <Profile {...contactData} />
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
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
  