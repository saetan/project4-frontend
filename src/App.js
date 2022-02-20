import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { ToastContainer, toast } from "react-toastify";

export default function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} closeOnClick />
      <Navbar />
      <Outlet />
    </>
  );
}
