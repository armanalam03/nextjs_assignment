import * as React from "react";

const HomeTabIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width={23}
    height={13}
    viewBox="0 0 23 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7 1.5h-.5a5 5 0 0 0 0 10h2a5 5 0 0 0 5-5m2.5 5h.5a5 5 0 0 0 0-10h-2a5 5 0 0 0-5 5"
      stroke="#131313"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default HomeTabIcon;
