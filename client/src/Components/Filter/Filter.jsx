import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  orderByName,
  orderByScore,
  filterRecipesByDiet,
} from "../../Redux/Action";

import styles from "./Filter.module.css";

export default function Filter({ setCurrentPage, setOrder }) {
  const diets = useSelector((store) => store.diets);
  const dispatch = useDispatch();

  const handleFilterDiet = (e) => {
    e.preventDefault();
    dispatch(filterRecipesByDiet(e.target.value));
    setCurrentPage(1);
  };

  const handleSortName = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  };

  const handleSortScore = (e) => {
    e.preventDefault();
    dispatch(orderByScore(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  };

  return (
    <div className={styles.filter}>
      <select
        onChange={(e) => {
          handleFilterDiet(e);
        }}
      >
        <option>All Diets</option>
        {diets.map((d) => (
          <option>{d}</option>
        ))}
      </select>
      <select
        onChange={(e) => {
          handleSortName(e);
        }}
      >
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
      <select
        onChange={(e) => {
          handleSortScore(e);
        }}
      >
        <option value="asc">Score 0 - 100</option>
        <option value="desc">Score 100 - 0</option>
      </select>
    </div>
  );
}
