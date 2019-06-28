import React, { Component } from 'react';
import ErrorMsg from '../error';
import './style.css';

export default class Number extends Component {
	constructor(props) {
		super(props);
		this.number = React.createRef();
		this.state = { val: null }
	}
	componentDidMount() {
		if((this.props.default !== null && this.props.default !== undefined)) {
			let def = parseInt(this.props.default);

			if(def >= this.props.min && def <= this.props.max) {
				this.setState({ val: this.props.default });
			}

			if(this.props.focus === this.props.name) {
				this.number.current.focus();
			}

			this.props.onChange(this.props.name, this.props.default);
		}
	}
	componentDidUpdate(prevProps){
		if(prevProps.reset !== this.props.reset && this.props.reset) {
			this.setState({ val: null })
			this.number.current.value = '';
			this.props.onChange(this.props.name, null);
		}
	}
	render(){
		return(
			<div className={`react-component-library Number`}>
				<input
					ref={this.number}
					type='number'
					placeholder={this.props.placeholder}
					min={this.props.min}
					max={this.props.max}
					value={this.state.val}
					onChange={this.props.onChange ? this.onChange : () => {console.log('No Function Provided...')}}
					name={this.props.name}
					style={this.props.style}
					 />
				{this.props.isInvalid ? <ErrorMsg> {this.props.errorText} </ErrorMsg> : null}
			</div>
		);
	}
}