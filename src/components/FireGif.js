import React from "react";
import Lottie from "react-lottie";
import fire from "./fire-gif.json";

export default function FireGif(props) {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: fire,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} height={100} width={100}></Lottie>
    </div>
  );
}