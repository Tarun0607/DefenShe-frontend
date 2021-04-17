import React from "react";
import Articles from "./list";

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
			<Articles />
		);
	}
}
