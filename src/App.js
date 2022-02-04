import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <h1 className="text-green-500">Hello world!</h1>
      <Link to="/login">Login</Link>
      <Outlet />
    </>
  );
}
