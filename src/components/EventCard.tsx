import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { addAttendee, deleteEvent } from "../../api";
import { useUserAuth, useStaffAuth } from "../contexts";
import axios from "axios";
import { CircleLoader } from "react-spinners";
import type { Timestamp } from "firebase/firestore";

interface Event {
  id: string;
  name: string;
  startDateTime: Timestamp;
  endDateTime: Timestamp;
  description: string;
  eventPrice?: number;
}

function EventCard({ event }: { event: Event }) {
  const [deleted, setDeleted] = useState(false);
  const [dogImage, setDogImage] = useState("");
  const [fetchError, setFetchError] = useState(false);
  const [loading, setLoading] = useState(true);

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const { user } = useUserAuth();
  const { staff } = useStaffAuth();

  if (!event) {
    return <p>Loading...</p>;
  }

  useEffect(() => {
    axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then((res) => {
        setDogImage(res.data.message);
        setLoading(false);
      })
      .catch(() => {
        setFetchError(true);
        setLoading(false);
      });
  }, []);

  const handleDelete = async () => {
    setDeleted(true);
    await deleteEvent(event.id);

    alert("event deleted");
  };

  const api = axios.create({
    baseURL: "https://events-platform-backend-wfoi.onrender.com",
  });

  const openInNewTab = (url: any) => {
    window.open(url, "_blank", "noreferrer");
  };

  const handleAddEventToCalendar = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      api
        .post("/api/create-event", {
          eventName: event.name,
          eventDescription: event.description,
          startDateTimeObject: event.startDateTime,
          endDateTimeObject: event.endDateTime,
          userId: user.id,
        })
        .then((response) => {
          console.log(response.data.data.htmlLink);
          openInNewTab(response.data.data.htmlLink);
          alert("added to your calendar");
        })
        .catch((error) => {
          error.message;
        });
    }
  };

  const handleFreeSignUp = async (eventId: string, userId: string) => {
    await addAttendee(eventId, userId);
    alert("You're signed up!");
  };

  return (
    <>
      <div className="event-card">
        {!deleted ? (
          <div>
            <h2>{event?.name || "No name"}</h2>
            <p>
              Starts at:
              {event?.startDateTime
                ? event.startDateTime.toDate().toLocaleString()
                : "No date"}
            </p>
            <p>
              Ends at:
              {event?.endDateTime
                ? event.endDateTime.toDate().toLocaleString()
                : "No date"}
            </p>
            <p>{event?.description || "No description"}</p>
            <p>Price: {event.eventPrice ? `£${event.eventPrice}` : "free"}</p>

            {staff ? (
              <button onClick={handleDelete}>Delete Event</button>
            ) : null}
            {user && !staff ? (
              <div>
                <button onClick={handleAddEventToCalendar}>
                  {" "}
                  Add to Google Calendar
                </button>
                {event.eventPrice ? (
                  <form
                    action="https://events-platform-backend-wfoi.onrender.com/api/pay"
                    method="POST"
                  >
                    <input
                      type="hidden"
                      name="totalPrice"
                      value={event.eventPrice}
                    />
                    <input type="hidden" name="eventId" value={event.id} />
                    <input type="hidden" name="userId" value={user.id} />
                    <button type="submit">Sign up and purchase ticket</button>
                  </form>
                ) : (
                  <button
                    onClick={() => {
                      handleFreeSignUp(event.id, user.id);
                    }}
                  >
                    Sign up for free
                  </button>
                )}
              </div>
            ) : null}
          </div>
        ) : null}
        {!loading ? (
          <div className="dog-image-div">
            {!fetchError ? (
              <img className="dog-image" src={dogImage} alt="" />
            ) : (
              "Error loading image"
            )}
          </div>
        ) : (
          <CircleLoader
            color={"gray"}
            loading={loading}
            cssOverride={override}
            speedMultiplier={1}
            size={22}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
      </div>
    </>
  );
}
export default EventCard;
