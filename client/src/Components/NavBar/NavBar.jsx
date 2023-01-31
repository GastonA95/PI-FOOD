import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./NavBar.module.css";
import { getRecipes } from "../../Redux/Action";

export default function NavBar({ returnToFirstPage }) {
  const dispatch = useDispatch();

  const todasRecetas = () => {
    dispatch(getRecipes());
    returnToFirstPage();
  };

  return (
    <div className={styles.nav}>
      <div className={styles.navContainer}>
        <h1>Food App</h1>
        <Link to="/home" onClick={todasRecetas}>
          <button className={styles.button}>
            <span className={styles.button_top}>INICIO</span>
          </button>
        </Link>
        <Link to="/create">
          <button className={styles.button}>
            <span className={styles.button_top}>Create Recipe</span>
          </button>
        </Link>
        {/* <SearchBar className={styles.search} /> */}
      </div>
    </div>
  );
}
