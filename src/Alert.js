import React, { useEffect } from "react";

const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 2000);
    return () => clearTimeout(timeout);
  }, [list]);
  return (
    <h2 className={`bg-${type}-200 rounded absolute top-0 bg-white p-2 mt-3`}>
      {" "}
      {msg}
    </h2>
  );
};

export default Alert;
