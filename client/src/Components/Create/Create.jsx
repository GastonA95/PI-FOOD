import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDiet } from "../../Redux/Action";
import { createRecipe } from "../../Redux/Action";

import styles from "./Create.module.css";

function validate(input) {
  let errors = {};
  let score = Number(input.healthScore);
  let serv = Number(input.servings);
  let min = Number(input.readyInMinutes);

  if (!input.title) errors.title = "Campo Necesario";
  else if (/[^A-Za-z0-9 ]+/g.test(input.title))
    errors.title = "Nombre no puede tener caracteres especiales o tildes";

  if (!input.summary || input.summary === "vacio")
    errors.summary = "Campo Necesario";

  if (!input.healthScore) errors.healthScore = "Campo Necesario";
  else if (score <= 0 || score > 5) errors.difficulty = "Debe ser entre 1 y 5";

  if (!input.servings) errors.servings = "Campo Necesario";
  else if (serv <= 0 || serv > 24) errors.servings = "Debe ser entre 1 y 24";

  if (!input.readyInMinutes) errors.readyInMinutes = "Campo Necesario";
  else if (min <= 0 || min > 60)
    errors.readyInMinutes = "Debe ser entre 0 y 60";

  if (!input.analyzedInstructions || input.analyzedInstructions === "vacio")
    errors.analyzedInstructions = "Campo Necesario";

  if (!input.Cuisines || input.Cuisines === "vacio")
    errors.Cuisines = "Campo Necesario";

  if (!input.image) {
    errors.image = "Ingresar URL de alguna imagen representativa";
  }

  if (!input.diets || input.countridiets === 0)
    errors.diets = "Campo Necesario";

  return errors;
}

