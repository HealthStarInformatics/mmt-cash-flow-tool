import React from "react";

import "../styles/CurrentMonthSummaryChart.scss";

const ProgressBar = props => {
  const divStyle = {
    height: "16",
    width: props.percentage,
    backgroundColor: "#b3c0d9"
  };
  return <div style={divStyle}></div>;
};

export default ProgressBar;
