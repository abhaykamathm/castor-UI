import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="animate-spin rounded-full w-16 h-16 border-8 border-white border-t-blue-500 border-r-blue-500"></div>
    </div>
  );
};

export default LoadingSpinner;
