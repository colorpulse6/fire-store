import React from "react";
import Lottie from "react-lottie";
import loading from "../book-loading.json";

export default function LoadingGif() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} height={400} width={400}></Lottie>
    </div>
  );
}
