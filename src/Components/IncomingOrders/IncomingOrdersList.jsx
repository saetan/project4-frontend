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
    navigate(`/dashboard/incomingorder/edit/${event.currentTarget.id}`);
  };

  if (orderList !== []) {
    maporder = orderList.map((order) => {
      return (
        <tr
          key={order.orderId}
          className="border-b odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600"
        >
          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {order.orderId}
          </td>
          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
            {order.skuID}
          </td>
          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
            {order.stockName}
          </td>
          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
            {order.price}
          </td>
          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
            {order.quantity}
          </td>
          <td className="py-4 px-6 text-sm font-medium lg:text-right whitespace-nowrap">
            <div className="flex flex-col">
              <button
                className="text-blue-600 dark:text-blue-500 hover:underline"
                id={order._id}
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                className="text-blue-600 dark:text-blue-500 hover:underline"
                id={order._id}
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="text-blue-600 dark:text-blue-500 hover:underline"
                id={order._id}
                onClick={() => {
                  console.log(
                    "Updating Order with the following SKU ID: " + order.skuID
                  );
                  handleApproved(order);
                }}
              >
                Recieved
              </button>
            </div>
          </td>
        </tr>
      );
    });
  }

  const handleApproved = async (data) => {
    try {
      const updateStock = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/orders/incoming/approved/${data.skuID}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (updateStock.status === 200) {
        const deleteResponse = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/orders/incoming/${data._id}`,
          {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const deleteResponseMessage = await deleteResponse.json();
        if (deleteResponseMessage.status === 200) {
          await Swal.fire("Approved Success");
          setTriggerRefresh(!triggerRefresh);
        } else {
          throw new Error(deleteResponseMessage.message);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
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
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-md sm:rounded-lg lg:mt-20">
            {orderList.length ? (
              <table className="bg-azure min-w-full">
                <thead className="bg-lightseagreen">
                  <tr className="text-azure">
                    <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                      Order ID
                    </th>
                    <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                      SKU
                    </th>
                    <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                      order Name
                    </th>
                    <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                      Price
                    </th>
                    <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                      Quantity
                    </th>
                    <th className="lg:relative py-3 px-6 lg:overflow-hidden">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>{maporder}</tbody>
              </table>
            ) : (
              "No orders"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
