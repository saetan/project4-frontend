import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

export default function LoginPage() {
  let navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const handleEmailChange = (event) => {
      setLogin({
      ...login,
      email: event.currentTarget.value,
    })
  }

  const handlePasswordChange = (event) => {
    setLogin({
      ...login,
      password: event.currentTarget.value,
    })
  }

  const handleSubmit = async (event) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/sessions/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(login),
      })

      const decodedResponse = await response.json();
      console.log(decodedResponse)
      if (decodedResponse.status !== 200) {
        throw new Error(decodedResponse.message);
      } else if(decodedResponse.status === 200) {
        Swal.fire('Login Successful');
        navigate("/dashboard");
      }
    } catch (error) {
      console.warn(error.message)
      Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: error.message,
  footer: '<a href="">Why do I have this issue?</a>'
})
    }
  }

    return <>
             <label>Email</label>
            <input
              value={login.email}
              onChange={handleEmailChange}
            />
            <label>Password</label>
            <input
              value={login.password}
              type="password"
              onChange={handlePasswordChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </>
}