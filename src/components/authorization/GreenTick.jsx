import { useState } from "react";

function GreenTick() {
  const [isBold, setIsBold] = useState(false);

  return (
    <div
      onMouseOver={() => setIsBold(true)}
      onMouseOut={() => setIsBold(false)}
      className="h-14 w-14"
    >
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m173.898 439.404-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
          fill={!isBold ? "#46eb64" : "#19a633"}
          className="fill-000000"
        ></path>
      </svg>
    </div>
  );
}

export default GreenTick;
