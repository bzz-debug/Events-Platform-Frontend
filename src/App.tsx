
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import CustomerLogin from "./components/CustomerLogin";
import StaffLogin from "./components/StaffLogin";
import Signup from "./components/Signup";
import EventsList from "./components/EventsList";
import NewEventForm from "./components/NewEventForm";
import { CompleteOrder } from "./components/CompleteOrder";
import { CancelOrder } from "./components/CancelOrder";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/customer-login" element={<CustomerLogin />}></Route>
          <Route path="/staff-login" element={<StaffLogin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/events-list" element={<EventsList />}></Route>
          <Route path="/events-form" element={<NewEventForm />}></Route>
          <Route path="/complete-order" element={<CompleteOrder />}></Route>
          <Route path="/cancel-order" element={<CancelOrder />}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
