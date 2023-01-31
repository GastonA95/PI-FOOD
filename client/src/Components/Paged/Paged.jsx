import React from "react";
import styles from "./Paged.module.css";

export default function Paged({ recipePerPage, recipes, paged, currentPage }) {
  const pageNumber = [];

  for (let i = 0; i <= Math.floor(recipes / recipePerPage); i++) {
    pageNumber.push(i + 1);
  }

  if (pageNumber.length > 1) {
    return (
      <div className={styles.paged}>
        {pageNumber &&
          pageNumber.map((num) => (
            <button
              key={"paged" + num}
              onClick={() => {
                paged(num);
              }}
              value={num}
              className={currentPage === num ? styles.active : null}
            >
              {" "}
              {num}{" "}
            </button>
          ))}
      </div>
    );
  } else {
    return <div></div>;
  }
}
