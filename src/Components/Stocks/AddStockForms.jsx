import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function AddStockForms() {
  const [stock, setStock] = useState({
    skuID: "",
    name: "",
    quantity: 0,
    price: 0.0,
    category: "",
  });

  const [isEmpty, setEmpty] = useState({
    skuID: false,
    name: false,
    quantity: false,
    price: false,
    category: false,
  });

  const [isDisabled, setDisabled] = useState(true);
  useEffect(() => {
    checkIsDisabled();
  }, [stock]);

  const refreshForm = (event) => {
    setStock({
      skuID: "",
      name: "",
      quantity: 0,
      price: 0.0,
      category: "",
    });
  };

  const checkIsEmpty = (event) => {
    let fillName = event.currentTarget.id;
    let newIsEmpty = {
      ...isEmpty,
    };
    if (!stock[fillName]) {
      newIsEmpty[event.currentTarget.id] = true;
      setEmpty(newIsEmpty);
      return;
    } else {
      if (stock[fillName]) {
        newIsEmpty[event.currentTarget.id] = false;
        setEmpty(newIsEmpty);
        return;
      }
    }
  };

  const checkIsDisabled = () => {
    console.log("Checking");
    if (
      stock.price &&
      stock.name &&
      stock.quantity &&
      stock.category &&
      stock.skuID
    ) {
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

  const handleCategoryChange = (event) => {
    setStock({
      ...stock,
      category: event.currentTarget.value,
    });
  };

  const handleSKUIDChange = (event) => {
    setStock({
      ...stock,
      skuID: event.currentTarget.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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

      if (response.status === 200) {
        Swal.fire("Add Stock Successful Successful");
        //refresh the form
        refreshForm();
      } else {
        throw new Error(decodedResponse.message);
      }
    } catch (error) {
      console.warn(error);
      await Swal.fire({
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
          <div class="mb-4 mt-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-4"
              htmlFor="skuid"
            >
              SKU ID
            </label>
            <input
              className={
                !isEmpty.skuID
                  ? "shadow appearance-none border rounded w-full py-4 px-6 mb-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  : "shadow appearance-none border border-red-500 rounded w-full py-8 px-12 text-gray-700 mb-12 leading-tight focus:outline-none focus:shadow-outline"
              }
              id="skuID"
              type="string"
              placeholder="Key in your SKUID"
              value={stock.skuID}
              onChange={handleSKUIDChange}
              onBlur={checkIsEmpty}
            />
            {!isEmpty.skuID ? (
              ""
            ) : (
              <p className="text-red-500 text-md italic">
                Please fill in your SKU ID
              </p>
            )}
          </div>
          <div class="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-4"
              htmlFor="stockName"
            >
              Stock Name
            </label>
            <input
              className={
                !isEmpty.name
                  ? "shadow appearance-none border rounded w-full py-4 px-6 mb-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  : "shadow appearance-none border border-red-500 rounded w-full py-4 px-6 text-gray-700 mb-6 leading-tight focus:outline-none focus:shadow-outline"
              }
              id="name"
              type="text"
              placeholder="Stock Name"
              value={stock.name}
              onChange={handleNameChange}
              onBlur={checkIsEmpty}
            />
            {!isEmpty.name ? (
              ""
            ) : (
              <p className="text-red-500 text-md italic">
                Please fill in the Stock Name
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-4"
              htmlFor="quantity"
            >
              Stock Quantity
            </label>
            <input
              className={
                !isEmpty.quantity
                  ? "shadow appearance-none border rounded w-full py-4 px-6 mb-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  : "shadow appearance-none border border-red-500 rounded w-full py-4 px-6 text-gray-700 mb-6 leading-tight focus:outline-none focus:shadow-outline"
              }
              value={stock.quantity}
              type="number"
              onChange={handleQuantityChange}
              id="quantity"
              placeholder="00.00"
              min="0.00"
              onBlur={checkIsEmpty}
            />
            {!isEmpty.quantity ? (
              ""
            ) : (
              <p className="text-red-500 text-md italic">
                Please fill in the quantity
              </p>
            )}
          </div>

          <div class="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-4"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className={
                !isEmpty.price
                  ? "shadow appearance-none border rounded w-full py-4 px-6 mb-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  : "shadow appearance-none border border-red-500 rounded w-full py-8 px-12 text-gray-700 mb-12 leading-tight focus:outline-none focus:shadow-outline"
              }
              id="price"
              type="number"
              placeholder="$00.00"
              min="0.00"
              value={stock.price}
              onChange={handlePriceChange}
              onBlur={checkIsEmpty}
            />
            {!isEmpty.price ? (
              ""
            ) : (
              <p className="text-red-500 text-md italic">
                Please fill in the price
              </p>
            )}
          </div>
          <div class="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-4"
              htmlFor="price"
            >
              Category
            </label>
            <input
              className={
                !isEmpty.price
                  ? "shadow appearance-none border rounded w-full py-4 px-6 mb-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  : "shadow appearance-none border border-red-500 rounded w-full py-8 px-12 text-gray-700 mb-12 leading-tight focus:outline-none focus:shadow-outline"
              }
              id="category"
              type="string"
              placeholder="Uncategories"
              value={stock.category}
              onChange={handleCategoryChange}
              onBlur={checkIsEmpty}
            />
            {!isEmpty.category ? (
              ""
            ) : (
              <p className="text-red-500 text-md italic">
                Please fill in your category
              </p>
            )}
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
