import React from 'react';
import './style.css';

const Label = props => (<label className='react-component-library Label' style={props.style}> {props.children.trim()}{props.required ? null : ' (Optional)'}: </label>);

export default Label;