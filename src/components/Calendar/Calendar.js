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
        };
        this.setShowing = this.setShowing.bind(this);
        this.today = this.today.bind(this);
        this.nextWeek = this.nextWeek.bind(this);
        this.prevWeek = this.prevWeek.bind(this);
        this.renderNumbers = this.renderNumbers.bind(this);
    }


    renderDate() {
        return (
            <p className="position">{!this.state.showMonth ?
                (`${moment(this.state.weekstart).format("ll")} - ${moment(this.state.weekend).format("ll")}`) :
                (moment(this.state.weekstart).format("MMM, YYYY"))}</p>
        );
    }

    setShowing() {
        this.setState({showMonth: !this.state.showMonth})
    }

    renderList() {
        return(
          <div className={"list"}>
              <div className={"arrow"}>
                  ▼
              </div>
              <div className={"listItem"} onClick={this.today}>
                  Today
              </div>
              <div className={"listItem"} onClick={this.setShowing}>
                  Show Weeks/Months
              </div>
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
                <div style={(item.format("YYYYMMDD") === this.state.selectedDay.format("YYYYMMDD")) ?
                    {backgroundColor: "#0B3157", borderRadius: "7px"} : {}
                }>
                    <p onClick={(e) => this.selectDay(e)} className={"number"} id={item.format("YYYY-MM-DD")}
                       style={item.format("YYYYMMDD") === moment().format("YYYYMMDD") ?
                           {color: "red"} : item.format("MM") !== month ?
                               {color: "#CCCCCC"} : {color: "#858585"}
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
            weekend: moment().startOf(prop),
            weekstart: moment().endOf(prop),
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
        console.log("dada");
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
             console.log(week);
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
                <div className="header">
                    <p className="prev" onClick={this.prevWeek  }>PREV</p>
                    <div className={"middle"}>
                        {this.renderDate()}
                        {this.renderList()}
                    </div>
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
                <div className={"numberContainer"}>
                    {this.renderWeeks()}
                </div>
            </>
        );
    }
}

export default Calendar;
