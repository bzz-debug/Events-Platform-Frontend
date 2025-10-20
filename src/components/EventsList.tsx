import { getEvents } from "../../api";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import EventCard from "./EventCard";
import { SyncLoader } from "react-spinners";

function EventsList() {
  const [eventsList, setEventsList] = useState<any[]>([]);
  const [fetchError, setFetchError] = useState(false);
  const [loading, setLoading] = useState(true);

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  useEffect(() => {
    const allEvents = async () => {
      try {
        const result = await getEvents();
        setEventsList(result);
        setLoading(false);
      } catch (error) {
        setFetchError(true);
        setLoading(false);
      }
    };
    allEvents();
  }, []);
  return (
    <>
      {!loading ? (
        <div className="body-wrapper">
          {!fetchError ? (
            <div>
              <h1 id="event-list-h1">Events we have coming up </h1>

              {eventsList.map((event) => {
                return <EventCard event={event} />;
              })}
            </div>
          ) : (
            `ERROR: unable to fetch data`
          )}
        </div>
      ) : (
        <SyncLoader
          color={"white"}
          loading={loading}
          cssOverride={override}
          speedMultiplier={1}
          size={22}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </>
  );
}

export default EventsList;
