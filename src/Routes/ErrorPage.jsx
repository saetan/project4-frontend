import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  let navigate = useNavigate();
  const triggerErrorMessage = async () => {
    try {
      const message = await Swal.fire({
        icon: "error",
        title: "Oops...404",
        text: "This page do not exist, redirect you back to previous page",
        footer: '<a href="">Why do I have this issue?</a>',
      });

      if (message.isConfirmed) {
        console.log("uwu");
        navigate(-1);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    triggerErrorMessage();
  }, []);
  return (
    <>
      <h1>404 Page</h1>
    </>
  );
}
