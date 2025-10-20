import { Link } from "react-router-dom";
function Login() {
  return (
    <>
      <div className="body-wrapper">
        <h1>Login Page</h1>
        <div className="login-link-wrapper">
          <h2>Use your Google account to login as a customer</h2>

          <Link to="/customer-login">
            <button>Customer Login</button>
          </Link>
        </div>
        <div className="login-link-wrapper">
          <h2>Or your staff email address:</h2>
          <Link to="/staff-login">
            <button>Staff Login</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
