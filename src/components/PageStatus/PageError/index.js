import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function PageError(props) {
  const { children } = props;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-12">
      <p className="text-red-500 mb-3">
        <FontAwesomeIcon icon={faTriangleExclamation} size="4x" />
      </p>

      <p className="text-xl text-gray-600">An error occurred, please try again</p>

      {children}
    </div>
  );
}

export default PageError;
