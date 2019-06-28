import React, { Component } from 'react';
import numeral from 'numeral';
import ErrorMsg from '../error';
import './style.css';

export default class Currency extends Component {
	constructor(props) {
		super(props);

		this.state = { amt: '' }
		this.currency = React.createRef();
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		if(this.props.default !== null && this.props.default !== undefined) {
			this.setState({ amt: numeral(this.props.default).format('$0,0')});
		}
		if(this.props.focus === this.props.name) {
			this.currency.current.focus();
		}
		this.props.onChange(this.props.name, this.props.default);
	}
	componentDidUpdate(prevProps){
		if(prevProps.reset !== this.props.reset && this.props.reset) {
			this.setState({ amt: '' });
			this.currency.current.value = '';
			this.props.onChange(this.props.name, null);
		}
	}
	onChange(e) {
		let val = e.target.value.replace(/\D/g,'');
		if(val.length < 10) this.setState({ amt: numeral(val).format('$0,0')});
		this.props.onChange(this.props.name, val);
	}
	render() {
		return(
			<div className={`react-component-library Currency`}>
				<input
					ref={this.currency}
					type='text'
					placeholder='$0.00'
					value={this.state.amt}
					onChange={this.props.onChange ? this.onChange : () => {console.log('No Function Provided...')}}
					name={this.props.name}
					style={this.props.style}
					 />
				{this.props.isInvalid ? <ErrorMsg> {this.props.errorText} </ErrorMsg> : null}
			</div>
		);
	}
}