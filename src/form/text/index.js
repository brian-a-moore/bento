import React, { Component } from 'react';
import ErrorMsg from '../error';
import './style.css';

export default class Text extends Component {
	constructor(props) {
		super(props);
		this.text = React.createRef();
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		if(this.props.default !== null && this.props.default !== undefined) {
			this.onChange(this.props.default);
		}
		if(this.props.focus === this.props.name) {
			this.text.current.focus();
		}
	}
	componentDidUpdate(prevProps){
		if(prevProps.reset !== this.props.reset && this.props.reset) {
			this.text.current.value = '';
			this.props.onChange(this.props.name, null);
		}
	}
	onChange(e) {
		let val;
		if(e.target) val = e.target.value;
		else val = e;
		this.props.onChange(this.props.name, val)
	}
	render() {
		return(
			<div className={`react-component-library Text`} style={this.props.style}>
				<input
					ref={this.text}
					type='text'
					autoComplete='off'
					id={this.props.name}
					placeholder={this.props.placeholder}
					maxLength={this.props.maxLength}
					defaultValue={this.props.default}
					name={this.props.name}
					onChange={this.props.onChange ? this.onChange : () => {console.log('No Function Provided...')}}
					/>
				{this.props.isInvalid ? <ErrorMsg> {this.props.errorText} </ErrorMsg> : null}
			</div>
		);
	}
}