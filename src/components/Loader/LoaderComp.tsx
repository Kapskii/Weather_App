import { ThreeCircles } from "react-loader-spinner";

export const Loader = () => {
  return (
    <ThreeCircles
  visible={true}
  height="100"
  width="100"
  color="#b3b3b3"
  ariaLabel="three-circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
  );
};
