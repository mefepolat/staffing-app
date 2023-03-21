import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useMemo, useContext, useState, useEffect } from "react";
import { UserContext } from "../../shared/components/UserContext";
import { Button, Modal } from "react-bootstrap";
function Home() {
  const { user } = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [shift, setShift] = useState("");
  const localizer = momentLocalizer(moment);
  const { formats } = useMemo(
    () => ({
      formats: {
        weekdayFormat: (date, culture, localizer) =>
          localizer.format(date, "dddd", culture),
      },
    }),
    []
  );

  useEffect(() => {
    if (selectedDate) {
      openModal();
    }
  }, [selectedDate]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedDate("");
    setShift(null);
    
    setShowModal(false);
  };
  const handleSelectSlot = ({ start, end }) => {
    const today = new Date();
    const startDate = moment(start).startOf("day").toDate();
    if (start < today) {
      alert("You cannot add shifts for today or before!");
      return;
    }
    const maxDate = moment().add(30, "days").toDate();
    if (start > maxDate) {
      alert("You cannot select a date more than 30 days in the future.");
      return;
    }
    
    
    setSelectedDate(startDate);
  };

  const handleSubmit = () => {
    return;
  }

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
    if(event.title === "D") {
        style.backgroundColor = "lightblue";
    }
    if(event.title === "E") {
        style.backgroundColor = "darkblue";
    }
    if(event.title === "N") {
        style.backgroundColor = "darkblue";
    }
   
    return { style };
  };

  return (
    <div className="px-3">
      <div className="container-fluid bg-white my-4 p-3">
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          formats={formats}
          style={{ height: 500 }}
          selectable
          toolbar={true}
          show
          onSelectSlot={handleSelectSlot}
          eventPropGetter={eventPropGetter}
        />
      </div>
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
            <input
              type="radio"
              name="shift"
              value="n/a"
              checked={shift === "n/a"}
              onChange={() => setShift("n/a")}
            />{" "}
            N/A -- Not Available For The Shift <br />
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
}

export default Home;
