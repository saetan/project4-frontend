import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function IncomingOrdersList({
  triggerRefresh,
  setTriggerRefresh,
}) {
  const [orderList, setOrderList] = useState([]);
  let navigate = useNavigate();

  let maporder;

  useEffect(() => {
    retrieveOrderList();
  }, [triggerRefresh]);

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
          `${process.env.REACT_APP_API_ENDPOINT}/orders/incoming/${event.target.id}`,
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
          setTriggerRefresh(!triggerRefresh);
        } else {
          throw new Error(deleteResponseMessage.message);
        }
      }
    } catch (error) {
      await Swal.fire(error.message);
    }
  };

  const handleEdit = (event) => {
    navigate(`/dashboard/order/edit/${event.currentTarget.id}`);
  };

  if (orderList !== []) {
    maporder = orderList.map((order) => {
      return (
        <tr key={order.orderId}>
          <td className="border border-blackpearl">{order.orderId}</td>
          <td className="border border-blackpearl">{order.skuID}</td>
          <td className="border border-blackpearl">{order.stockName}</td>
          <td className="border border-blackpearl">{order.price}</td>
          <td className="border border-blackpearl">{order.quantity}</td>
          <td className="border border-blackpearl">
            <div className="flex flex-col">
              <button id={order._id} onClick={handleEdit}>
                Edit
              </button>
              <button id={order._id} onClick={handleDelete}>
                Delete
              </button>
            </div>
          </td>
        </tr>
      );
    });
  }

  const retrieveOrderList = async () => {
    try {
      const ordersResponse = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/orders/incoming`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const ordersData = await ordersResponse.json();

      //Set orderlist if order is not empty
      if (ordersData.status !== 200) {
        console.log(ordersData.result);
      } else if (ordersData.status === 200) {
        setOrderList(ordersData.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center font-bold text-xl h-screen">
      {orderList.length ? (
        <table className="bg-azure border-collapse border border-blackpearl table-fixed  min-w-full min-h-screen">
          <thead className="bg-lightseagreen">
            <tr className="text-azure">
              <th className="border border-blackpearl">Order ID</th>
              <th className="border border-blackpearl">SKU</th>
              <th className="border border-blackpearl">order Name</th>
              <th className="border border-blackpearl">Price</th>
              <th className="border border-blackpearl">Quantity</th>
              <th className="border border-blackpearl">Action</th>
            </tr>
          </thead>
          <tbody>{maporder}</tbody>
        </table>
      ) : (
        "No orders"
      )}
    </div>
  );
}