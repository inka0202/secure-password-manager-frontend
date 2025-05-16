import React from "react";
import "../../styles/Content.css";
import photo1 from "../../assets/photo1.png";
import cloud from "../../assets/cloud.png";
const Content = () => {
  return (
    <div className="conteiner1">
      <div className="content-area1">
        <div className="text-area">
          <h1 className="title1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h1>
          <p className="text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            laoreet turpis in ex imperdiet, ac sodales mauris suscipit.
            Suspendisse eget ipsum in turpis laoreet ornare aliquet ut diam. In
            et vestibulum nisl. Maecenas viverra lectus non erat ullamcorper
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
        <img src={photo1} alt="photo1" className="photo1" />
      </div>
      <div className="info-line">
        <div className="card">
          <h2 className="card-title">Card 1</h2>
          <p className="card-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            laoreet.
          </p>
        </div>
        <div className="card">
          <h2 className="card-title">Card 2</h2>
          <p className="card-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            laoreet.
          </p>
        </div>
        <div className="card">
          <h2 className="card-title">Card 3</h2>
          <p className="card-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            laoreet.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Content;
