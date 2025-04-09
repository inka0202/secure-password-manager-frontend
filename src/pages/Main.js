import React from "react";
import Navbar from "../components/Navbar";
import Content from "../components/Content";
import Content1 from "../components/Content1";
import FeaturesGrid from "../components/FeaturesGrid";
import Content2 from "../components/Content2";
import Footer from "../components/Footer";
function Main() {
  return (
    <div>
      <Navbar />
      <Content />
      <Content1 />
      <FeaturesGrid />
      <Content2 />
      <Footer />
    </div>
  );
}

export default Main;
