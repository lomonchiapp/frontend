import React from "react";
import { Navigation } from "../Navigation";
import { Footer } from "./Footer.jsx";

export const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
