// import logo from './logo.svg';
// import ComponentA from './ClassComponents/ComponentA';
// import ComponentA from './FC/ComponentA';
// import Flexbox from './Flexbox';
// import BootstrapDemo from './BootstrapDemo';
// import Counter from './Counter';
// import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";

import MyNavbar from "./MyNavbar";
import Login from "./Login";
import Signup from "./Signup";
import Products from "./Products";
import Loader from "./Loader";
import Toast from "./Toast";
import { loginWithCookieActionCreator } from "./reducers/userReducer";
import CartComponent from "./CartComponent";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginWithCookieActionCreator());
  }, []);

  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <Loader />
        <Toast />
        <Routes>
          <Route path="" element={<Products />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="cart" element={<CartComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
