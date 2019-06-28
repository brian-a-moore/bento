import React, { Component } from 'react';
import { MdAdd, MdRemove } from 'react-icons/md';
import Button from '../../button';
import numeral from 'numeral';
import ErrorMsg from '../error';
import './style.css';

export default class Stepper extends Component {
	constructor(props) {
		super(props);

		this.state = { value: null }

		this.doStep = this.doStep.bind(this);
		this.displayValue = this.displayValue.bind(this);

	}
	componentDidMount() {
		if(this.props.default || this.props.default === 0) {
			this.setState({ value: this.props.default });
		}
	}
	componentDidUpdate(prevProps, prevState) {
		if(prevState.value !== this.state.value) {
			this.props.onChange(this.props.name, this.state.value);
		}
		if(prevProps.reset !== this.props.reset && this.props.reset) {
			this.setState({ value: this.props.default });
		}
	}
	doStep(dir) {
		if(dir === 'sub' && this.state.value - this.props.step >= this.props.min) {
			this.setState(prevState => ({ value: prevState.value - this.props.step }));
		}

		if(dir === 'add' && this.state.value + this.props.step <= this.props.max) {
			this.setState(prevState => ({ value: prevState.value + this.props.step }));
		}
	}
	displayValue() {
		if(this.state.value || this.state.value === 0) {
			if(this.props.mask === undefined || this.props.mask === null) return this.state.value;
			else if (this.props.mask === '%') return this.state.value.toString() + this.props.mask;
			else if (this.props.mask === '$') return numeral(this.state.value).format('$0,0.00');
			else return this.state.value;
		} else {
			return '';
		}
	}
	render() {
		return(
			<div className={`react-component-library Stepper`} style={this.props.style}>

				<Button icon={<MdRemove />} onClick={() => {this.doStep('sub')}} style={buttonLeft} />

				<div className='Display'> {this.displayValue()} </div>

				<Button icon={<MdAdd />} onClick={() => {this.doStep('add')}} style={buttonRight} />
				{this.props.isInvalid ? <ErrorMsg> {this.props.errorText} </ErrorMsg> : null}
			</div>
		);
	}
}

const buttonLeft = {
	float: 'left',
	margin: '0 16px 0 0'
}

const buttonRight = {
	float: 'left',
	margin: '0 0 0 16px'
}