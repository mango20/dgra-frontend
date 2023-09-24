import React from "react";
import "../../../Asset/Scss/Components/UI/Card/_card.scss";
const Card = ({ data, hasPeso, label, borderColors }) => {
  return (
    <div className="cardContainer">
      <div className="cards">
        {data.map((val, index) => {
          return (
            <div
              key={index}
              className="cardsContent"
              style={{
                borderLeft: `4px solid ${borderColors[index] || "#007bff"}`,
              }}
            >
              <h1>
                {val} {hasPeso && <>PHP</>}
              </h1>
              <h5>{label[index]}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
