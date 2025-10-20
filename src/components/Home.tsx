import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { SyncLoader } from "react-spinners";

function Home() {
  const [dogImage1, setDogImage1] = useState(null);
  const [dogImage2, setDogImage2] = useState(null);
  const [dogImage3, setDogImage3] = useState(null);
  const [fetchError, setFetchError] = useState([null, null, null]);
  const [loading, setLoading] = useState(true);

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  useEffect(() => {
    axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then((response) => {
        setDogImage1(response.data.message);
      })
      .catch((error) => {
        setFetchError((prev) => {
          const updated = [...prev];
          updated[0] = error.message;
          return updated;
        });
      });

    axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then((response) => setDogImage2(response.data.message))
      .catch((error) => {
        setFetchError((prev) => {
          const updated = [...prev];
          updated[1] = error.message;
          return updated;
        });
      });

    axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then((response) => setDogImage3(response.data.message))
      .catch((error) => {
        setFetchError((prev) => {
          const updated = [...prev];
          updated[2] = error.message;
          return updated;
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      {!loading ? (
        <div className="body-wrapper">
          <h1>WESTON WALKIES</h1>
          <h3>
            Your local hub for all things pup related: walks, events, training
            and more
          </h3>
          <Link to="events-list">
            <button>What's On</button>
          </Link>
          <div id="homepage-gallery">
            {!fetchError[0] ? (
              <img
                className="gallery-card"
                src={dogImage1 || undefined}
                alt=""
              />
            ) : (
              "ERROR: Sorry we couldn't load these images"
            )}

            {!fetchError[1] ? (
              <img
                className="gallery-card"
                src={dogImage2 || undefined}
                alt=""
              />
            ) : (
              "ERROR: Sorry we couldn't load these images"
            )}

            {!fetchError[2] ? (
              <img
                className="gallery-card"
                src={dogImage3 || undefined}
                alt=""
              />
            ) : (
              "ERROR: Sorry we couldn't load these images"
            )}
          </div>
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

export default Home;
