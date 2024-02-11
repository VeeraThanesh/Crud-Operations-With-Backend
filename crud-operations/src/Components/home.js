import React from "react";
import Header from "./header";
import List from "./list";
import { Outlet } from "react-router-dom";
const Home = () => {
  return (
    <>
      <Header />
      <List />
      <Outlet />
    </>
  );
};

export default Home;
