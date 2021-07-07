import React from "react";

export default function Title(props) {
  const { text = "", white = false, h2 = false } = props;
  return h2 ? (
    <h2 style={{ color: white ? "white" : "#303F9F", fontWeight: "bold" }}>
      {text}
    </h2>
  ) : (
    <h1 style={{ color: white ? "white" : "#303F9F", fontWeight: "bold" }}>
      {text}
    </h1>
  );
}
