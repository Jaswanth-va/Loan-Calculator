import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import Layout from "./Layout.jsx";
import ExchangeRates from "./ExchangeRates.jsx";
import MyThemeProvider from "./GobalContext.jsx";
import ErrorPage from "./ErrorPage.jsx";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/Loan-Calculator/",
    element: <Layout />,
    children: [
      {
        path: "/Loan-Calculator/",
        element: <Dashboard />,
        error: <ErrorPage message={"Something went wrong"} />,
      },
      {
        path: "exchange_rates_live",
        element: <ExchangeRates />,
        error: <ErrorPage message={"Something went wrong"} />,
      },
      {
        path: "*",
        element: <ErrorPage />,
        error: <ErrorPage message={"Something went wrong"} />,
      },
    ],
  },
]);

function App() {
  return (
    <MyThemeProvider>
      <RouterProvider router={router} />
    </MyThemeProvider>
  );
}

export default App;
