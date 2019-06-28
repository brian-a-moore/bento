import React, { Component } from 'react';
import './style.css';

export default class Card extends Component {
	render() {
		return(
			<div className={`react-component-library Card ${this.props.padded ? 'Padded' : null}`} style={this.props.style}>
				{this.props.children}
			</div>
		);
	}
}