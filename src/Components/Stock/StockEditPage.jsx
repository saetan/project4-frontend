import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function StockEditPage(props) {
  let { id } = useParams();
  const [stockData, setStockData] = useState({});
  const [isDisabled, setDisabled] = useState(false);
  const [isEmpty, setEmpty] = useState({
    skuID: false,
    name: false,
    quantity: false,
    price: false,
    category: false,
  });

  const { triggerRefresh, setTriggerRefresh } = props;

  useEffect(() => {
    console.log("UseEffect Called");
    retrieveStockData();
    checkIsDisabled();
  }, [triggerRefresh]);

  //Retrieve
  const retrieveStockData = async () => {
    try {
      const stocksResponse = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/stocks/${id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const stock = await stocksResponse.json();

      //Set UserList if user is not empty
      if (stock.status !== 200) {
        console.log(stock.result);
      } else if (stock.status === 200) {
        setStockData(stock.data);
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
    if (!stockData[fillName]) {
      newIsEmpty[event.currentTarget.id] = true;
      setEmpty(newIsEmpty);
      return;
    } else {
      if (stockData[fillName]) {
        newIsEmpty[event.currentTarget.id] = false;
        setEmpty(newIsEmpty);
        return;
      }
    }
  };

  const updateStockData = async () => {
    try {
      const stocksResponse = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/stocks/${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(stockData),
        }
      );

      const stock = await stocksResponse.json();

      //Set stockList if stock is not empty
      if (stock.status !== 200) {
        console.log(stock.result);
      } else if (stock.status === 200) {
        Swal.fire(`Updated ${stock.message}`);
        console.log("Triggering refresh");
        setTriggerRefresh(!triggerRefresh);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const checkIsDisabled = () => {
    console.log("Checking");
    if (
      stockData.price &&
      stockData.name &&
      stockData.quantity &&
      stockData.category &&
      stockData.skuID
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleNameChange = (event) => {
    setStockData({
      ...stockData,
      name: event.currentTarget.value,
    });
  };

  const handlePriceChange = (event) => {
    setStockData({
      ...stockData,
      price: event.currentTarget.value,
    });
  };

  const handleQuantityChange = (event) => {
    setStockData({
      ...stockData,
      quantity: event.currentTarget.value,
    });
  };

  const handleCategoryChange = (event) => {
    setStockData({
      ...stockData,
      category: event.currentTarget.value,
    });
  };

  const handleSKUIDChange = (event) => {
    setStockData({
      ...stockData,
      skuID: event.currentTarget.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const getResponse = await updateStockData();
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
              placeholder={stockData.skuID}
              value={stockData.skuID}
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
              placeholder={stockData.name}
              value={stockData.name}
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
              value={stockData.quantity}
              type="number"
              onChange={handleQuantityChange}
              id="quantity"
              type="number"
              placeholder={stockData.quantity}
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
              placeholder={stockData.price}
              min="0.00"
              value={stockData.price}
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
              placeholder={stockData.category}
              value={stockData.category}
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
