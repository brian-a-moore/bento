import React, { Component } from 'react';
import './style.css';

export default class Row extends Component {
	render() {
		return(
			<div className={`react-component-library Row ${this.props.padded ? 'Padded' : null}`} style={this.props.style}>
				{this.props.children}
			</div>
		);
	}
}