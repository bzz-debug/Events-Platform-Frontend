import { Link } from "react-router-dom";

export function CancelOrder() {
  return (
    <>
      <h1>Your order has been cancelled</h1>

      <Link to="/">Click here to go back to the home page</Link>
    </>
  );
}
