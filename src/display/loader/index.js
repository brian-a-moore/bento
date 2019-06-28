import React, { Component } from 'react';
import './style.css';

export default class Loader extends Component {
	render() {
		return(
			<div className={`react-component-library Loader`} style={this.props.style}>
				<div className='Circle' />
			</div>
		);
	}
}