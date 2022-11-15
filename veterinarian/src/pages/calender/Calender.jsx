import React, {Component} from 'react';

// DayPilot Lite
import {DayPilotCalendar} from "@daypilot/daypilot-lite-react";

// DayPilot Pro

class Calendar extends Component {

    constructor(props) {
      super(props);
      this.calendarRef = React.createRef();
    }

    get calendar() {
      return this.calendarRef.current.control;
    }

    render() {
        return (
            <DayPilotCalendar 
              viewType={"Week"}
              ref={this.calendarRef}
            />
        );
    }
}

export default Calendar;
