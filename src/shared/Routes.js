import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Layout from "./Layout";
import Home from "../pages/Home";
import TodoList from "../pages/TodoList";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos/:date" element={<TodoList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
