import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect } from 'react';

const events = [ { id: 'd', title: 'Day', start: new Date()},
{ id: 'e', title: 'Evening', start: new Date()},
{ id: 'n', title: 'Night', start: new Date()}];

const resources = [ 
    
]


const Calendar = () => {
    const handleDayClick = (dayEl, cell) => {
        const shift = cell.getAttribute('data-shift');
    }

    useEffect(() => {
        const shiftRows = document.querySelectorAll('.shift-row');
        shiftRows.forEach(row => {
            row.addEventListener('click', (event) => {
                handleDayClick(event.target, event.target.parentNode);
            });
        });
    });
    

    return (
        <div className='calendar'>
            <FullCalendar
            plugins={[dayGridPlugin]}
            initialView='dayGridWeek'
            weekends={false}
            events={events}
            eventContent={renderEventContent}
            />
        </div>
    )
}

function renderEventContent(eventInfo){
    return (
        <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
        </>
    )
}

export default Calendar;