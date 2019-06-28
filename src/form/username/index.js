import React, { Component } from 'react';
import { MdPerson } from 'react-icons/md';
import ErrorMsg from '../error';
import './style.css';

export default class Username extends Component {
	constructor(props) {
		super(props);
		this.username = React.createRef();
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		if(this.props.focus === this.props.name) {
			this.username.current.focus();
		}
	}
	componentDidUpdate(prevProps){
		if(prevProps.reset !== this.props.reset && this.props.reset) {
			this.username.current.value = '';
			this.props.onChange(this.props.name, null);
		}
	}
	onChange(e) {
		this.props.onChange(this.props.name, e.target.value)
	}
	render() {
		return(
			<div className={`react-component-library Username`} style={this.props.style}>
				<MdPerson />
				<input
					ref={this.username}
					type='text'
					placeholder='LAN ID'
					name={this.props.name}
					onChange={this.props.onChange ? this.onChange : () => {console.log('No Function Provided...')}}
				/>
				{this.props.isInvalid ? <ErrorMsg> {this.props.errorText} </ErrorMsg> : null}
			</div>
		);
	}
}