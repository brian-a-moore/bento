import React, { Component } from 'react';
import './style.css';

export default class Site extends Component {
	render() {
		return(
			<div className={`react-component-library Site`} style={this.props.style}>
				{this.props.children}
			</div>
		);
	}
}