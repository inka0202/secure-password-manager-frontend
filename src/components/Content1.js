import React from "react";
import "../styles/Content1.css";
import Photo2 from "../assets/Photo2.png";
import "../styles/Content.css";

const Content1 = () => {
  return (
    <div className="content-area">
      <img src={Photo2} alt="photo2" className="photo2" />
      <div className="text-area">
        <h1 className="title1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </h1>
        <p className="text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          laoreet turpis in ex imperdiet, ac sodales mauris suscipit.
          Suspendisse eget ipsum in turpis laoreet ornare aliquet ut diam. In et
          vestibulum nisl. Maecenas viverra lectus non erat ullamcorper
          condimentum. Morbi a tellus orci. Aenean lobortis dapibus est quis
          vulputate.
        </p>
      </div>
    </div>
  );
};
export default Content1;
