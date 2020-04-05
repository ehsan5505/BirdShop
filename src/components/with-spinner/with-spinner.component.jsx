import React from "react";

import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles.jsx";

// const WithSpinner = WrappedComponent => {
//   const Spinner = ({ isLoading, ...otherProps }) => {
//     return isLoading ? (
//       <SpinnerContainer>
//         <SpinnerOverlay />
//       </SpinnerContainer>
//     ) : (
//       <WrappedComponent {...otherProps} />
//     );
//   };
//   return Spinner;
// };

const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
  return isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    <WrappedComponent {...otherProps} />
  );
};

export default WithSpinner;