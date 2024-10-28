import { useState } from "react";

function RedX() {
  const [isBold, setIsBold] = useState(false);

  return (
    <div
      onMouseOver={() => setIsBold(true)}
      onMouseOut={() => setIsBold(false)}
      className="h-14 w-14"
    >
      <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          d="m8 9.414-4.293 4.293-1.414-1.414L6.586 8 2.293 3.707l1.414-1.414L8 6.586l4.293-4.293 1.414 1.414L9.414 8l4.293 4.293-1.414 1.414L8 9.414z"
          fill={!isBold ? "#f03333" : "#b30000"}
          className="fill-000000"
        ></path>
      </svg>
    </div>
  );
}

export default RedX;
