import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import { useState, useMemo } from 'react'; 
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);

const FullCalendar = () => {

    const [availabilities, setAvailabilities] = useState([]);

    
    const { defaultDate, formats } = useMemo(
        () => ({
          
          formats: {
            weekdayFormat: (date, culture, localizer) =>
              localizer.format(date, 'dddd', culture),
          },
        }),
        []
      )
    

    const handleSelectSlot = ({start, end}) => {
        const shift = prompt(
            "Which shift are you available for? (day, evening or night)"
        )
        if(shift){
            const availability = {
                start,
                end,
                title: shift.trim().charAt(0).toUpperCase() + shift.slice(1)
            };
    
            setAvailabilities([...availabilities, availability]);
        }
        
    }

    const dayPropGetter = (date) => {
        return {
            className: `weekday-${moment(date).format('ddd').toLowerCase()}`
        }
    }

  

    const eventStyleGetter = (event,start,end, isSelected) => {
        return {
            style: {
                backgroundColor: event.color,
                borderRadius: '0px',
                opacity: '0.5',
                color: 'black',
                border: '0px',
                display: 'block'
            }
        }
    }
    
  
    return (
        <div>
            <Calendar
            localizer={localizer}
           
            dayPropGetter={dayPropGetter}
            startAccessor='start'
            endAccessor='end'
            formats={formats}
            style={{height: 500}}
            selectable={true}
            onSelectSlot={handleSelectSlot}
            events={availabilities}
            eventPropGetter={eventStyleGetter}
            components={{
                timeSlotWrapper: ({children, style}) => (
                    <div style={{...style, height:"33%"}}>{children}</div>
                )
            }}
            show
            />
        </div>
    )
}


export default FullCalendar;