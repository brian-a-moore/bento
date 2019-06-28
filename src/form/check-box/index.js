import React, { Component } from 'react';
import { MdCheck } from 'react-icons/md';
import ErrorMsg from '../error';
import './style.css';

export default class CheckBox extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: []
		}

		this.onClick = this.onClick.bind(this);
	}
	componentDidMount() {
		if(this.props.default !== null && this.props.default !== undefined) {
			this.setState({ items: this.props.default });
		}
	}
	componentDidUpdate(prevProps, prevState) {
		if(prevState.items !== this.state.items) {
			this.props.onChange(this.props.name, this.state.items);
		}
		if(prevProps.reset !== this.props.reset && this.props.reset) {
			this.setState({ items: this.props.default ? this.props.default : [] });
			this.props.onChange(this.props.name, this.props.default ? this.props.default : null);
		}
	}
	onClick(id) {
		let items = [...this.state.items];

		if(items.includes(id)) {
			items = items.filter(val => {
				return val !== id
			});
		} else {
			items.push(id);
		}

		this.setState({ items });
	}
	render() {
		return(
			<div className={`react-component-library CheckBox`}>
				{this.props.data.map((d, i) => (
					<div key={i} className={`CheckBox-Item ${this.state.items.includes(d[0]) ? 'Active' : null}`} onClick={() => {this.onClick(d[0])}} style={this.props.style}>
						<div className='Box'>
							<span> {this.state.items.includes(d[0]) ? <MdCheck /> : null} </span>
						</div>
						<span className='Text'> {d[1]} </span>
					</div>
				))}
				{this.props.isInvalid ? <ErrorMsg> {this.props.errorText} </ErrorMsg> : null}
			</div>
		);
	}
}