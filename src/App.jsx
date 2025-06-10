import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import CartContextProvider from "./context/CartContext";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Cart from "./components/Cart/Cart";
import Notfound from "./components/Notfound/Notfound";
import Error from "./components/Error/Error";
import MyOrders from "./components/MyOrders/MyOrders";
import CheckOut from "./components/CheckOut/CheckOut";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { ToastContainer } from "react-toastify";
import "flowbite";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  //Router configuration, this variaable router is passed as props in the RouterProvider component.
  // This is the main router configuration for the application.
  //  used to define the routes and their corresponding components.
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        // This is the default route that will be rendered when the user visits the root path ("/").
        // It will render the Home component.
        // The `index` property indicates that this is the default child route.
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/products",
        element: (
          <ProtectedRoutes>
            // Protected route for products
            {/* This route is protected, meaning it requires authentication to access. */}
            {/* If the user is not authenticated, they will be redirected to the login page. */}
            {/* The Products component will be rendered if the user is authenticated. */}
            <Products />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/categories",
        element: (
          <ProtectedRoutes>
            <Categories />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/product-details/:id/:category", //the : here allows passing dynamic parameters(id) in the URL, in product component we pass pass the id to the Link
        //the id here is recived inside the [rpductDetails] component using the useParams hook,which allows passing the id to the url
        //tge category is used to add the category of the product in the url so we can filter the products insode the related products component
        element: (
          <ProtectedRoutes>
            <ProductDetails />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/brands",
        element: (
          <ProtectedRoutes>
            <Brands />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/allorders",
        element: (
          <ProtectedRoutes>
            <MyOrders />
          </ProtectedRoutes>
        ),
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoutes>
            <CheckOut />
          </ProtectedRoutes>
        ),
      },
      {
        path: "*",
        element: <Notfound />,
      },
    ],
  },
]);
const queryClient = new QueryClient(); // will be passe d as props to the QueryClientProvider below
function App() {
  // The main App component that wraps the application with AuthContextProvider and RouterProvider.
  return (
    // AuthContextProvider wraps the entire application to provide authentication context
    /* This component provides authentication context to the entire application. */
    /* It allows components to access authentication-related data and functions. */
    // if i have multiple context providers, i wrap the routerprvider with them like a nested structure:
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}> 
       
        {/* to be able to use useQuery ,following the documntation from tankstack*/}
        <CartContextProvider>
          {/* we put the cart context inside the auth contect because we want the cart to have access to the auth token */}
          <RouterProvider router={router} />
          {/* router ={router }  is passing props the the react component routerprovider , router is variable decalred above*/}
          <ToastContainer />
        </CartContextProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;
