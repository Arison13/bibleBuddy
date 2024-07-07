import styled, { keyframes } from "styled-components";

const loadingAnimation = keyframes`
  0% {
    background-color: #ff5000;
  }
  50%, 100% {
    background-color: rgba(152, 128, 255, 0.2);
  }
`;

const StyledLoadingDots = styled.div`
  /* -----                                                     ----- */
  /* ----- Controls the center circle & all circles animations ----- */
  /* -----                                                     ----- */

  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #ff5000;
  color: #ff5000;
  animation: ${loadingAnimation} 1s infinite linear alternate;
  animation-delay: 0.5s;

  // NOTE: Aligns the loading dots perfectly within it's parent with class absolute.
  left: 15px;

  /* -----                                           ----- */
  /* ----- Controls the furthest left & right circle ----- */
  /* -----                                           ----- */
  &:before,
  &:after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
  }

  /* -----                                   ----- */
  /* ----- Controls the furthest left circle ----- */
  /* -----                                   ----- */
  &:before {
    left: -15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #ff5000;
    color: #ff5000;
    animation: ${loadingAnimation} 1s infinite alternate;
    animation-delay: 0s;
  }

  /* -----                                    ----- */
  /* ----- Controls the furthest right circle ----- */
  /* -----                                    ----- */
  &:after {
    left: 15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #ff5000;
    color: #ff5000;
    animation: ${loadingAnimation} 1s infinite alternate;
    animation-delay: 1s;
  }
`;

export const LoadingDots = ({ className }) => (
  <div className={`relative w-[40px] h-[10px] ${className}`}>
    <div className="absolute w-[40px]">
      <StyledLoadingDots />
    </div>
  </div>
);
