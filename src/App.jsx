import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import Layout from "./Layout.jsx";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "exchange_rates_live",
        element: <h1>Excahnge rates live</h1>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
