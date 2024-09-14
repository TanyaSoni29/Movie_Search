import React from "react";

function Error({ error }) {
  return <div className="error"><span>❌</span>{error}</div>;
}

export default Error;
