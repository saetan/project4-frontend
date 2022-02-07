import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddStockForms(props) {
  let { setTriggerRefresh, triggerRefresh } = props;
  let navigate = useNavigate();
  const [stock, setStock] = useState({
    name: "",
    quantity: 0,
    price: 0.0,
  });
  const [isDisabled, setDisabled] = useState(true);

  useEffect(() => {
    checkIsDisabled();
  }, [stock]);

  const checkIsDisabled = () => {
    console.log("Checking");
    if (stock.price && stock.name && stock.quantity) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  const handleNameChange = (event) => {
    setStock({
      ...stock,
      name: event.currentTarget.value,
    });
  };

  const handlePriceChange = (event) => {
    setStock({
      ...stock,
      price: event.currentTarget.value,
    });
  };

  const handleQuantityChange = (event) => {
    setStock({
      ...stock,
      quantity: event.currentTarget.value,
    });
  };

  const handleSubmit = async (event) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/stocks/createstock`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(stock),
        }
      );

      const decodedResponse = await response.json();

      if (response.status == 200) {
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
      <div className="w-full max-w flex justify-center items-center h-screen">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="stockName"
            >
              Stock Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="text"
              type="text"
              placeholder="Stock Name"
              value={stock.name}
              onChange={handleNameChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="quantity"
            >
              Stock Quantity
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={stock.quantity}
              type="number"
              onChange={handleQuantityChange}
              id="quantity"
              type="number"
              placeholder="00.00"
            />
            <p className="text-red-500 text-xs italic">Invalid Format.</p>
          </div>

          <div class="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="price"
            >
              Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="number"
              placeholder="$00.00"
              value={stock.price}
              onChange={handlePriceChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              disabled={isDisabled}
              onClick={handleSubmit}
              className="inline-block align-baseline font-bold text-sm text-atoll hover:text-lightseagreen"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
