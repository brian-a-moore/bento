import React, { Component } from 'react';
import ErrorMsg from '../error';
import './style.css';

export default class Selector extends Component {
	constructor(props) {
		super(props);

		this.state = { item: null }

		this.onClick = this.onClick.bind(this);
	}
	componentDidMount() {
		if(this.props.default !== null && this.props.default !== undefined) {
			this.setState({ item: this.props.default });
		}
	}
	componentDidUpdate(prevProps, prevState) {
		if(prevState.item !== this.state.item) {
			this.props.onChange(this.props.name, this.state.item);
		}
		if(prevProps.reset !== this.props.reset && this.props.reset) {
			this.setState({ item: this.props.default ? this.props.default : null });
		}
	}
	onClick(id) {
		this.setState({ item: id });
	}
	render() {
		return(
			<div className={`react-component-library Selector`} style={this.props.style}>
				{this.props.data.map((d, i) => (
					<div key={i} className={`Selector-Item ${this.state.item === d[0] ? 'Active' : null}`} onClick={() => { this.onClick(d[0])}}>
						{d[1]}
					</div>
				))}
				{this.props.isInvalid ? <ErrorMsg> {this.props.errorText} </ErrorMsg> : null}
			</div>
		);
	}
}