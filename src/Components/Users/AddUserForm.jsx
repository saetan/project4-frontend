import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddUserForm(props) {
  let { setTriggerRefresh, triggerRefresh } = props;
  let navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    type: "",
    password: "",
    email: "",
  });
  const [isDisabled, setDisabled] = useState(true);

  useEffect(() => {
    checkIsDisabled();
  }, [user]);

  const checkIsDisabled = () => {
    console.log("Checking");
    if (user.price && user.name && user.quantity) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  const handleUserNameChange = (event) => {
    setUser({
      ...user,
      username: event.currentTarget.value,
    });
  };

  const handleTypeChange = (event) => {
    setUser({
      ...user,
      type: event.currentTarget.value,
    });
  };

  const handlePasswordChange = (event) => {
    setUser({
      ...user,
      password: event.currentTarget.value,
    });
  };

  const handleEmailChange = (event) => {
    setUser({
      ...user,
      email: event.currentTarget.value,
    });
  };

  const handleSubmit = async (event) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/users/new`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const decodedResponse = await response.json();

      if (response.status === 200) {
        Swal.fire("Add Stock Successful Successful");
        setTriggerRefresh(!triggerRefresh);
        //refresh the form
      } else {
        throw new Error(decodedResponse.message);
      }
    } catch (error) {
      console.warn(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  };

  return (
    <>
      <div className="w-full max-w flex justify-center items-center h-full">
        <form className="bg-white shadow-md rounded-lg px-32 pt-24 pb-32 mb-16">
          <div class="mb-16">
            <label
              className="block text-gray-700 text-2xl font-bold mb-8"
              for="username"
            >
              username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-8 px-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="text"
              type="text"
              placeholder="username"
              value={user.username}
              onChange={handleUserNameChange}
            />
          </div>
          <div class="mb-16">
            <label
              className="block text-gray-700 text-2xl font-bold mb-8"
              for="email"
            >
              email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-8 px-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="text"
              type="text"
              placeholder="email"
              value={user.email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-16">
            <label
              className="block text-gray-700 text-2xl font-bold mb-8"
              for="type"
            >
              Type
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-8 px-12 text-gray-700 mb-12 leading-tight focus:outline-none focus:shadow-outline"
              value={user.type}
              type="type"
              onChange={handleTypeChange}
              id="type"
              type="text"
              placeholder="role"
            />
            <p className="text-red-500 text-2xl italic">Invalid Format.</p>
          </div>

          <div class="mb-16">
            <label
              className="block text-gray-700 text-2xl font-bold mb-8"
              for="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-8 px-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="text"
              placeholder="enter new password"
              value={user.password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              disabled={isDisabled}
              onClick={handleSubmit}
              className="inline-block align-baseline font-bold text-2xl text-atoll hover:text-lightseagreen"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
