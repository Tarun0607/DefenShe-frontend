import React, { Component } from "react";
import {
	Text,
	Image,
	Dimensions,
	TouchableWithoutFeedback,
	Animated,
	View,
	Linking
} from "react-native";
import { ImagePlaceHolder, themeStyle } from "../src/config";

export default class Card extends Component {
	state = {
		width: Dimensions.get("window").width,
		fadeAnim: new Animated.Value(0),
		transAnim: new Animated.Value(0),
		scaleAnim: new Animated.Value(1)
	};

	publishDate = date => {
		return new Date(date)
			.toISOString()
			.slice(0, 10)
			.replace(/-/g, "/");
	};

	_onLoad = () => {
		Animated.timing(this.state.fadeAnim, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true
		}).start();
	};

	_onPressIn = () => {
		Animated.timing(this.state.scaleAnim, {
			toValue: 0.95,
			duration: 500,
			useNativeDriver: true
		}).start();
		Linking.openURL(this.props.url);
	};

	_onPressOut = () => {
		Animated.timing(this.state.scaleAnim, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true
		}).start();
	};

	componentDidMount() {
		Animated.timing(this.state.transAnim, {
			toValue: 1,
			duration: 500,
			delay: this.props.index * 100,
			useNativeDriver: true
		}).start();
	}

	render() {
		return (
			<Animated.View
				style={[
					themeStyle.container,
					{
						transform: [
							{
								translateY: this.state.transAnim.interpolate({
									inputRange: [0, 1],
									outputRange: [700, 1]
								})
							},
							{
								scale: this.state.scaleAnim
							}
						]
					}
				]}
			>
				<TouchableWithoutFeedback
					//onPressIn={e => this._onPressIn(e)}
					//onPressOut={e => this._onPressOut(e)}
					style={[
						themeStyle.thumbnailHolder,
						{
							height: this.state.width * 9 / 16
						}
					]}
				>
					<Animated.Image
						style={[
							themeStyle.thumbnail,
							{
								height: this.state.width * 9 / 16,
								opacity: this.state.fadeAnim
							}
						]}
						source={{
							cache: "force-cache",
							uri:
								this.props.image != null ? this.props.image : ImagePlaceHolder
						}}
						onLoad={e => this._onLoad(e)}
					/>
				</TouchableWithoutFeedback>
				<View style={themeStyle.details}>
					<Text style={themeStyle.source}>{this.props.source}</Text>
					<Text style={themeStyle.publishDate}>
						{this.publishDate(this.props.publish)}
					</Text>
				</View>
				<Text style={themeStyle.title}>{this.props.title}</Text>
			</Animated.View>
		);
	}
}
