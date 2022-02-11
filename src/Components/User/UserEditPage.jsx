import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default function UserEditPage(props) {
  let { id } = useParams();
  const [userData, setUserData] = useState([]);
  const [isDisabled, setDisabled] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);

  const { triggerRefresh, setTriggerRefresh } = props;

  useEffect(() => {
    console.log("UseEffect Called");
    retrieveUserData();
    checkIsDisabled();
  }, [triggerRefresh]);

  //Retrieve
  const retrieveUserData = async () => {
    try {
      const usersResponse = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/users/${id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const user = await usersResponse.json();

      //Set UserList if user is not empty
      if (user.status !== 200) {
        console.log(user.result);
      } else if (user.status === 200) {
        setUserData(user.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateUserData = async () => {
    try {
      const usersResponse = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/users/${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const user = await usersResponse.json();

      //Set UserList if user is not empty
      if (user.status !== 200) {
        console.log(user.result);
      } else if (user.status === 200) {
        Swal.fire(`Updated ${user.message}`);
        console.log("Triggering refresh");
        setTriggerRefresh(!triggerRefresh);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const checkIsDisabled = () => {
    console.log("Checking");
    if (
      userData.username &&
      userData.email &&
      userData.type &&
      userData.password
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleUserNameChange = (event) => {
    setUserData({
      ...userData,
      username: event.currentTarget.value,
    });
  };

  const handleTypeChange = (event) => {
    setUserData({
      ...userData,
      type: event.currentTarget.value,
    });
  };

  const handlePasswordChange = (event) => {
    setUserData({
      ...userData,
      password: event.currentTarget.value,
    });
  };

  const handleEmailChange = (event) => {
    setUserData({
      ...userData,
      email: event.currentTarget.value,
    });
  };

  const emailValidatorCheck = (event) => {
    let isEmail = validateEmail(userData.email);
    setIsValidEmail(isEmail);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const getResponse = await updateUserData();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="w-full max-w flex justify-center items-center h-full">
        <form className="bg-white shadow-md rounded-xl px-32 pt-12 pb-12 mt-12">
          <div class="mb-8">
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
              value={userData.username}
              onChange={handleUserNameChange}
            />
          </div>
          <div class="mb-8">
            <label
              className="block text-gray-700 text-2xl font-bold mb-8"
              for="email"
            >
              email
            </label>
            <input
              className={
                isValidEmail
                  ? "shadow appearance-none border rounded w-full py-8 px-12text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  : "shadow appearance-none border border-red-500 rounded w-full py-8 px-12 text-gray-700 mb-12 leading-tight focus:outline-none focus:shadow-outline"
              }
              id="text"
              type="text"
              placeholder="email"
              value={userData.email}
              onChange={handleEmailChange}
              onBlur={emailValidatorCheck}
            />
            {isValidEmail ? (
              ""
            ) : (
              <p className="text-red-500 text-2xl italic">Invalid Email</p>
            )}
          </div>
          <div className="mb-8">
            <label
              className="block text-gray-700 text-2xl font-bold mb-8"
              for="type"
            >
              Type
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-8 px-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={userData.type}
              onChange={handleTypeChange}
              id="type"
              type="text"
              placeholder="role"
            >
              <option value="admin">admin</option>
              <option value="employee">employee</option>
              <option value="employee">customer</option>
              <option value="employee">supplier</option>
            </select>
          </div>

          <div class="mb-8">
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
              value={userData.password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
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
