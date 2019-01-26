import React, {Component} from 'react';
import "./Calendar.sass";

const moment = require('moment');

class Calendar extends Component {
    constructor(props) {
        super(props);
        const weekstart = moment().startOf('week');
        const weekend = moment().endOf('week');
        this.state = {
            weekstart: weekstart,
            weekend: weekend,
            selectedDay: moment(),
            showMonth: false,
            month: 0,
            showButtons: true
        };
        this.showWeek = this.showWeek.bind(this);
        this.showMonth = this.showMonth.bind(this);
        this.today = this.today.bind(this);
        this.nextWeek = this.nextWeek.bind(this);
        this.prevWeek = this.prevWeek.bind(this);
        this.renderNumbers = this.renderNumbers.bind(this);
        this.arrowClick = this.arrowClick.bind(this);
    }


    renderDate() {
        return (
            <p className="position">{
                (`${moment(this.state.weekstart).format("MMM D")} - ${moment(this.state.weekend).format("MMM D")}`)}</p>
        );
    }

    showWeek() {
        this.setState({
            showMonth: false,
            showButtons: false,
            weekstart: this.state.weekstart.clone().startOf("week"),
            weekend: this.state.weekstart.clone().endOf("week")
        })
    }

    showMonth() {
        this.setState({
            showMonth: true,
            showButtons: false,
            weekstart: this.state.weekstart.clone().startOf("month"),
            weekend: this.state.weekstart.clone().endOf("month")
        })
    }

    arrowClick() {
        this.setState({showButtons: !this.state.showButtons})
    }

    renderList() {
        return (
            <div className={this.state.showButtons ? "arrow-up" : "arrow"} onClick={this.arrowClick}>
            </div>
        );
    }

    selectDay(e) {
        this.setState({selectedDay: moment(e.target.id)});
    }


    static getDays(weekstart, weekend) {
        const days = [];
        const currentDay = weekstart.clone();
        while (!moment(weekend).isBefore(currentDay)) {
            const day = moment(currentDay);
            days.push(day);
            currentDay.add(1, "day");
        }
        return days;
    }

    renderNumbers(weekstart, weekend, month) {
        return (
            Calendar.getDays(weekstart, weekend).map(item => (
                <div className={"number"}
                     style={(item.format("YYYYMMDD") === this.state.selectedDay.format("YYYYMMDD")) ?
                         {backgroundColor: "#0B3157", borderRadius: "7px"} : {}
                     }>
                    <p onClick={(e) => this.selectDay(e)} id={item.format("YYYY-MM-DD")}
                       style={item.format("YYYYMMDD") === moment().format("YYYYMMDD") ?
                           {color: "#f06543"} :
                           (item.format("YYYYMMDD") === this.state.selectedDay.format("YYYYMMDD")) ?
                               {color: "white"} : month === 0 ?
                               {color: "#0B3157"} : item.format("MM") !== month ?
                                   {color: "#CCCCCC"} : {color: "#0B3157"}
                       }>
                        {item.format("DD")}</p>
                </div>
            ))
        )
    }

    prevWeek() {
        const prop = this.state.showMonth ? "month" : "week";
        this.setState({
            weekend: moment(this.state.weekend).clone().subtract(1, prop),
            weekstart: moment(this.state.weekstart).clone().subtract(1, prop)
        });
    }

    today() {
        const prop = this.state.showMonth ? "month" : "week";
        this.setState({
            weekend: moment().endOf(prop),
            weekstart: moment().startOf(prop),
            showButtons: false,
        });
    }

    nextWeek() {
        const prop = this.state.showMonth ? "month" : "week";
        this.setState({
            weekstart: moment(this.state.weekstart).clone().add(1, prop),
            weekend: moment(this.state.weekend).clone().add(1, prop)
        });
    }

    static getWeeks(weekstart) {
        const monthstart = moment(weekstart).startOf("month");
        const monthend = moment(weekstart).endOf("month");
        const weeks = [];
        const currentWeek = monthstart.clone().startOf("week");
        while (!moment(monthend).isBefore(currentWeek)) {
            const week = {
                weekstart: moment(currentWeek),
                weekend: moment(currentWeek).endOf("week"),
                month: moment(monthstart).format("MM"),
            };
            weeks.push(week);
            currentWeek.add(1, "week");
        }
        return weeks;
    }

    renderWeeks() {
        if (!this.state.showMonth) {
            return (
                <div className="numbers">
                    {this.renderNumbers(this.state.weekstart, this.state.weekend, 0)}
                </div>
            );
        }
        else {
            return (
                Calendar.getWeeks(this.state.weekstart).map(item =>
                    <div className={"numbers"}>
                        {this.renderNumbers(item.weekstart, item.weekend, item.month)}
                    </div>
                )
            )
        }
    }

    render() {
        return (
            <>
                <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet"/>
                <div className="header" style={this.state.showButtons ? {height: "84px"} : {height: "40px"}}>
                    <div className={"top"}><p className="prev" onClick={this.prevWeek}>PREV</p>
                        <div className={"middle"}>
                            {this.renderDate()}
                            {this.renderList()}
                        </div>
                        <p className="next" onClick={this.nextWeek}>NEXT</p>
                    </div>
                    <div className={"buttons"} style={this.state.showButtons ?
                        {display: "flex", marginTop: "0px"} : {display: "none", marginTop: "-40px"}}>
                        <div className={"button"} onClick={this.today}>
                            <span>Today</span>
                        </div>
                        <div className={"button"} onClick={this.showWeek}>
                            <span>
                                This week
                            </span>
                        </div>
                        <div className={"button"} onClick={this.showMonth}>
                            <span>
                                This month
                            </span>
                        </div>
                    </div>
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
                <div className={"numberContainer"}>
                    {this.renderWeeks()}
                </div>
            </>
        );
    }
}

export default Calendar;
