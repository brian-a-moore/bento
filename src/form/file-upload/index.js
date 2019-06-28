import React, { Component } from 'react';
import { MdFileUpload, MdCheck } from 'react-icons/md';
import ErrorMsg from '../error';
import './style.css';

export default class FileUpload extends Component {
	constructor(props) {
		super(props);

		this.state = { name: null }
		this.file = React.createRef();
		this.onChange = this.onChange.bind(this);
		this.stringifyAccept = this.stringifyAccept.bind(this);
	}
	onChange(e) {
		if(e.target.files[0]) {
			this.setState({ name: e.target.files[0].name });
			this.props.onChange(this.props.name, e.target.files[0]);
		}
		if(this.props.focus === this.props.name) {
			this.file.current.focus();
		}
	}
	componentDidUpdate(prevProps){
		if(prevProps.reset !== this.props.reset && this.props.reset) {
			this.file.current.value = null;
			this.setState({ name: null });
			this.props.onChange(this.props.name, null);
		}
	}
	stringifyAccept(input) {
		let response = '';
		for(var key in input) { response = response + '.' + input[key] + ','; }
		return response.substring(0, response.length - 1);
	}
	render() {
		return(
			<div className={`react-component-library FileUpload`} style={this.props.style}>
				<label className={this.state.name ? 'Active' : null} htmlFor={`file_${this.props.id}`}>
					{this.state.name ? <MdCheck /> : <MdFileUpload />}
					<p> {this.state.name ? this.state.name : 'Choose File' } </p>
				</label>
				<input ref={this.file} id={`file_${this.props.id}`} type='file' accept={this.stringifyAccept(this.props.accept)} onChange={this.onChange} />
				{this.props.isInvalid ? <ErrorMsg> {this.props.errorText} </ErrorMsg> : null}
			</div>
		);
	}
}