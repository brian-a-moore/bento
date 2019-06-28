import React, { Component } from 'react';
import ErrorMsg from '../error';
import './style.css';

export default class Area extends Component {
	constructor(props) {
		super(props);
		this.area = React.createRef();
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		if(this.props.default !== null && this.props.default !== undefined) {
			this.onChange(this.props.default);
		}
		if(this.props.focus === this.props.name) {
			this.area.current.focus();
		}
	}
	componentDidUpdate(prevProps){
		if(prevProps.reset !== this.props.reset && this.props.reset) {
			this.area.current.value = '';
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
			<div className={`react-component-library Area`}>

				<textarea
					ref={this.area}
					placeholder={this.props.placeholder}
					defaultValue={this.props.default ? this.props.default : null}
					onChange={this.props.onChange ? e => {this.onChange(e)} : () => {console.log('No Function Provided...')}}
					name={this.props.name}
					maxLength={this.props.maxLength}
					style={this.props.style} />
				{this.props.isInvalid ? <ErrorMsg> {this.props.errorText} </ErrorMsg> : null}
			</div>
		);
	}
}