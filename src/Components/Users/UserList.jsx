import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UserList({ triggerRefresh, setTriggerRefresh }) {
  const [userList, setUserList] = useState([]);
  let mapUsers;
  let isLoggedIn = useSelector((state) => state.states.isLoggedIn);
  let navigate = useNavigate();
  useEffect(() => {
    retrieveUserList();
  }, [triggerRefresh]);

  const handleDelete = async (event) => {
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
          `${process.env.REACT_APP_API_ENDPOINT}/users/${event.target.id}`,
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

  const handleEdit = async (event) => {
    navigate(`/dashboard/user/edit/${event.currentTarget.id}`);
  };

  if (userList !== []) {
    mapUsers = userList.map((user) => {
      return (
        <tr
          key={user.username}
          className="border-b odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600"
        >
          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {user.username}
          </td>
          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
            {user.password}
          </td>
          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
            {user.email}
          </td>
          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
            {user.type}
          </td>
          <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
            <div className="flex flex-col">
              <button
                className="text-blue-600 dark:text-blue-500 hover:underline"
                id={user._id}
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                className="text-blue-600 dark:text-blue-500 hover:underline"
                id={user._id}
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

  const retrieveUserList = async () => {
    try {
      const usersResponse = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/users`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const usersData = await usersResponse.json();

      //Set UserList if user is not empty
      if (usersData.status !== 200) {
        if (usersData.status === 401) {
          await Swal.fire(usersData.result);
          if (isLoggedIn) {
            navigate("/dashboard/overview");
          } else {
            navigate("/login");
          }
        }
      } else if (usersData.status === 200) {
        setUserList(usersData.data);
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
            {userList.length ? (
              <table className="bg-azure min-w-full">
                <thead className="bg-lightseagreen">
                  <tr className="text-azure">
                    <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                      Username
                    </th>
                    <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                      Password
                    </th>
                    <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                      Email
                    </th>
                    <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                      Type
                    </th>
                    <th className="relative py-3 px-6">Actions</th>
                  </tr>
                </thead>
                <tbody>{mapUsers}</tbody>
              </table>
            ) : (
              "No Userlist"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
