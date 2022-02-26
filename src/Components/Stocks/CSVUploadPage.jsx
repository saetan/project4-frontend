import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CSVUpload from "../CSVUpload";

export default function CSVUploadPage({ setToggleToAddStockPage }) {
  const [csvData, setCSVData] = useState();
  let navigate = useNavigate();
  const handleUploadCSV = async (event) => {
    if (csvData) {
      console.log(csvData);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/stocks/bulk`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(csvData),
          }
        );
        console.log("response: " + response.status);
        if (response.status === 401) {
          const errorMessage = await response.text();
          console.log(errorMessage);
          throw new Error(errorMessage);
        }
        const result = await response.json();
        if (result.result === 200) {
          console.log(result.message);

          console.log(result.message);
          await Swal.fire(result.message);
          setToggleToAddStockPage("stockList");
        }
      } catch (error) {
        Swal.fire(error.message + " please remove");
      }
    }
  };

  return (
    <div>
      <CSVUpload setCSVData={setCSVData} />
      <button
        disabled={csvData ? "" : `disabled`}
        className="flex items-center px-3 py-2 border rounded text-white bg-atoll border-teal-400 hover:text-teal-200 hover:border-white disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={handleUploadCSV}
      >
        Upload
      </button>
    </div>
  );
}
