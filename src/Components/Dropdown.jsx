import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown({ currentRole, checkState }) {
  let mobileRoleView;
  let adminMobileRoleView = (
    <>
      {checkState ? (
        <>
          <Menu.Item>
            {({ active }) => (
              <Link
                to={"./dashboard/overview"}
                className={classNames(
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block px-4 py-2 text-sm"
                )}
              >
                Overview
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                to={"./dashboard/stockspage"}
                className={classNames(
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block px-4 py-2 text-sm"
                )}
              >
                Stocks Page
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                to={"./dashboard/userspage"}
                className={classNames(
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block px-4 py-2 text-sm"
                )}
              >
                Users
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                to={"./dashboard/incomingorders"}
                className={classNames(
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block px-4 py-2 text-sm"
                )}
              >
                Incoming Orders
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                to={"./dashboard/outgoingorders"}
                className={classNames(
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block px-4 py-2 text-sm"
                )}
              >
                Outgoing Orders
              </Link>
            )}
          </Menu.Item>
        </>
      ) : (
        ""
      )}
    </>
  );
  let employeeMobileRoleView = (
    <>
      {checkState ? (
        <>
          <Menu.Item>
            {({ active }) => (
              <Link
                to={"./dashboard/overview"}
                className={classNames(
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block px-4 py-2 text-sm"
                )}
              >
                Overview
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                to={"./dashboard/stockspage"}
                className={classNames(
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block px-4 py-2 text-sm"
                )}
              >
                Stocks Page
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                to={"./dashboard/incomingorders"}
                className={classNames(
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block px-4 py-2 text-sm"
                )}
              >
                Incoming Orders
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                to={"./dashboard/outgoingorders"}
                className={classNames(
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block px-4 py-2 text-sm"
                )}
              >
                Outgoing Orders
              </Link>
            )}
          </Menu.Item>
        </>
      ) : (
        ""
      )}
    </>
  );
  let supplierMobileRoleView = (
    <>
      {checkState ? (
        <>
          <Menu.Item>
            {({ active }) => (
              <Link
                to={"./dashboard/incomingorders"}
                className={classNames(
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block px-4 py-2 text-sm"
                )}
              >
                Incoming Orders
              </Link>
            )}
          </Menu.Item>
        </>
      ) : (
        ""
      )}
    </>
  );

  let customerMobileRoleView = (
    <>
      {checkState ? (
        <>
          <Menu.Item>
            {({ active }) => (
              <Link
                to={"./dashboard/outgoingorders"}
                className={classNames(
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block px-4 py-2 text-sm"
                )}
              >
                Outgoing Orders
              </Link>
            )}
          </Menu.Item>
        </>
      ) : (
        ""
      )}
    </>
  );
  let logInOrLogOutButton = (
    <>
      {checkState ? (
        <Menu.Item>
          {({ active }) => (
            <Link
              to="/logout"
              className={classNames(
                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                "block px-4 py-2 text-sm"
              )}
            >
              Logout
            </Link>
          )}
        </Menu.Item>
      ) : (
        <Menu.Item>
          {({ active }) => (
            <Link
              to="/login"
              className={classNames(
                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                "block px-4 py-2 text-sm"
              )}
            >
              Login
            </Link>
          )}
        </Menu.Item>
      )}
    </>
  );
  if (currentRole === "admin") {
    console.log("setting mobile nav to admin");
    mobileRoleView = adminMobileRoleView;
  } else if (currentRole === "employee") {
    console.log("setting mobile nav to employee");
    mobileRoleView = employeeMobileRoleView;
  } else if (currentRole === "supplier") {
    mobileRoleView = supplierMobileRoleView;
    console.log("setting mobile nav to supplierView");
  } else if (currentRole === "customer") {
    console.log("setting mobile nav to customerView");
    mobileRoleView = customerMobileRoleView;
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button>
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
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {mobileRoleView}
            {logInOrLogOutButton}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
