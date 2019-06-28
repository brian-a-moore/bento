import React, { Component } from 'react';
import ErrorMsg from '../error';
import './style.css';

export default class DropDown extends Component {
	constructor(props) {
		super(props);

		this.dropdown = React.createRef();
	}
	componentDidMount() {
		if(this.props.default !== null && this.props.default !== undefined) {
			this.props.onChange(this.props.name, this.props.default);
		}
		if(this.props.focus === this.props.name) {
			this.dropdown.current.focus();
		}
	}
	componentDidUpdate(prevProps){
		if(prevProps.reset !== this.props.reset && this.props.reset) {
			this.dropdown.current.value = this.props.default ? this.props.default : 'X';
			this.props.onChange(this.props.name, this.props.default ? this.props.default : null);
		}
	}
	render() {
		return(
			<div className={`react-component-library DropDown`} style={this.props.style}>
				<select ref={this.dropdown} id={this.props.name} name={this.props.name} defaultValue={this.props.default !== null || this.props.default !== undefined ? this.props.default : 'X'} onChange={e => {
					if(e.target.value !== 'X') {
						this.props.onChange(this.props.name, e.target.value);
					} else {
						this.props.onChange(this.props.name, null);
					}
				}}>
					<option value='X' hidden> {`(Select ${this.props.title})`} </option>
					{this.props.data.map((d, i) => (
						<option key={i} value={d[0]}> {d[1]} </option>
					))}
				</select>
				{this.props.isInvalid ? <ErrorMsg> {this.props.errorText} </ErrorMsg> : null}
			</div>
		);
	}
}