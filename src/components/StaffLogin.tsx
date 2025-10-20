import { signIn } from "../../api";
import { useState, useEffect } from "react";
import { useStaffAuth, useUserAuth } from "../contexts";
import { Link } from "react-router-dom";


function StaffLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useUserAuth();

  const { staff, setStaff } = useStaffAuth();



  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setUser(null);

    try {
      const result = await signIn(email, password);
      alert("logged in!");
      if ("user" in result) {
        setStaff({
          email: result.user.email,
        });
      }
    } catch (error) {
       if (error instanceof Error) {
    alert(error.message);
  } else {
    alert(String(error));
  }
    }
  };

  useEffect(() => {
    console.log("Staff context updated:", staff);
    if (staff) {
    }
  }, [staff]);

  return (
    <>
      {staff ? (
        <div>
          <h1>Logged in as: {staff.email} </h1>

          <Link to="/events-list">Go to events List</Link>
        </div>
      ) : (
        <div>
          <h1>Staff log in</h1>

          <form onSubmit={handleSignIn} id="staff-login-form">
            <label>
              Email:
              <input
                type="text"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
            <button type="submit">Log In</button>
          </form>
        </div>
      )}
    </>
  );
}

export default StaffLogin;
