import { useEffect, useState } from "react";

export default function UserList({ triggerRefresh }) {
  const [userList, setUserList] = useState([]);
  let mapUsers;
  useEffect(() => {
    retrieveUserList();
    console.log(userList);
  }, [triggerRefresh]);

  if (userList !== []) {
    mapUsers = userList.map((user) => {
      return (
        <tr key={user.username}>
          <td className="border border-blackpearl">{user.username}</td>
          <td className="border border-blackpearl">{user.password}</td>
          <td className="border border-blackpearl">{user.email}</td>
          <td className="border border-blackpearl">{user.type}</td>
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

      //Set Stocklist if stock is not empty
      if (usersData.status !== 200) {
        console.log(usersData.result);
      } else if (usersData.status === 200) {
        setStockList(usersData.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center font-bold text-2xl">
      {stockList.length ? (
        <table className="bg-azure border-collapse border border-blackpearl table-fixed  min-w-full min-h-screen">
          <thead className="bg-lightseagreen">
            <tr className="text-azure">
              <th className="border border-blackpearl">Username</th>
              <th className="border border-blackpearl">Password</th>
              <th className="border border-blackpearl">Email</th>
              <th className="border border-blackpearl">Type</th>
            </tr>
          </thead>
          <tbody>{mapStock}</tbody>
        </table>
      ) : (
        "No Userlist"
      )}
    </div>
  );
}
