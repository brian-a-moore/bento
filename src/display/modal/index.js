import React, { Component } from 'react';
import Button from '../../button';
import './style.css';

export default class Modal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modal: true
		}

		this.onCancel = this.onCancel.bind(this);
	}
	onCancel() {
		this.setState({ modal: false });
		setTimeout(() => { this.props.cancelFunction(); }, 300);
	}
	render() {
		return(
			<div className={`react-component-library Modal ${this.state.modal ? 'Open' : 'Closed'}`} style={this.props.style}>

				<div className='Box'>

					<h1> {this.props.options.title} </h1>

					<p> {this.props.options.content} </p>

					<div className='actions'>

						{this.props.options.action ?
							<Button onClick={this.props.options.actionFunction} style={button} text={this.props.options.actionText} />
							: null
						}

						<Button secondary style={button} onClick={this.onCancel} text='Cancel' />

					</div>

				</div>

			</div>
		);
	}
}

const button = {
	float: 'right',
	margin: '0 0 0 16px'
}