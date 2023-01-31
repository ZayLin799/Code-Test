import React, { useEffect, useState } from "react";
import MainDrawer from "./components/ui_components/MainDrawer/MainDrawer";
import Header from "./components/ui_components/Header/Header";
import Register from "./components/custom_components/Register/Register";
import Login from "./components/custom_components/UserLogin/Login";
import LibHome from "./components/custom_components/LibHome/LibHome";
import AddBook from "./components/custom_components/ManageBook/AddBook";
import CusHome from "./components/custom_components/CusHome/CusHome";

import { Routes, Route } from "react-router-dom";

export default function App() {
  const [drawerState, setDrawerState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerState(open);
  };

  const error = (
    <div
      style={{
        marginTop: 100,
      }}
    >
      Error
    </div>
  );

  const token = localStorage.getItem("token");
  console.log("localToken", token);

  return (
    <div>
      <Header toggleDrawer={toggleDrawer} />
      <MainDrawer drawerState={drawerState} toggleDrawer={toggleDrawer} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {localStorage.getItem("token") && localStorage.getItem("role") == 1 ? (
        <Routes>
          <Route path="/libHome" element={<LibHome />} />
          <Route path="/addBook" element={<AddBook />} />
        </Routes>
      ) : localStorage.getItem("token") && localStorage.getItem("role") == 2 ? (
        <Routes>
          <Route path="/cusHome" element={<CusHome />} />
        </Routes>
      ) : null}
    </div>
  );
}
