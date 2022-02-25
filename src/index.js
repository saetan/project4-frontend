import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import LoginPage from "./Routes/LoginPage";
import Dashboard from "./Routes/Dashboard";
import StocksPage from "./Routes/StocksPage";
import LogoutPage from "./Routes/LogoutPage";
import UsersPage from "./Routes/UsersPage";
import UserPage from "./Routes/UserPage";
import OverviewPage from "./Routes/OverviewPage";
import StockPage from "./Routes/StockPage";
import IncomingOrdersPage from "./Routes/IncomingOrdersPage";
import OutGoingOrdersPage from "./Routes/OutgoingOrders.page";
import IncomingOrderPage from "./Routes/IncomingOrderPage";
import OutgoingOrderPage from "./Routes/OutgoingOrderPage";
import ErrorPage from "./Routes/ErrorPage";
import store from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="logout" element={<LogoutPage />} />
            <Route path="dashboard" element={<Dashboard />}>
              <Route path="overview" element={<OverviewPage />} />
              <Route path="stockspage" element={<StocksPage />} />
              <Route path="stock/edit/:id" element={<StockPage />} />
              <Route path="userspage" element={<UsersPage />} />
              <Route path="user/edit/:id" element={<UserPage />} />
              <Route path="incomingorders" element={<IncomingOrdersPage />} />
              <Route
                path="incomingorder/edit/:id"
                element={<IncomingOrderPage />}
              />
              <Route path="outgoingorders" element={<OutGoingOrdersPage />} />
              <Route
                path="outgoingorder/edit/:id"
                element={<OutgoingOrderPage />}
              />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
