import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteDetail, recipeDetail } from "../../Redux/Action";
import { useParams } from "react-router";

import styles from "./CardDetail.module.css";
import healthScore from "../../Images/healthScore.png";
import clock from "../../Images/clock.png";
import world from "../../Images/worldwide.png";
import summary from "../../Images/summary.png";
import steps from "../../Images/steps.png";
import dietss from "../../Images/diet.png";
import serving from "../../Images/serving.png";
import { Link } from "react-router-dom";

export default function CardDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const detail = useSelector((state) => state.details);
  console.log("DETALLE", detail);

  if (detail.diets && typeof detail.diets[0] === "object") {
    var diet = detail.diets.map((el) => el.name);
  } else {
    var diet = detail.diets;
  }

  useEffect(() => {
    dispatch(recipeDetail(id));

    return () => {
      // SE EJECUTA CUANDO SE DESMONTA EL COMPONENTE
      dispatch(deleteDetail());
    };
  }, [dispatch, id]);

  return (
    <div className={styles.containerPrinc}>
      <div className={styles.navContainer}>
        <h1>Food App</h1>
        <Link to="/home">
          <button className={styles.button1}>
            <span className={styles.button1_top}>INICIO</span>
          </button>
        </Link>
        <Link to="/create">
          <button className={styles.button1}>
            <span className={styles.button1_top}>Create recipe</span>
          </button>
        </Link>
      </div>
      <div className={styles.container}>
        {detail.length !== 0 ? (
          <div className={styles.text}>
            <h1>{detail.name}</h1>

            <div className={styles.containerDiet}>
              <div className={styles.imagen}>
                <img
                  src={detail.image}
                  alt="not found"
                  width="500px"
                  heigth="400px"
                />
              </div>
              <div className={styles.titulos}>
                <img src={dietss} width="50px" height="50px" alt="not found" />
                <h3>Diet types:</h3>
                {detail.diets ? (
                  <ul>
                    {diet.map((d) => (
                      <li className={styles.li}>{d}</li>
                    ))}
                  </ul>
                ) : (
                  <span>No diets</span>
                )}
              </div>
            </div>

            <div className={styles.containerHRC}>
              <div className={styles.titulos}>
                <img
                  src={healthScore}
                  width="40px"
                  height="40px"
                  alt="not found"
                />
                <h3>HealthScore: " {detail.healthScore} " </h3>
              </div>
              <div className={styles.titulos}>
                <img src={clock} width="40px" height="40px" alt="not found" />
                <h3>readyInMinute: " {detail.readyInMinutes} " </h3>
              </div>
              <div className={styles.titulos}>
                <img src={world} width="40px" height="40px" alt="not found" />
                <h3>Cuisines: "{detail.cuisines}"</h3>
              </div>
            </div>
            <div className={styles.titulos}>
              <img src={summary} width="40px" height="40px" alt="not found" />
              <h3>Summary: </h3>

              <p>{detail.summary}</p>
            </div>

            <div className={styles.titulos}>
              <img src={steps} width="40px" height="40px" alt="not found" />
              <h3>Steps: </h3>
              <p>
                {" "}
                {detail.analyzedInstructions ? (
                  typeof detail.analyzedInstructions === "object" ? (
                    <ul>
                      {detail.analyzedInstructions.map((d) => (
                        <li>{d}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{detail.analyzedInstructions}</p>
                  )
                ) : (
                  <p>No steps</p>
                )}
              </p>
            </div>
          </div>
        ) : (
          <p className={styles.loader}></p>
        )}
      </div>
    </div>
  );
}
