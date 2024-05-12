import React from "react";
import Lottie from "react-lottie-player";
import lottieJson from "./lottie-loader.json";
import styles from "styles/loader.module.css";

function Loader({ width="200px", height="200px" }) {
  return (
    <div className={styles.loaderDiv} style={{ width:width, height:height }}>
      <Lottie
        loop
        animationData={lottieJson}
        play
        style={{ width: 150, height: 150 }}
      />
    </div>
  );
}

export default Loader;
