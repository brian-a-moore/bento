import React, { Component } from 'react';
import Button from '../../button';
import Card from '../../display/card';
import Row from '../../display/row';
import Col from '../../display/col';
import moment from 'moment';
import { MdChevronLeft, MdChevronRight, MdCancel } from 'react-icons/md';
import './style.css';

export default class Calendar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			close: false,
			modal: false,
			default: null,
			daysInMonth: null,
			firstDayofMonth: null,
			date: null
		}

		this.toggleModal = this.toggleModal.bind(this);
		this.changeSet = this.changeSet.bind(this);
		this.convertToArray = this.convertToArray.bind(this);
		this.isToday = this.isToday.bind(this);
		this.changeDate = this.changeDate.bind(this);
		this.setDefault = this.setDefault.bind(this);
		this.isSelectedDate = this.isSelectedDate.bind(this);
	}
	componentDidMount() {
		if(this.props.default !== undefined && this.props.default !== null) this.setState({ default: this.props.default });
		else this.setState({ default: moment().format('YYYY-MM-DD')});

		this.changeSet(this.props.default ? this.props.default : moment().format('YYYY-MM-DD'));
	}
	componentDidUpdate(prevProps){
		if(prevProps.reset !== this.props.reset && this.props.reset) {
			this.setState({ default: moment().format('YYYY-MM-DD')});
			this.changeSet(moment().format('YYYY-MM-DD'));
			this.props.onChange(this.props.name, moment().format('YYYY-MM-DD'));
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
	changeSet(date) {
		this.setState({
			date,
			daysInMonth: moment(date).daysInMonth(),
			firstDayofMonth: parseInt(moment(`${moment(date).format('YYYY')}-${moment(date).format('MM')}-01`).format('d'))
		});
	}
	convertToArray(number) {
		let arr = [];

		for(let i = 0; i < number; i++) {
			arr.push('x');
		}
		return arr;
	}
	isToday(date) {
		let thisYear = moment().format('YYYY');
		let thisMonth = moment().format('MM');
		let thisDay = moment().format('D');

		if(
			thisYear === moment(this.state.date).format('YYYY') &&
			thisMonth === moment(this.state.date).format('MM') &&
			thisDay == date
		) return true;
		else return false;

	}
	changeDate(dir, type) {
		let date = this.state.date;

		if(dir === '-' && type === 'year') date = moment(date).subtract(1, 'y');
		else if(dir === '+' && type === 'year') date = moment(date).add(1, 'y');
		else if(dir === '-' && type === 'month') date = moment(date).subtract(1, 'M');
		else if(dir === '+' && type === 'month') date = moment(date).add(1, 'M');

		this.changeSet(date);
	}
	setDefault(day) {
		let year = moment(this.state.date).format('YYYY');
		let month = moment(this.state.date).format('MM');

		if(day < 10) day = '0' + day;

		this.setState({
			default: `${year}-${month}-${day}`
		});
		this.props.onChange(this.props.name, `${year}-${month}-${day}`);
		this.toggleModal();
	}
	isSelectedDate(day) {
		let thisYear = moment(this.state.date).format('YYYY');
		let thisMonth = moment(this.state.date).format('MM');
		let thisDay = moment(this.state.default).format('D');

		if(
			thisYear === moment(this.state.default).format('YYYY') &&
			thisMonth === moment(this.state.default).format('MM') &&
			thisDay == day
		) return true;
		else return false;		
	}
	render() {
		return(
			<div className={`react-component-library Calendar ${this.state.close ? 'Close' : null}`}>
				<div onClick={this.toggleModal} className='CalendarText'> {!this.state.default ? '' : moment(this.state.default).format('MM/DD/YYYY')} </div>
				{this.state.modal ?
					<div className='CalendarModal'>
						<div className='CalendarBox'>
							<Card>
								<Row>
									<button className='SetBtns' onClick={() => {this.changeDate('-', 'year')}}> <MdChevronLeft /> </button>
									<div className='Display' style={{fontSize: '18px'}}> {moment(this.state.date).format('YYYY')} </div>
									<button className='SetBtns' onClick={() => {this.changeDate('+', 'year')}}> <MdChevronRight /> </button>
								</Row>
								<Row>
									<button className='SetBtns' onClick={() => {this.changeDate('-', 'month')}}> <MdChevronLeft /> </button>
									<div className='Display'> {moment(this.state.date).format('MMMM')} </div>
									<button className='SetBtns' onClick={() => {this.changeDate('+', 'month')}}> <MdChevronRight /> </button>
								</Row>
								<Row>
									<span className='Day Weekday'> Su </span>
									<span className='Day Weekday'> Mo </span>
									<span className='Day Weekday'> Tu </span>
									<span className='Day Weekday'> We </span>
									<span className='Day Weekday'> Th </span>
									<span className='Day Weekday'> Fr </span>
									<span className='Day Weekday'> Sa </span>
									{this.convertToArray(this.state.firstDayofMonth).map((d, i) => (
										<span className='Day Empty' key={i} />
									))}
									{this.convertToArray(this.state.daysInMonth).map((d, i) => (
										<button onClick={() => {this.setDefault(i + 1)}} key={i} className={this.isSelectedDate(i + 1) ? 'Day SelectedDay' : this.isToday(i + 1) ? 'Day Today' : 'Day NotToday'}> {i + 1} </button>
									))}
								</Row>
								<Row padded>
									<Col width={12} padded>
										<Button onClick={this.toggleModal} icon={<MdCancel />} text='Cancel' secondary style={{float: 'right', margin: '16px 0'}} />
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