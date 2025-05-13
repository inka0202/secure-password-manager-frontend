import React from "react";
import "../../styles/FeaturesGrid.css";

const FeaturesGrid = () => {
  return (
    <div className="features">
      <h2 className="title2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </h2>

      <div className="card-grid-container">
        <div className="cards">
          <h2 className="card-title">Card One</h2>
          <p className="card-description">
            This is the description for card one. It contains custom text
            specific to this card.
          </p>
        </div>

        <div className="cards">
          <h2 className="card-title">Card Two</h2>
          <p className="card-description">
            Another description here, unique for the second card. You can change
            this anytime.
          </p>
        </div>

        <div className="cards">
          <h2 className="card-title">Card Three</h2>
          <p className="card-description">
            Third card's text goes here. Perhaps some information about a
            feature or benefit.
          </p>
        </div>

        <div className="cards">
          <h2 className="card-title">Card Four</h2>
          <p className="card-description">
            Fourth card description. You can make this longer or shorter.
          </p>
        </div>

        <div className="cards">
          <h2 className="card-title">Card Five</h2>
          <p className="card-description">
            Card five with more customized text. Great for flexibility.
          </p>
        </div>

        <div className="cards">
          <h2 className="card-title">Card Six</h2>
          <p className="card-description">
            Final card in the row. Wrap it up nicely or add a call to action.
          </p>
        </div>
      </div>
    </div>
  );
};
export default FeaturesGrid;
