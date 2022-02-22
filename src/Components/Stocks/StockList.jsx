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
        <tr key={stock.skuID}>
          <td className="border border-blackpearl">{stock.skuID}</td>
          <td className="border border-blackpearl">{stock.name}</td>
          <td className="border border-blackpearl">{stock.price}</td>
          <td className="border border-blackpearl">{stock.quantity}</td>
          <td className="border border-blackpearl">{stock.category}</td>
          <td className="border border-blackpearl">
            <div className="flex flex-col">
              <button id={stock._id} onClick={handleEdit}>
                Edit
              </button>
              <button id={stock._id} onClick={handleDelete}>
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
    <div className="flex justify-center items-center font-bold text-xl h-screen">
      {stockList.length ? (
        <table className="bg-azure border-collapse border border-blackpearl table-fixed  min-w-full min-h-screen">
          <thead className="bg-lightseagreen">
            <tr className="text-azure">
              <th className="border border-blackpearl">SKU</th>
              <th className="border border-blackpearl">Name</th>
              <th className="border border-blackpearl">Price</th>
              <th className="border border-blackpearl">Quantity</th>
              <th className="border border-blackpearl">Category</th>
              <th className="border border-blackpearl">Action</th>
            </tr>
          </thead>
          <tbody>{mapStock}</tbody>
        </table>
      ) : (
        "No stocks"
      )}
    </div>
  );
}
