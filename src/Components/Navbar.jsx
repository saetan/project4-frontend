import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar(props) {
  let checkState = useSelector((state) => state.states.isLoggedIn);
  let currentRole = useSelector((state) => state.states.role);
  let roleView;

  let adminView = (
    <>
      <Link
        to={"./dashboard/overview"}
        className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
      >
        Overview
      </Link>
      <Link
        to={"./dashboard/stockspage"}
        className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
      >
        Stocks Page
      </Link>
      <Link
        to={"./dashboard/userspage"}
        className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
      >
        Users
      </Link>
      <Link
        to={"./dashboard/incomingorders"}
        className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
      >
        Incoming Orders
      </Link>
      <Link
        to={"./dashboard/outgoingorders"}
        className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
      >
        Outgoing Orders
      </Link>
    </>
  );

  let employeeView = (
    <>
      <Link
        to={"./dashboard/overview"}
        className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
      >
        Overview
      </Link>
      <Link
        to={"./dashboard/stockspage"}
        className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
      >
        Stocks Page
      </Link>

      <Link
        to={"./dashboard/incomingorders"}
        className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
      >
        Incoming Orders
      </Link>
      <Link
        to={"./dashboard/outgoingorders"}
        className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
      >
        Outgoing Orders
      </Link>
    </>
  );

  let supplierView = (
    <>
      <Link
        to={"./dashboard/incomingorders"}
        className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
      >
        Incoming Orders
      </Link>
    </>
  );

  let customerView = (
    <>
      <Link
        to={"./dashboard/outgoingorders"}
        className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
      >
        Outgoing Orders
      </Link>
    </>
  );

  if (currentRole === "admin") {
    console.log("setting nav to admin");
    roleView = adminView;
  } else if (currentRole === "employee") {
    console.log("setting nav to employee");
    roleView = employeeView;
  } else if (currentRole === "supplier") {
    roleView = supplierView;
    console.log("setting nav to supplierView");
  } else if (currentRole === "customer") {
    console.log("setting nav to customerView");
    roleView = customerView;
  }

  return (
    <nav className="flex items-center justify-between flex-wrap p-6 bg-lightseagreen min-w-full w-screen">
      <div className="flex items-center flex-shrink-0 text-azure mr-6">
        <svg
          className="fill-current h-8 w-8 mr-2"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
        </svg>
        <span className="font-semibold text-xl tracking-tight">
          Bubble Tea Management System
        </span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">{checkState ? roleView : ""}</div>
        <div>
          {checkState ? (
            <Link
              to="/logout"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
