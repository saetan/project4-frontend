import React, { useEffect } from "react";
import { toggleLoginState } from "../redux/stateSlice";
import { useDispatch } from "react-redux";

export default function LogoutPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/sessions/logout`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        if (result.status === 200) {
          console.log(result.result);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    dispatch(toggleLoginState({ isLoggedIn: false }));
    fetchData();
  }, []);
  return (
    <>
      <h1>You are Logged Out</h1>
    </>
  );
}
