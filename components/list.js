import React, { Component } from "react";
import { FlatList, ActivityIndicator, View } from "react-native";
import {themeStyle } from "../src/config";
import Card from "./card";

export default class Articles extends Component {
	state = {
		data: [],
		loaded: false
	};
	componentDidMount() {
		this.fetchData();
	}

	fetchData = async () => {
		const response = await fetch('http://defenshe.azurewebsites.net/feed/fetch');
		const json = await response.json();
		this.setState({
			loaded: true,
			data: json
		});
	};

	_keyExtractor = (item, index) => index.toString();

	_renderItem = ({ item, index }) => (
		<Card
			publish={item.date}
			image={item.imageUri}
			title={item.title}
			url={item.url}
			index={index}
		/>
	);

	render() {
		const view = this.state.loaded ? (
			<FlatList
				data={this.state.data}
				keyExtractor={this._keyExtractor}
				renderItem={this._renderItem}
			/>
		) : (
			<View style={themeStyle.spinnerHolder}>
				<ActivityIndicator color="#538ae4" />
			</View>
		);
		return view;
	}
}
