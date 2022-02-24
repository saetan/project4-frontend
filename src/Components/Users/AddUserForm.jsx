import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

//To validate Email
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default function AddUserForm(props) {
  const [user, setUser] = useState({
    username: "",
    type: "admin",
    password: "",
    email: "",
  });
  const [isDisabled, setDisabled] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);

  useEffect(() => {
    checkIsDisabled();
  }, [user]);

  const checkIsDisabled = () => {
    console.log("Checking");
    if (user.username && user.email && user.type && user.password) {
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

  const emailValidatorCheck = (event) => {
    let isEmail = validateEmail(user.email);
    setIsValidEmail(isEmail);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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

      console.log(response.status);
      if (response.status === 200) {
        console.log("I am here");
        await Swal.fire(`${user.username} is added successfully`);
        setUser({
          username: "",
          type: "admin",
          password: "",
          email: "",
        });
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
        <form className="bg-white shadow-md rounded-lg px-12 pt-2 mt-6 pb-6 mb-6">
          <div className="mt-2">
            <label
              className="block text-gray-700 text-xl font-bold mb-4"
              htmlFor="username"
            >
              username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-4 px-6 mb-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="text"
              type="text"
              placeholder="username"
              value={user.username}
              onChange={handleUserNameChange}
            />
          </div>
          <div className="mb-8">
            <label
              className="block text-gray-700 text-xl font-bold mb-8"
              htmlFor="email"
            >
              email
            </label>
            <input
              className={
                isValidEmail
                  ? "shadow appearance-none border rounded w-full py-4 px-6 mb-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  : "shadow appearance-none border border-red-500 rounded w-full py-4 px-6 text-gray-700 mb-6 leading-tight focus:outline-none focus:shadow-outline"
              }
              id="text"
              type="text"
              placeholder="email"
              value={user.email}
              onChange={handleEmailChange}
              onBlur={emailValidatorCheck}
            />
            {isValidEmail ? (
              ""
            ) : (
              <p className="text-red-500 text-md italic">Invalid Email</p>
            )}
          </div>
          <div className="mb-8">
            <label
              className="block text-gray-700 text-xl font-bold mb-4"
              htmlFor="type"
            >
              Type
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-4 px-6 mb-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={user.type}
              onChange={handleTypeChange}
              id="type"
              type="text"
              placeholder="role"
            >
              <option value="admin">admin</option>
              <option value="employee">employee</option>
              <option value="customer">customer</option>
              <option value="supplier">supplier</option>
            </select>
          </div>

          <div class="mb-16">
            <label
              className="block text-gray-700 text-xl font-bold mb-4"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-4 px-6 mb-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              className="inline-block align-baseline font-bold text-2xl text-atoll hover:text-lightseagreen disabled: text-grey disabled: hover: text-grey"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
