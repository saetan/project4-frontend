import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toggleLoginState, updateRole } from "../redux/stateSlice";
import { useDispatch, useSelector } from "react-redux";

export default function LoginPage() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  let checkState = useSelector((state) => state.states.isLoggedIn);
  let currentRole = useSelector((state) => state.states.role);

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [isEmpty, setIsEmpty] = useState({
    email: false,
    password: false,
  });

  const checkisLoggedIn = () => {
    console.log(checkState);
    if (checkState) {
      switch (currentRole) {
        case "admin":
          navigate("/dashboard/overview");
          break;
        case "employee":
          navigate("/dashboard/overview");
          break;
        case "supplier":
          navigate("/dashboard/incomingorders");
          break;
        case "customer":
          navigate("/dashboard/outgoingorders");
          break;
        default:
          navigate("/dashboard/login");
      }
    }
  };
  const checkisEmpty = (event) => {
    let newEmpty = { ...isEmpty };
    if (event.currentTarget.value) {
      newEmpty[event.currentTarget.id] = false;
      setIsEmpty(newEmpty);
    } else {
      newEmpty[event.currentTarget.id] = true;
      setIsEmpty(newEmpty);
    }
  };
  const handleEmailChange = (event) => {
    setLogin({
      ...login,
      email: event.currentTarget.value,
    });
  };

  const handlePasswordChange = (event) => {
    setLogin({
      ...login,
      password: event.currentTarget.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/sessions/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(login),
        }
      );

      const decodedResponse = await response.json();
      console.log(decodedResponse);
      if (decodedResponse.status !== 200) {
        throw new Error(decodedResponse.message);
      } else if (decodedResponse.status === 200) {
        Swal.fire("Login Successful");
        dispatch(toggleLoginState({ isLoggedIn: true }));
        dispatch(updateRole({ role: decodedResponse.role }));
        switch (decodedResponse.role) {
          case "admin":
            navigate("/dashboard/overview");
            break;
          case "employee":
            navigate("/dashboard/overview");
            break;
          case "supplier":
            navigate("/dashboard/incomingorders");
            break;
          case "customer":
            navigate("/dashboard/outgoingorders");
            break;
          default:
            navigate("/dashboard/login");
        }
      }
    } catch (error) {
      console.warn(error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  };
  useEffect(() => {
    checkisLoggedIn();
  }, [checkState, currentRole]);

  return (
    <>
      <div className="w-full max-w flex justify-center items-center h-screen bg-oyesterbay">
        <form className="bg-white shadow-md rounded px-24 pt-24 pb-24 mb-4">
          <div className="mb-6">
            <label
              className="block text-gray-700 text-xl font-bold mb-2"
              for="email"
            >
              Email
            </label>
            <input
              className={
                isEmpty.email
                  ? "shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              }
              id="email"
              type="text"
              placeholder="Email"
              value={login.email}
              onChange={handleEmailChange}
              onBlur={checkisEmpty}
            />
            {isEmpty.email ? (
              <p className="text-red-500 text-xs italic">
                Please fill in your email.
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-xl font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              className={
                isEmpty.password
                  ? "shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              }
              value={login.password}
              type="password"
              onChange={handlePasswordChange}
              id="password"
              placeholder="******************"
              onBlur={checkisEmpty}
            />
            {isEmpty.password ? (
              <p className="text-red-500 text-xs italic">
                Please fill in your password.
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handleSubmit}
              className="inline-block align-baseline font-bold text-xl text-atoll hover:text-lightseagreen"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
