import { useState } from "react";
import UserPageNavbar from "../Components/User/UserPageNavBar";
import UserEditPage from "../Components/User/UserEditPage";

export default function UsersPage() {
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  return (
    <div className="flex bg-oyesterbay">
      <div className="w-64">
        <UserPageNavbar />
      </div>
      <UserEditPage
        setTriggerRefresh={setTriggerRefresh}
        triggerRefresh={triggerRefresh}
      />
    </div>
  );
}
