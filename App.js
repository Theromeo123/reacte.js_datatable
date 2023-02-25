import React from "react";
import ProductList from "./Components/salary/ProductList";
import LeaveApp from "./Components/Leave/LeaveApp";
import ReactDOM from "react-dom/client";
import App from './App'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductList/>,
  },
  {
    path: "/LeaveApp",
    element: <LeaveApp/>
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
// const App = () => {
//   return (
//     <>
//      
//     </>
//   );
// };

 export default App;
