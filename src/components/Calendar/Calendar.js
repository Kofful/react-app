import React, { Component } from 'react';
import "./Calendar.sass";

class Calendar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <div className="header">
                <p className="prev">PREV</p>
                <p className="position">JUNE 18-24</p>
                <p className="next">NEXT</p>
                </div>
                <div className="days">
                <p className="day-of-week">S</p>
                <p className="day-of-week">M</p>
                <p className="day-of-week">T</p>
                <p className="day-of-week">W</p>
                <p className="day-of-week">T</p>
                <p className="day-of-week">F</p>
                <p className="day-of-week">S</p>
                </div>
                <div>
                </div>
            </>
        );
    }
}

export default Calendar;
