import React, { Component } from 'react';
import Button from '../../button';
import Card from '../../display/card';
import Row from '../../display/row';
import Col from '../../display/col';
import { MdExpandLess, MdExpandMore, MdCancel } from 'react-icons/md';
import './style.css';

export default class Time extends Component {
	constructor(props) {
		super(props);

		this.state = {
			close: false,
			modal: false,
			hrs: null,
			mins: null
		}

		this.toggleModal = this.toggleModal.bind(this);
		this.convertTime = this.convertTime.bind(this);
		this.isAMPM = this.isAMPM.bind(this);
		this.convertTo12Hour = this.convertTo12Hour.bind(this);
		this.addZero = this.addZero.bind(this);
		this.changeTime = this.changeTime.bind(this);
		this.updateAMPM = this.updateAMPM.bind(this);
	}
	componentDidMount() {
		if(this.props.default) this.convertTime(this.props.default);
		else {
			let d = new Date();
			this.convertTime(`${d.getHours() < 10 ? '0' + d.getHours() : d.getHours()}:${d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()}`);
		}
	}
	componentDidUpdate(prevProps, prevState) {
		if(prevState.hrs !== this.state.hrs || prevState.mins !== this.state.mins) {
			this.props.onChange(this.props.name, `${this.addZero(this.state.hrs)}:${this.addZero(this.state.mins)}:00`);
		}
		if(prevProps.reset !== this.props.reset && this.props.reset) {
			let d = new Date();
			this.convertTime(`${d.getHours() < 10 ? '0' + d.getHours() : d.getHours()}:${d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()}`);			
		}
	}
	toggleModal() {
		this.setState({ close: true });
		setTimeout(() => {
			this.setState(prevState => ({
				close: false,
				modal: !prevState.modal
			}));
		}, 300);

	}
	convertTime(time) {
		let hrs = time.substring(0,3);
		let mins = time.substring(3,5);

		if(hrs.substring(0,1) === '0') hrs = parseInt(hrs.substring(1,2))
		else hrs = parseInt(hrs);

		if(mins.substring(0,1) === '0') mins = parseInt(mins.substring(1,2));
		else mins = parseInt(mins);

		this.setState({ hrs, mins });
	}
	isAMPM(hours) {
		if(hours < 12) return 'AM';
		else return 'PM';
	}
	convertTo12Hour(hours) {
		if(hours === 0) return 12;
		else if(hours <= 12) return hours;
		else return hours - 12;
	}
	addZero(min) {
		if(min < 10) return '0' + min;
		else return min;
	}
	changeTime(dir, type) {
		if(dir === '-') {
			if(type === 'H') {
				if(this.state.hrs === 0) this.setState({ hrs: 23 });
				else this.setState(prevState => ({ hrs: prevState.hrs - 1 }));
			} else {
				if(this.state.mins === 0) this.setState({ mins: 59 });
				else this.setState(prevState => ({ mins: prevState.mins - 1 }));				
			}
		} else {
			if(type === 'H') {
				if(this.state.hrs === 23) this.setState({ hrs: 0 });
				else this.setState(prevState => ({ hrs: prevState.hrs + 1 }));
			} else {
				if(this.state.mins === 59) this.setState({ mins: 0 });
				else this.setState(prevState => ({ mins: prevState.mins + 1 }));				
			}
		}
	}
	updateAMPM(val) {
		if(val ==='AM' && this.state.hrs >= 12) {
			this.setState(prevState => ({ hrs: prevState.hrs - 12 }));
		}
		if(val === 'PM' && this.state.hrs < 12) {
			this.setState(prevState => ({ hrs: prevState.hrs + 12 }));
		}
	}
	render() {
		return(
			<div className={`react-component-library Time ${this.state.close ? 'Close' : null}`}>
				<div onClick={this.toggleModal} className='TimeText'> {`${this.convertTo12Hour(this.state.hrs)}:${this.addZero(this.state.mins)} ${this.isAMPM(this.state.hrs)}`}  </div>
				{this.state.modal ?
					<div className='TimeModal'>
						<div className='TimeBox'>
							<Card>
								<Row>
									<div className='TimeContainer'>
										<div className='ControlPanel'>
											<button onClick={() => {this.changeTime('-', 'H')}}> <MdExpandLess /> </button>
											<div />
											<button onClick={() => {this.changeTime('-', 'M')}}> <MdExpandLess /> </button>
										</div>
										<div className='DisplayPanel'>
											<span> {this.convertTo12Hour(this.state.hrs)} </span>
											<div> : </div>
											<span> {this.addZero(this.state.mins)} </span>
										</div>
										<div className='ControlPanel'>
											<button onClick={() => {this.changeTime('+', 'H')}}> <MdExpandMore /> </button>
											<div />
											<button onClick={() => {this.changeTime('+', 'M')}}> <MdExpandMore /> </button>
										</div>
									</div>
									<div className='AMPMPanel'>
										<Button onClick={() => {this.updateAMPM('AM')}} secondary={ this.isAMPM(this.state.hrs) === 'PM' ? true : false } text='AM' style={{margin: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0}} />
										<Button onClick={() => {this.updateAMPM('PM')}} secondary={ this.isAMPM(this.state.hrs) === 'AM' ? true : false } text='PM' style={{margin: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}  />
									</div>
								</Row>
								<Row padded>
									<Col width={12} padded>
										<Button onClick={this.toggleModal} icon={<MdCancel />} text='Close' secondary style={{float: 'right', margin: '0 0 16px 0'}} />
									</Col>
								</Row>
							</Card>
						</div>
					</div>
				: null}
			</div>
		);
	}
}