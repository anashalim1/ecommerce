import React from "react";
import styles from "./loader.module.css"; // ✅ Correct import for CSS Modules

export default function Loader() {
  return (
    <div className={styles["lds-roller"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
