import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toggleLoginState } from "../redux/stateSlice";
import { useDispatch } from "react-redux";

export default function LogoutPage() {
  const dispatch = useDispatch();
  useEffect(async () => {
    dispatch(toggleLoginState({ isLoggedIn: false }));
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
  }, []);
  return (
    <>
      <h1>You are Logged Out</h1>
    </>
  );
}
