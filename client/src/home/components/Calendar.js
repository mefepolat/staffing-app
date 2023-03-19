import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { addAvailability } from "../../utils/addAvailability";
import { Button, Modal } from "react-bootstrap";
import { useState, useMemo, useContext, useEffect } from "react";
import { UserContext } from "../../shared/components/UserContext";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getAvailability } from "../../utils/getAvailability";
import { updateAvailability } from "../../utils/updateAvailability";
const localizer = momentLocalizer(moment);

const FullCalendar = () => {
  const { user } = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availabilities, setAvailabilities] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [shift, setShift] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [eventId, setEventId] = useState("");

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedDate("");
    setShift(null);
    setShowModal(false);
  };

  const { formats } = useMemo(
    () => ({
      formats: {
        weekdayFormat: (date, culture, localizer) =>
          localizer.format(date, "dddd", culture),
      },
    }),
    []
  );

  const getAvailabilityEvents = () => {
    if (availabilities.length > 0) {
      return availabilities.map((availability) => ({
        start: new Date(availability.date),
        end: new Date(availability.date),
        title: availability.availability.toUpperCase(),
      }));
    }
  };

  const handleEventClick = (eventClickInfo) => {
    const eventStart = moment(eventClickInfo.start).format("YYYY-MM-DD");
    const event = availabilities.find(
      (availability) =>
        moment(availability.date).format("YYYY-MM-DD") === eventStart
    );
    
    setEventId(event._id);
    setSelectedDate(event.date);
    setShift(event.availability);
    setShowModal(true);
    setEditMode(true);
   
  };

  const getAvailabilities = async () => {
    const availabilities = await getAvailability(user);
    setAvailabilities(availabilities);
  };

  useEffect(() => {
    if (user) {
      getAvailabilities();
    }
  }, [user, showModal]);

  useEffect(() => {
    if (selectedDate) {
      openModal();
    }
  }, [selectedDate]);

  const handleSelectSlot = ({ start, end }) => {
    const today = new Date();
    const startDate = moment(start).startOf("day").toDate();
    if (start < today) {
      alert("You cannot add availabilities for today or before!");
      return;
    }
    const maxDate = moment().add(10, "days").toDate();
    if (start > maxDate) {
      alert("You cannot select a date more than 10 days in the future.");
      return;
    }
    const isAvailabilityExists = availabilities.some((a) =>{
      moment(a.date).isSame(startDate, "day")
     
    }
    );
    if (isAvailabilityExists) {
      alert("An availability already exists for this date.");
      return;
    }
    setSelectedDate(startDate);
    
  };

  const eventPropGetter = (event) => {
    const style = {
      backgroundColor: "green",
      borderRadius: "0px",
      opacity: 0.5,
      color: "white",
      border: "none",
    };
    if (event.start < new Date()) {
      style.opacity = 0.2;
      style.backgroundColor = "gray";
    }
    return { style };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    closeModal();
    
    if (editMode) {
      await updateAvailability(user, shift, eventId);
      return;
    } else {
      try {
        await addAvailability(user, shift, selectedDate);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        formats={formats}
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelectSlot}
        events={getAvailabilityEvents()}
        eventPropGetter={eventPropGetter}
        toolbar={true}
        show
        onSelectEvent={handleEventClick}
      />
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Select Shift</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <input
              type="radio"
              name="shift"
              value="d"
              checked={shift === "d"}
              onChange={() => setShift("d")}
            />{" "}
            Day Shift - 08:00 AM to 04:00 PM <br />
            <input
              type="radio"
              name="shift"
              value="e"
              checked={shift === "e"}
              onChange={() => setShift("e")}
            />{" "}
            Evening Shift - 04:00 PM to 12:00 AM <br />
            <input
              type="radio"
              name="shift"
              value="n"
              checked={shift === "n"}
              onChange={() => setShift("n")}
            />{" "}
            Night Shift - 12:00 AM to 08:00 AM <br />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FullCalendar;
