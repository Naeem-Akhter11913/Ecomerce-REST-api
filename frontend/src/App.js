import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./pages/home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/footer/Footer";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./redux/feature/auth/authSlice";
import Profile from "./pages/profile/Profile";
import { useSelector } from "react-redux"


const App = () => {
  const dispatch = useDispatch();
  axios.defaults.withCredentials = true
  const { isLoggedIn } = useSelector(state => state.auth);


  useEffect(() => {
    dispatch(getLoginStatus())
  } ,[dispatch])

  return (
    <>
      <BrowserRouter>
      <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
