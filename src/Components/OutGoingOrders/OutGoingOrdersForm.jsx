import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import AutoSearchBar from "../AutoSearchBar";

export default function OutGoingOrdersForms() {
  const [order, setOrder] = useState({
    skuID: "",
    stockName: "",
    quantity: 0,
    price: 0.0,
    orderId: "",
  });

  const [isEmpty, setEmpty] = useState({
    skuID: false,
    stockName: false,
    quantity: false,
    price: false,
    orderId: false,
  });

  const [selected, setSelected] = useState({
    _id: "empty",
    skuID: "",
    name: "",
    quantity: 0,
    price: 0,
    category: "uwu",
  });

  const [isDisabled, setDisabled] = useState(true);
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    checkIsDisabled();
  }, [order]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selected) {
      setOrder({ ...order, stockName: selected.name, price: selected.price });
    }
  }, [selected]);

  const refreshForm = (event) => {
    setOrder({
      skuID: "",
      stockName: "",
      quantity: 0,
      price: 0.0,
      orderId: "",
    });
  };

  const checkIsEmpty = (event) => {
    let fillName = event.currentTarget.id;
    let newIsEmpty = {
      ...isEmpty,
    };
    if (!order[fillName]) {
      newIsEmpty[event.currentTarget.id] = true;
      setEmpty(newIsEmpty);
      return;
    } else {
      if (order[fillName]) {
        newIsEmpty[event.currentTarget.id] = false;
        setEmpty(newIsEmpty);
        return;
      }
    }
  };

  const fetchData = async () => {
    try {
      const stocksDataResponse = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/stocks`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (stocksDataResponse.status === 200) {
        const stocksData = await stocksDataResponse.json();
        if (stocksData) {
          setStocks(stocksData.data);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const checkIsDisabled = () => {
    console.log("Checking");
    if (
      order.price &&
      order.stockName &&
      order.quantity &&
      order.orderId &&
      order.skuID
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleNameChange = (event) => {
    setOrder({
      ...order,
      stockName: event.currentTarget.value,
    });
  };

  const handlePriceChange = (event) => {
    setOrder({
      ...order,
      price: event.currentTarget.value,
    });
  };

  const handleQuantityChange = (event) => {
    setOrder({
      ...order,
      quantity: event.currentTarget.value,
    });
  };

  const handleorderIdChange = (event) => {
    setOrder({
      ...order,
      orderId: event.currentTarget.value,
    });
  };

  const handleSKUIDChange = (event) => {
    setOrder({
      ...order,
      skuID: event.currentTarget.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/orders/outgoing`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        }
      );

      const decodedResponse = await response.json();

      if (response.status === 200) {
        Swal.fire("Add order Successful Successful");
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
          <div className="mb-4 mt-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-lg font-bold mb-4"
                for="orderId"
              >
                Order ID
              </label>
              <input
                className={
                  !isEmpty.orderId
                    ? "shadow appearance-none border rounded w-full py-4 px-6 mb-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    : "shadow appearance-none border border-red-500 rounded w-full py-8 px-12 text-gray-700 mb-12 leading-tight focus:outline-none focus:shadow-outline"
                }
                id="orderId"
                type="string"
                placeholder="Order Number"
                value={order.orderId}
                onChange={handleorderIdChange}
                onBlur={checkIsEmpty}
              />
              {!isEmpty.orderId ? (
                ""
              ) : (
                <p className="text-red-500 text-md italic">
                  Please fill in your OrderID
                </p>
              )}
            </div>

            <label
              className="block text-gray-700 text-lg font-bold mb-4"
              for="skuid"
            >
              SKU ID
            </label>
            <AutoSearchBar
              stocks={stocks}
              selected={selected}
              setSelected={setSelected}
              order={order}
              setOrder={setOrder}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-4"
              for="stockName"
            >
              order Name
            </label>
            <input
              disabled
              className={
                !isEmpty.stockName
                  ? "shadow appearance-none border rounded w-full py-4 px-6 mb-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  : "shadow appearance-none border border-red-500 rounded w-full py-4 px-6 text-gray-700 mb-6 leading-tight focus:outline-none focus:shadow-outline"
              }
              id="stockName"
              type="text"
              placeholder="stockName"
              value={selected.name}
              onChange={handleNameChange}
              onBlur={checkIsEmpty}
            />
            {!isEmpty.stockName ? (
              ""
            ) : (
              <p className="text-red-500 text-md italic">
                Please fill in the stock name
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-4"
              for="quantity"
            >
              order Quantity
            </label>
            <input
              className={
                !isEmpty.quantity
                  ? "shadow appearance-none border rounded w-full py-4 px-6 mb-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  : "shadow appearance-none border border-red-500 rounded w-full py-4 px-6 text-gray-700 mb-6 leading-tight focus:outline-none focus:shadow-outline"
              }
              value={order.quantity}
              type="number"
              onChange={handleQuantityChange}
              id="quantity"
              type="number"
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

          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-4"
              for="price"
            >
              Price
            </label>
            <input
              disabled
              className={
                !isEmpty.price
                  ? "shadow appearance-none border rounded w-full py-4 px-6 mb-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  : "shadow appearance-none border border-red-500 rounded w-full py-8 px-12 text-gray-700 mb-12 leading-tight focus:outline-none focus:shadow-outline"
              }
              id="price"
              type="number"
              placeholder="$00.00"
              min="0.00"
              value={selected.price}
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