export default function Create() {
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const [input, setInput] = useState({
    title: "",
    summary: "",
    spoonacularScore: 0,
    healthScore: 0,
    analyzedInstructions: "",
    readyInMinutes: "",
    servings: "",
    cuisines: "",
    image: "",
    diets: [],
  });

  const dietas = useSelector((state) => state.diets);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiet());
  }, [dispatch]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleDiets = (e) => {
    if (!input.diets.includes(e.target.value)) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !input.title ||
      !input.summary ||
      !input.healthScore ||
      !input.analyzedInstructions ||
      !input.readyInMinutes ||
      !input.servings ||
      !input.cuisines ||
      !input.image ||
      !input.diets
    ) {
      return alert("Complete correctamente el formulario antes de enviarlo");
    }

    dispatch(createRecipe(input));
    alert(`${input.title} created`);
    setInput({
      title: "",
      summary: "",
      spoonacularScore: "",
      healthScore: "",
      analyzedInstructions: "",
      readyInMinutes: "",
      servings: "",
      cuisines: "",
      image: "",
      diets: [],
    });
    history.push("/home");
  }

  return (
    <div className={styles.addRecipe}>
      <div className={styles.navContainer}>
        <h1>Food App</h1>
        <Link to="/home">
          <button className={styles.button1}>
            <span className={styles.button1_top}>INICIO</span>
          </button>
        </Link>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.contenedor}>
        <div className={styles.inputConteiner}>
          <div className={styles.containerIzq}>
            <div className={styles.titleContainer}>
              <label htmlFor="title" className={styles.label1}>
                Title:
              </label>
              <input
                className={styles.input}
                type="text"
                placeholder="Title..."
                name="title"
                value={input.title}
                onChange={(e) => handleChange(e)}
              />
              {errors.title && <p>{errors.title}</p>}
            </div>
            <br />
            <div className={styles.titleContainer}>
              <label htmlFor="summary" className={styles.label1}>
                Summary:
              </label>
              <input
                className={styles.input}
                type="text"
                placeholder="Recipe summary..."
                name="summary"
                value={input.summary}
                onChange={(e) => handleChange(e)}
              />
              {errors.summary && <p>{errors.summary}</p>}
            </div>
            <br />
            <div className={styles.titleContainer}>
              <label
                htmlFor="servings"
                data-help="Numbers between 1 and 10"
                className={styles.label1}
              >
                Servings
              </label>
              <input
                className={styles.input}
                name="servings"
                type="number"
                id="servings"
                placeholder="Recipe name:"
                value={input.servings}
                min="1"
                max="10"
                onChange={(e) => handleChange(e)}
              />
              {errors.servings && <p>{errors.servings}</p>}
            </div>
            <br />
            <div className={styles.titleContainer}>
              <label
                htmlFor="readyInMinutes"
                data-help="In minutes"
                className={styles.label1}
              >
                Coocking time
              </label>
              <input
                className={styles.input}
                name="readyInMinutes"
                type="number"
                id="readyInMinutes"
                placeholder="Recipe name:"
                value={input.readyInMinutes}
                min="0"
                max="100"
                onChange={(e) => handleChange(e)}
              />
              {errors.readyInMinutes && <p>{errors.readyInMinutes}</p>}
            </div>
            <br />
            <div className={styles.titleContainer}>
              <label
                htmlFor="cuisines"
                data-help="Only letters are acepted"
                className={styles.label1}
              >
                Cuisines
              </label>
              <input
                className={styles.input}
                name="cuisines"
                type="text"
                id="cuisines"
                placeholder="Recipe name:"
                value={input.cuisines}
                onChange={(e) => handleChange(e)}
              />
              {errors.cuisines && <p>{errors.cuisines}</p>}
            </div>
            <br />
            <div className={styles.titleContainer}>
              <label htmlFor="spoonacularScore" className={styles.label}>
                Score:{" "}
              </label>
              <input
                className={styles.input}
                name="spoonacularScore"
                type="number"
                id="spoonacularScore"
                min="0"
                max="100"
                placeholder="You can put a score..."
                value={input.spoonacularScore}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className={styles.containerIzq}>
            <br />
            <div className={styles.titleContainer}>
              <label htmlFor="health-score" className={styles.label}>
                Health score:{" "}
              </label>
              <input
                className={styles.input}
                type="number"
                id="health-score"
                name="healthScore"
                placeholder="You can put a score..."
                value={input.healthScore}
                onChange={(e) => handleChange(e)}
              />
              {errors.healthScore && <p>{errors.healthScore}</p>}
            </div>
            <br />
            <div className={styles.titleContainer}>
              <label htmlFor="image" data-help="URL" className={styles.label}>
                Image{" "}
              </label>
              <input
                className={styles.input}
                name="image"
                type="url"
                id="image"
                placeholder="Image:"
                value={input.image}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <br />
            <div className={styles.titleContainer}>
              <label className={styles.label}>Instructions: </label>
              <textarea
                className={styles.input}
                type="text"
                id="analyzedInstructions"
                placeholder="How to make your recipe..."
                name="analyzedInstructions"
                value={input.analyzedInstructions}
                onChange={(e) => handleChange(e)}
              />
              {errors.analyzedInstructions && (
                <p>{errors.analyzedInstructions}</p>
              )}
            </div>
            <br />
            <div className={styles.titleContainer}>
              <label className={styles.label1}>Diets: </label>
              <select
                name="diets"
                onChange={(e) => handleDiets(e)}
                className={styles.input}
              >
                <option>choose diets</option>
                {dietas &&
                  dietas.map((d) => <option value={`${d}`}>{d}</option>)}
              </select>
              <div>
                <ul>
                  {input.diets.length
                    ? input.diets.map((d) => <li>{d}</li>)
                    : null}
                </ul>
              </div>

              {errors.diets && <p>{errors.diets}</p>}
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button
            type="submit"
            className={styles.button}
            disabled={Object.keys(errors).length === 0 ? true : false}
          >
            CREATE RECIPE
            <span></span>
          </button>
        </div>
      </form>
    </div>
  );
}
