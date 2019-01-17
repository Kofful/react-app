import React, { Component } from 'react';
import "./Calendar.sass";
const moment = require('moment');

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weekstart: "",
            weekend: "",
            days: [],
        }
        this.nextWeek = this.nextWeek.bind(this);
    }
    renderDate() {
        this.state.weekstart = moment().startOf('week');
        this.state.weekend = moment().endOf('week'); 
        return (
            <p className="position">{this.state.weekstart.format("ll")} - {this.state.weekend.format("ll")}</p>
        );
    }

    selectDay(e) {
    }

    renderNumbers() {
        const days = []
        for(let i = moment(this.state.weekstart).format("DD"); i <= moment(this.state.weekend).format("DD"); i++)
        {
            this.state.days.push(i);
            days.push(<div>
                <p className="number">{i}</p>
                </div>)
        }
        return (
            <div className="numbers">
            {days}
            </div>
        );
    }

    nextWeek() {
        this.setState({
            weekstart: moment(this.state.weekstart).add(7, "day"),
            weekend: moment(this.state.weekend).add(7, "day")
        })
    }

    render() {
        return (
            <>
                <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" />
                <div className="header">
                    <p className="prev">PREV</p>
                    {this.renderDate()}
                    <p className="next" onClick={this.nextWeek}>NEXT</p>
                </div>
                <div className="days">
                    <p>S</p>
                    <p>M</p>
                    <p>T</p>
                    <p>W</p>
                    <p>T</p>
                    <p>F</p>
                    <p>S</p>
                </div>
                {this.renderNumbers()}
            </>
        );
    }
}

export default Calendar;
