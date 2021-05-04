import {
    AdMobBanner,
    PublisherBanner,
  } from 'expo-ads-admob'
  import React, { Component } from 'react'
  import { SafeAreaView, ScrollView, View } from 'react-native'
  import { Button, Text } from 'react-native'
  
  class AdsScreen extends Component {
    render() {
      return (
        <View>
            <ScrollView>
            <SafeAreaView style={{ margin: 20 }}>
                <Text h2>GOOGLE ADMOB DEMO</Text>
                <Text>
                Set Ad Unit Id, Interstitial Id & Rewarded Id only on the top level
                component once.
                </Text>
                <Text h4>Banner Ad</Text>
                <AdMobBanner bannerSize="mediumRectangle" adUnitID={"ca-app-pub-9152673793842667/1938747877"} />
                <Text h4>Publisher Banner</Text>
                <PublisherBanner bannerSize="banner" adUnitID={"ca-app-pub-9152673793842667/1938747877"} />
            </SafeAreaView>
            </ScrollView>
        </View>
      )
    }
  }
  
  export default AdsScreen;