import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

import images from "../../Images/NOT-IMAGE.png";
import dietss from "../../Images/diet.png";
import healthScore1 from "../../Images/healthScore.png";

export default function Card({ name, diet, image, id, healthScore }) {
  if (typeof diet[0] === "object") {
    diet = diet.map((el) => el.name);
  }

  return (
    <div className={style.card}>
      <Link className={style.link} to={`/detail/${id}`}>
        <div className={style.cardInfo}>
          <div className={style.image}>
            <img src={image} alt="Not found" />
          </div>
          <div className={style.data}>
            <div className={style.dataImage}>
              <div className={style.title}>
                <h2>{name}</h2>
              </div>
              <div className={style.diets}>
                <div className={style.dietsImg}>
                  <h4>Type diet:</h4>
                  <img
                    src={dietss}
                    width="40px"
                    height="40px"
                    alt="not found"
                  />
                </div>
                <ul>
                  {diet.map((d) => (
                    <li key={d.name}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className={style.hs}>
            <div className={style.dietsImg}>
              <img
                src={healthScore1}
                width="40px"
                height="40px"
                alt="not found"
              />
              <h4>healthScore: "{healthScore}"</h4>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
