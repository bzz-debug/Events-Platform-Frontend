import { useState } from "react";
import { addEvent } from "../../api.ts";
import { Link } from "react-router-dom";
import { useStaffAuth } from "../contexts.tsx";

function NewEventForm() {
  const [eventName, setEventName] = useState("");
  const [eventStartDateTime, setEventStartDateTime] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventEndDateTime, setEventEndDateTime] = useState("");
  const [eventPrice, setEventPrice] = useState("0");
  const startDateTimeObject = new Date(eventStartDateTime);
  const endDateTimeObject = new Date(eventEndDateTime);
  const attendees: any[] = [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newEventId = await addEvent(
        eventName,
        startDateTimeObject,
        endDateTimeObject,
        eventDescription,
        eventPrice,
        attendees
      );

      alert(`Event added with ID: ${newEventId}`);
      setEventName("");
      setEventStartDateTime("");
      setEventEndDateTime("");
      setEventDescription("");
    } catch (error) {
      alert("Failed to add event: " + error);
    }
  };

  const { staff } = useStaffAuth();

  return (
    <>
      <h1>New Event Form</h1>

      <div id="event-form-container">
        {staff ? (
          <div>
            <form className="event-form" onSubmit={handleSubmit}>
              <label htmlFor="">
                Event Name{" "}
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="Event Name"
                  required
                />
              </label>{" "}
              <label htmlFor="">Description</label>
              <input
                type="text"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                required
              />{" "}
              <label htmlFor="eventStartDateTime">
                Start Date/Time
                <input
                  type="datetime-local"
                  value={eventStartDateTime}
                  onChange={(e) => setEventStartDateTime(e.target.value)}
                  required
                />
              </label>{" "}
              <label htmlFor="eventEndDateTime">
                End Date/Time
                <input
                  type="datetime-local"
                  value={eventEndDateTime}
                  onChange={(e) => setEventEndDateTime(e.target.value)}
                  required
                />
              </label>{" "}
              <label htmlFor="">Price</label>
              <input
                type="number"
                value={eventPrice}
                onChange={(e) => setEventPrice(e.target.value)}
                required
              />{" "}
              <button type="submit">Submit this Event</button>
            </form>
            <Link to="/events-list" className="view-events-link">
              View all Events
            </Link>
          </div>
        ) : (
          <Link to="/">Return to Home page</Link>
        )}
      </div>
    </>
  );
}

export default NewEventForm;
