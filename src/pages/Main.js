import React from "react";
import Navbar from "../components/main/Navbar";
import Content from "../components/main/Content";
import Content1 from "../components/main/Content1";
import Content2 from "../components/main/Content2";
import FeaturesGrid from "../components/main/FeaturesGrid";
import Footer from "../components/main/Footer";
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
