import { Link } from "react-router-dom";

export function CompleteOrder() {
  return (
    <>
      <h1>Thank you for your purchase</h1>
      <h2>You've been added to the list!</h2>
      <h2></h2>
      <Link to="/">Click here to go back to the home page</Link>
    </>
  );
}
