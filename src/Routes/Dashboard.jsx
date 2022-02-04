import {Link, Outlet} from "react-router-dom"

export default function Dashboard() {
  return (
    <>
          <h1 className="text-green-500">Welcome Dashboard</h1>
          <Link to={"./stockspage"}>Stocks Page</Link>
          <Outlet/>
    </>
  );
}
