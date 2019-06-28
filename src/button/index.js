import React, { Component } from 'react';
import './style.css';

export default class Button extends Component {
	constructor(props) {
		super(props);
		this.determineClassName = this.determineClassName.bind(this);

	}
	determineClassName() {
		let className = 'react-component-library Button';

		if(this.props.multi === true) className += ' Multi';
		else if(this.props.icon && !this.props.text) className+= ' Icon';
		else if(this.props.icon && this.props.text) className+= ' IconText';
		else className+= ' Text';

		if(this.props.icon && this.props.rounded) className+= ' Rounded';

		if(this.props.secondary) className+= ' Secondary';
		else if(this.props.transparent) className+= ' Transparent';
		else className+= ' Primary';

		if(this.props.alt) className+= ' Alt';
		if(this.props.white) className+= ' White';

		return className;
	}
	render() {
		return(
			<button
				className={this.determineClassName()}
				disabled={this.props.disabled}
				style={this.props.style}
				onClick={this.props.onClick ? this.props.onClick  : () => { console.log('No Function Provided...')}}>
					{this.props.icon && this.props.multi !== true ? <div className='IconContainer'> {this.props.icon} </div> : null}
					{this.props.multi ? <p> {this.props.text} </p> : <span> {this.props.text} </span>}
			</button>
		);
	}
}