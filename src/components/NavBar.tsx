import { Link } from "react-router-dom";
import { useStaffAuth, useUserAuth } from "../contexts";
import { signUserOut } from "../../api";

function NavBar() {
  const { user } = useUserAuth();
  const { staff, setStaff } = useStaffAuth();
  return (
    <>
      <header id="navbar">
        <Link to="/events-list">
          <button>Events List</button>
        </Link>
        <Link to="/">
          <button>Home</button>
        </Link>

        {user || staff ? (
          staff ? (
            <div id="nav-bar-span-2">
              <p id="username-banner"></p>
              <button id="logout-button" onClick={() => setStaff(null)}>
                Log Out
              </button>
              <Link to="/events-form">
                <button>Add Event</button>
              </Link>
              <p>{`Logged in as: ${staff.email}`}</p>
            </div>
          ) : (
            <div>
              <button id="logout-button" onClick={signUserOut}>
                Log Out
              </button>
              <p>Logged in as: {user && user.email ? user.email : null}</p>
            </div>
          )
        ) : (
          <span id="nav-bar-span-3">
            <Link to="/login">
              <button>Log In</button>
            </Link>
          </span>
        )}
      </header>
    </>
  );
}
export default NavBar;
