import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function IncomingOrderEditPage(props) {
  let { id } = useParams();
  const [orderData, setOrderData] = useState({});
  const [isDisabled, setDisabled] = useState(false);
  const [isEmpty, setEmpty] = useState({
    skuID: false,
    orderId: false,
    stockName: false,
    quantity: false,
    price: false,
  });

  const { triggerRefresh, setTriggerRefresh } = props;

  useEffect(() => {
    console.log("UseEffect Called");
    retrieveOrderData();
  }, [triggerRefresh]);

  useEffect(() => {
    checkIsDisabled();
  });

  //Retrieve
  const retrieveOrderData = async () => {
    try {
      const orderResponse = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/orders/incoming/${id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const order = await orderResponse.json();

      //Set UserList if user is not empty
      if (order.status !== 200) {
        console.log(order.result);
      } else if (order.status === 200) {
        setOrderData(order.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const checkIsEmpty = (event) => {
    let fillName = event.currentTarget.id;
    let newIsEmpty = {
      ...isEmpty,
    };
    if (!orderData[fillName]) {
      newIsEmpty[event.currentTarget.id] = true;
      setEmpty(newIsEmpty);
      return;
    } else {
      if (orderData[fillName]) {
        newIsEmpty[event.currentTarget.id] = false;
        setEmpty(newIsEmpty);
        return;
      }
    }
  };

  const updateOrderData = async () => {
    try {
      const orderResponse = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/orders/incoming/${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const order = await orderResponse.json();

      //Set stockList if stock is not empty
      if (order.status !== 200) {
        console.log(order.result);
      } else if (order.status === 200) {
        Swal.fire(`Updated ${order.message}`);
        console.log("Triggering refresh");
        setTriggerRefresh(!triggerRefresh);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const checkIsDisabled = () => {
    console.log("Checking isDisabled");
    console.log(orderData);
    if (
      orderData.stockName &&
      orderData.price &&
      orderData.quantity &&
      orderData.orderId &&
      orderData.skuID
    ) {
      console.log("Setting isDisabled to false");
      setDisabled(false);
    } else {
      console.log("Setting isDisabled to true");
      setDisabled(true);
    }
  };

  const handleNameChange = (event) => {
    setOrderData({
      ...orderData,
      stockName: event.currentTarget.value,
    });
  };

  const handlePriceChange = (event) => {
    setOrderData({
      ...orderData,
      price: event.currentTarget.value,
    });
  };

  const handleQuantityChange = (event) => {
    setOrderData({
      ...orderData,
      quantity: event.currentTarget.value,
    });
  };

  const handleCategoryChange = (event) => {
    setOrderData({
      ...orderData,
      orderId: event.currentTarget.value,
    });
  };

  const handleSKUIDChange = (event) => {
    setOrderData({
      ...orderData,
      skuID: event.currentTarget.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const getResponse = await updateOrderData();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="w-full max-w flex justify-center items-center h-full">
        <form className="bg-white shadow-md rounded-lg px-12 pt-2 mt-6 pb-6 mb-6">
          <div class="mb-4 mt-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-4"
              for="skuid"
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
              placeholder={orderData.skuID}
              value={orderData.skuID}
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
              for="stockName"
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
              placeholder={orderData.stockName}
              value={orderData.stockName}
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
              for="quantity"
            >
              Stock Quantity
            </label>
            <input
              className={
                !isEmpty.quantity
                  ? "shadow appearance-none border rounded w-full py-4 px-6 mb-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  : "shadow appearance-none border border-red-500 rounded w-full py-4 px-6 text-gray-700 mb-6 leading-tight focus:outline-none focus:shadow-outline"
              }
              value={orderData.quantity}
              type="number"
              onChange={handleQuantityChange}
              id="quantity"
              type="number"
              placeholder={orderData.quantity}
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
              for="price"
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
              placeholder={orderData.price}
              min="0.00"
              value={orderData.price}
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
              for="price"
            >
              Order ID
            </label>
            <input
              className={
                !isEmpty.price
                  ? "shadow appearance-none border rounded w-full py-4 px-6 mb-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  : "shadow appearance-none border border-red-500 rounded w-full py-8 px-12 text-gray-700 mb-12 leading-tight focus:outline-none focus:shadow-outline"
              }
              id="orderId"
              type="string"
              placeholder={orderData.orderId}
              value={orderData.orderId}
              onChange={handleCategoryChange}
              onBlur={checkIsEmpty}
            />
            {!isEmpty.orderId ? (
              ""
            ) : (
              <p className="text-red-500 text-md italic">
                Please fill in your Order ID
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
