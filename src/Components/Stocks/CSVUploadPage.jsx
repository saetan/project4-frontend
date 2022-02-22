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
        const result = await response.json();
        if (result.result === 200) {
          console.log(result.message);
          await Swal.fire(result.message);
          setToggleToAddStockPage("stockList");
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        console.log(error.message);
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
