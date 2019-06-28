import React, { Component } from 'react';
import ErrorMsg from '../error';
import './style.css';

export default class Toggle extends Component {
	constructor(props) {
		super(props);

		this.state = { val: null }

		this.onClick = this.onClick.bind(this);
	}
	componentDidMount() {
		if(this.props.default !== null && this.props.default !== undefined) {
			this.setState({ val: this.props.default });
		} else {
			this.setState({ val: false });
		}
	}
	componentDidUpdate(prevProps, prevState) {
		if(prevState.val !== this.state.val) {
			this.props.onChange(this.props.name, this.state.val);
		}
		if(prevProps.reset !== this.props.reset && this.props.reset) {
			this.setState({ val: this.props.default ? this.props.default : null });
		}
	}
	onClick() {
		this.setState(prevState => {
			if(prevState.val === false) return({ val: true});
			else return({ val: false });
		});
	}
	render() {
		return(
			<div className={`react-component-library Toggle ${this.state.val === false ? 'Inactive' : 'Active'}`} style={this.props.style}>
				<div className='Container' onClick={this.onClick}>
					<div className='Block' />
				</div>
				{this.props.isInvalid ? <ErrorMsg> {this.props.errorText} </ErrorMsg> : null}
			</div>
		);
	}
}