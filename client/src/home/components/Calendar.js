import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const events = [ { id: 'd', title: 'Day', start: new Date()},
{ id: 'e', title: 'Evening', start: new Date()},
{ id: 'n', title: 'Night', start: new Date()}];

const resources = [ 
    
]


const Calendar = () => {
    return (
        <div className='calendar'>
            <FullCalendar
            plugins={[dayGridPlugin]}
            initialView='dayGridWeek'
            weekends={false}
            events={events}
            eventContent={renderEventContent}
            resources={resources}
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