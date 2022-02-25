import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { toggleLoginState, updateRole } from "./redux/stateSlice";
import Swal from "sweetalert2";

export default function App() {
  let checkState = useSelector((state) => state.states.isLoggedIn);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const doLogInCheck = async () => {
    console.log("Doing loging status check");
    console.log("Current Login Status: " + checkState);
    try {
      const checkResponse = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/sessions/userRole`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (checkResponse) {
        const result = await checkResponse.json();
        console.log(result.result);
        dispatch(toggleLoginState({ isLoggedIn: true }));
        dispatch(updateRole({ role: result.data }));
      } else {
        await Swal.fire(
          "You are not logged In, redirecting you back to login page"
        );
        navigate("/login");
      }
    } catch (message) {
      console.log(message);
    }
  };
  useEffect(() => {
    doLogInCheck();
  }, []);
  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} closeOnClick />
      <Navbar />
      <Outlet />
    </>
  );
}
