import React from "react";
import "../../styles/Content.css";
import cloud from "../../assets/cloud.png";
import Photo3 from "../../assets/Photo3.png";
import { Link } from "react-router-dom";

const Content2 = () => {
  return (
    <div className="content-area1">
      <div className="text-area6">
        <div className="text">
          <h1 className="title1">
            Ready to Take Control of Your Digital Security?
          </h1>
          <p className="text">
            Join now and start managing your passwords effortlessly. Thanks to
            robust encryption, user-friendly design, and trusted security
            standards, you can browse and work online worry-free.
          </p>
        </div>
        <div className="cloudC">
          <button className="png-button">
            <Link to="/register" className="logoT ">
              <img src={cloud} alt="cloud" className="cloud" />
            </Link>
            <span>
              <Link to="/register" className="logoT ">
                Get Started
              </Link>
            </span>
          </button>
        </div>
      </div>
      <img src={Photo3} alt="photo3" className="photo1" />
    </div>
  );
};

export default Content2;