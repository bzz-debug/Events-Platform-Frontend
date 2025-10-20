import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { SyncLoader } from "react-spinners";

import { useUserAuth } from "../contexts";

function CustomerLogin() {
  const [loading, setLoading] = useState(false);
  const { user, setUser, isUserLoggedIn } = useUserAuth();

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  useEffect(() => {
    if (isUserLoggedIn && user) {
      alert("User login successful");
    } else {
      console.log("user logged out");
    }
  }, [user, isUserLoggedIn]);

  const api = axios.create({
    baseURL: "https://events-platform-backend-wfoi.onrender.com",
  });

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/calendar",
    onSuccess: async (codeResponse) => {
      setLoading(true);
      try {
        const tokens = await api.post(
          "https://events-platform-backend-wfoi.onrender.com/api/create-tokens",
          {
            code: codeResponse.code,
          }
        );

        const { user_info } = tokens.data;

        setUser({
          email: user_info.email,

          id: user_info.id,
        });
        setLoading(false);
        localStorage.setItem("user", JSON.stringify(user_info));
      } catch (error) {
        if (error instanceof Error) {
          alert("Login failed: " + error.message);
        } else {
          alert("Login failed: " + String(error));
        }
      } finally {
        setLoading(false);
      }
    },
    onError: (errorResponse) => {
      alert(errorResponse);
      setLoading(false);
    },
  });

  return (
    <>
      {!loading ? (
        <div>
          {isUserLoggedIn ? (
            <Link to="/events-list">
              <button>View Events</button>
            </Link>
          ) : (
            <button
              onClick={() => {
                setLoading(true);
                googleLogin();
              }}
            >
              Sign in with Google 🚀
            </button>
          )}
        </div>
      ) : (
        <div>
          <SyncLoader
            color={"white"}
            loading={loading}
            cssOverride={override}
            speedMultiplier={1}
            size={22}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </>
  );
}

export default CustomerLogin;
