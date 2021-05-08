import React from "react";
import Articles from "./list";
import {View, StyleSheet} from 'react-native';
import {AdMobBanner} from 'expo-ads-admob';
export default class CardView extends React.Component {
	constructor() {
		super();
		this.state = {
			data: null,
			loading: true
		};
	}
	render() {
		return (
			<View style={{alignItems: 'center', width: '100%'}}>
				<View style={styles.ads}>
              		<AdMobBanner servePersonalizedAds={true} bannerSize="largeBanner	" adUnitID={"ca-app-pub-9152673793842667/7730076707"} />
            	</View>
				<Articles />
			</View>
			
		);
	}
}
const styles = StyleSheet.create({
	ads: {
		marginTop: 10,
		width: 320,
	  	overflow: "hidden",
	  	borderRadius: 10,
	  	borderWidth: 1,
	}
  });
