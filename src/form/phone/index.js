import React, { Component } from 'react';
import ErrorMsg from '../error';
import './style.css';

export default class Phone extends Component {
	constructor(props) {
		super(props);

		this.state = { number: '' }
		this.phone = React.createRef();
		this.onChange = this.onChange.bind(this);
		this.updateNumber = this.updateNumber.bind(this);
	}
	componentDidMount() {
		if((this.props.default !== null && this.props.default !== undefined) && this.props.default.toString().length <= 10) {
			let val = this.props.default.toString();
			this.updateNumber(val);
			this.props.onChange(this.props.name, val);
		}
		if(this.props.focus === this.props.name) {
			this.phone.current.focus();
		}
	}
	componentDidUpdate(prevProps){
		if(prevProps.reset !== this.props.reset && this.props.reset) {
			this.setState({ number: '' });
			this.phone.current.value = '';
			this.props.onChange(this.props.name, null);
		}
	}
	onChange(e) {
		let val = e.target.value.replace(/\D/g,'').replace(' ', '');
		this.updateNumber(val);
		if(val.length <= 10) {
			this.props.onChange(this.props.name, val);
		}
	}
	updateNumber(val) {
		if(val.length <= 3) this.setState({ number: val });
		else if(val.length > 3 && val.length <= 6) this.setState({ number: `(${val.substring(0,3)}) ${val.substring(3, val.length)}` });
		else if(val.length > 6 && val.length <= 10) this.setState({ number: `(${val.substring(0,3)}) ${val.substring(3,6)}-${val.substring(6, val.length)}` });		
	}
	render() {
		return(
			<div className={`react-component-library Phone`} style={this.props.style}>
				<input
					ref={this.phone}
					type='text'
					placeholder='(###) ###-####'
					value={this.state.number}
					onChange={this.props.onChange ? this.onChange : () => {console.log('No Function Provided...')}}
					name={this.props.name}
					 />
				{this.props.isInvalid ? <ErrorMsg> {this.props.errorText} </ErrorMsg> : null}
			</div>
		);
	}
}