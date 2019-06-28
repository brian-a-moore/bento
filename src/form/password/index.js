import React, { Component } from 'react';
import { MdVpnKey, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import ErrorMsg from '../error';
import './style.css';

export default class Password extends Component {
	constructor(props) {
		super(props);

		this.state = { show: false }
		this.password = React.createRef();
		this.toggleVisibility = this.toggleVisibility.bind(this);
		this.onChange = this.onChange.bind(this);
	}
	toggleVisibility() {
		this.setState(prevState => ({
			show: !prevState.show
		}))
	}
	componentDidMount() {
		if(this.props.focus === this.props.name) {
			this.password.current.focus();
		}
	}
	componentDidUpdate(prevProps){
		if(prevProps.reset !== this.props.reset && this.props.reset) {
			this.setState({ show: false });
			this.password.current.value = '';
			this.props.onChange(this.props.name, null);
		}
	}
	onChange(e) {
		this.props.onChange(this.props.name, e.target.value)
	}
	render() {
		return(
			<div className={`react-component-library Password`} style={this.props.style}>
				<MdVpnKey />
				<input
					ref={this.password}
					type={this.state.show ? 'text' : 'password'}
					placeholder='Password'
					onChange={this.props.onChange ? this.onChange : () => {console.log('No Function Provided...')}}
					/>
				<button onClick={this.toggleVisibility}>
					{this.state.show ? <MdVisibilityOff /> : <MdVisibility />}
				</button>
				{this.props.isInvalid ? <ErrorMsg> {this.props.errorText} </ErrorMsg> : null}
			</div>
		);
	}
}