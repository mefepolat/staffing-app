import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import { Button, Modal } from 'react-bootstrap';
import {startOfToday, addDays, endOfToday, addMinutes} from 'date-fns';
import { useState, useMemo } from 'react'; 
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);

const FullCalendar = () => {
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [availabilities, setAvailabilities] = useState("Click to enter your availability for this day.");
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    function addAvailability(){

    }


    
    const {  formats } = useMemo(
        () => ({
          
          formats: {
            weekdayFormat: (date, culture, localizer) =>
              localizer.format(date, 'dddd', culture),
          },
        }),
        []
      )
    

    const handleSelectSlot = ({start, end}) => {
    
        openModal();
        
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
    
    const minDate = startOfToday();
    const maxDate = addDays(minDate, 10);
    const endOfDay = endOfToday();
    const todayPlusOneMinute = addMinutes(endOfDay, 1);
  
    return (
        <div>
            <Calendar
            localizer={localizer}
            dayPropGetter={dayPropGetter}
            startAccessor='start'
            endAccessor='end'
            formats={formats}
            
            style={{height: 500}}
            selectable
            onSelectSlot={handleSelectSlot}
            events={availabilities}
            eventPropGetter={eventStyleGetter}
            toolbar={true}
            components={{
                timeSlotWrapper: ({children, style}) => (
                    <div style={{...style, height:"33%"}}>{children}</div>
                ),
                
            }}
            show
            min={minDate}
            max={maxDate}
            maxDate={todayPlusOneMinute}
            />
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Shift</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <input type="radio" name="shift" value="d" /> Day Shift - 08:00 AM to 04:00 PM <br />
                        <input type="radio" name="shift" value="e" /> Evening Shift - 04:00 PM to 12:00 AM <br />
                        <input type="radio" name="shift" value="n" /> Night Shift - 12:00 AM to 08:00 AM <br />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeModal}>Cancel</Button>
                    <Button variant='primary' onClick={addAvailability}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}


export default FullCalendar;