import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function UserList({ triggerRefresh, setTriggerRefresh }) {
  const [userList, setUserList] = useState([]);
  let mapUsers;
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
        <tr key={user.username}>
          <td className="border border-blackpearl">{user.username}</td>
          <td className="border border-blackpearl">{user.password}</td>
          <td className="border border-blackpearl">{user.email}</td>
          <td className="border border-blackpearl">{user.type}</td>
          <td className="border border-blackpearl">
            <div className="flex flex-col">
              <button id={user._id} onClick={handleEdit}>
                Edit
              </button>
              <button id={user._id} onClick={handleDelete}>
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
        console.log(usersData.result);
      } else if (usersData.status === 200) {
        setUserList(usersData.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center font-bold text-xl">
      {userList.length ? (
        <table className="bg-azure border-collapse border border-blackpearl table-fixed  min-w-full min-h-screen">
          <thead className="bg-lightseagreen">
            <tr className="text-azure">
              <th className="border border-blackpearl">Username</th>
              <th className="border border-blackpearl">Password</th>
              <th className="border border-blackpearl">Email</th>
              <th className="border border-blackpearl">Type</th>
              <th className="border border-blackpearl">Actions</th>
            </tr>
          </thead>
          <tbody>{mapUsers}</tbody>
        </table>
      ) : (
        "No Userlist"
      )}
    </div>
  );
}
