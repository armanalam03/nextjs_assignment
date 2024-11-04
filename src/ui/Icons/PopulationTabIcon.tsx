import * as React from "react";

const PopulationTabIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width={21}
    height={21}
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.5 19.5H4.7c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C1.5 17.98 1.5 17.42 1.5 16.3V1.5m4 7.5v7M10 4v12m4.5-7v7M19 4v12"
      stroke="#131313"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default PopulationTabIcon;
