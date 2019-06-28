import React, { Component } from 'react';
import './style.css';

export default class Col extends Component {
	render() {
		return(
			<div className={`react-component-library Col Width-${this.props.width} ${this.props.padded ? 'Padded' : null}`} style={this.props.style}>
				{this.props.children}
			</div>
		);
	}
}