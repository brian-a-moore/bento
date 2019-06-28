import React from 'react';
import './style.css';

const ErrorMsg = props => (
	<span className='react-component-library ErrorMsg'> {props.children} </span>
);

export default ErrorMsg;