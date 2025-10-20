import { registerUser } from "../../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await registerUser(email, password);

    if (result.success) {
      alert("Account Created!");
      navigate("/events-list");
    }
  };

  return (
    <>
      <p>SIGN UP PAGE - copy from Last Table</p>

      <form
        onSubmit={(e) => {
          handleSignup(e);
        }}
      >
        <label htmlFor="">
          <input
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label htmlFor="">
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <button type="submit">Sign Up!</button>
      </form>
    </>
  );
}

export default Signup;
