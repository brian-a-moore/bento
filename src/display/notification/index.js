import React, { Component } from 'react';
import { MdWarning, MdLightbulbOutline, MdCheckCircle } from 'react-icons/md';
import './style.css';

export default class Notification extends Component {
	constructor(props) {
		super(props);

		this.state = {
			notification: true
		}

		this.renderIcon = this.renderIcon.bind(this);
		this.clearNotification = this.clearNotification.bind(this);
	}
	componentDidMount() {
		setTimeout(() => { this.clearNotification()}, this.props.duration);
	}
	clearNotification() {
		this.setState({ notification: false });
		setTimeout(() => { this.props.clearNotification()}, 300);
	}
	renderIcon() {
		switch(this.props.notification.type) {
			case 'error': return <MdWarning />;
			case 'info': return <MdLightbulbOutline />;
			case 'success': return <MdCheckCircle />;
			default: return null;
		}
	}
	render() {
		return(
			<div className={`react-component-library Notification ${this.state.notification ? 'Open' : 'Closed'} ${this.props.notification.type}`} style={this.props.style}>
				<div className='Icon-Container'>
					{this.renderIcon()}
				</div>
				<div className='Text-Container'>
					<p> {this.props.notification.msg} </p>
				</div>
			</div>
		);
	}
}