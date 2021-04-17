import React from "react";
import { Container } from "native-base";
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
			<Container>
				<Articles />
			</Container>
		);
	}
}
