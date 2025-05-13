import React from "react";
import "../../styles/Content.css";
import cloud from "../../assets/cloud.png";
import Photo3 from "../../assets/Photo3.png";

function Content2() {
  return (
    <div className="content-area1">
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
        <div className="cloudC">
          <button className="png-button">
            <img src={cloud} alt="cloud" className="cloud" />
            <span>Get Started</span>
          </button>
        </div>
      </div>
      <img src={Photo3} alt="photo3" className="photo1" />
    </div>
  );
}

export default Content2;
