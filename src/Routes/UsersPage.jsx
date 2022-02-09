import { useState } from "react";
import UserList from "../Components/Users/UserList";
import AddUserForm from "../Components/Users/AddUserForm";
import UsersPageNavbar from "../Components/Users/UsersPageNavBar";

export default function UsersPage() {
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const [isAddUserPage, setToggleToAddUsersPage] = useState(false);

  return (
    <div className="flex">
      <div className="w-64">
        <UsersPageNavbar setToggleToAddUsersPage={setToggleToAddUsersPage} />
      </div>
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
            setToggleToAddUsersPage={setToggleToAddUsersPage}
          />
        )}
      </div>
    </div>
  );
}
