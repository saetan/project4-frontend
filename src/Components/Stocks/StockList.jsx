import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function StocksList() {
  const [stockList, setStockList] = useState([]);
  const [selfRefresh, setSelfRefresh] = useState(false);
  let isLoggedIn = useSelector((state) => state.states.isLoggedIn);
  let navigate = useNavigate();

  let mapStock;

  useEffect(() => {
    retrieveStockList();
  }, [selfRefresh]);

  const handleDelete = async (event) => {
    console.log(event.currentTarget.id);
    try {
      const warningModal = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (warningModal.isConfirmed) {
        //call delete
        const deleteResponse = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/stocks/${event.target.id}`,
          {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(deleteResponse);

        const deleteResponseMessage = await deleteResponse.json();
        if (deleteResponseMessage.status === 200) {
          await Swal.fire(deleteResponseMessage.message);
          console.log("trigger refresh");
          setSelfRefresh((prevState) => !prevState);
        } else {
          throw new Error(deleteResponseMessage.message);
        }
      }
    } catch (error) {
      await Swal.fire(error.message);
    }
  };

  const handleEdit = (event) => {
    navigate(`/dashboard/stock/edit/${event.currentTarget.id}`);
  };

  if (stockList !== []) {
    mapStock = stockList.map((stock) => {
      return (
        <tr
          key={stock.skuID}
          className="border-b odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600"
        >
          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {stock.skuID}
          </td>
          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
            {stock.name}
          </td>
          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
            {stock.price}
          </td>
          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
            {stock.quantity}
          </td>
          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
            {stock.category}
          </td>
          <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
            <div className="flex flex-col">
              <button
                className="text-blue-600 dark:text-blue-500 hover:underline"
                id={stock._id}
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                className="text-blue-600 dark:text-blue-500 hover:underline"
                id={stock._id}
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      );
    });
  }

  const retrieveStockList = async () => {
    try {
      const stocksResponse = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/stocks`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const stocksData = await stocksResponse.json();

      //Set Stocklist if stock is not empty
      if (stocksData.status !== 200) {
        if (stocksData.status === 401) {
          await Swal.fire(stocksData.result);
          if (isLoggedIn) {
            navigate("/dashboard/overview");
          } else {
            navigate("/login");
          }
        }
      } else if (stocksData.status === 200) {
        setStockList(stocksData.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-md sm:rounded-lg lg:mt-20">
            {stockList.length ? (
              <table className="bg-azure min-w-full">
                <thead className="bg-lightseagreen">
                  <tr>
                    <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                      SKU
                    </th>
                    <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                      Name
                    </th>
                    <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                      Price
                    </th>
                    <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                      Quantity
                    </th>
                    <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                      Category
                    </th>
                    <th className="relative py-3 px-6">Action</th>
                  </tr>
                </thead>
                <tbody>{mapStock}</tbody>
              </table>
            ) : (
              "No stocks"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
