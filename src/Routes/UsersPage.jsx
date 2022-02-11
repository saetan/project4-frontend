import { useState } from "react";
import UserList from "../Components/Users/UserList";
import AddUserForm from "../Components/Users/AddUserForm";
import UsersPageNavbar from "../Components/Users/UsersPageNavBar";
import { Outlet } from "react-router-dom";

export default function UsersPage() {
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const [isAddUserPage, setToggleToAddUsersPage] = useState(false);

  return (
    <div className="flex bg-oyesterbay">
      <div className="w-64">
        <UsersPageNavbar setToggleToAddUsersPage={setToggleToAddUsersPage} />
      </div>
      <Outlet />
      <div className="w-full">
        {isAddUserPage ? (
          <AddUserForm
            setTriggerRefresh={setTriggerRefresh}
            triggerRefresh={triggerRefresh}
            setToggleToAddUsersPage={setToggleToAddUsersPage}
          />
        ) : (
          <UserList
            triggerRefresh={triggerRefresh}
            setTriggerRefresh={setTriggerRefresh}
            setToggleToAddUsersPage={setToggleToAddUsersPage}
          />
        )}
      </div>
    </div>
  );
}
