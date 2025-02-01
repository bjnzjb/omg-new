import React from "react";
import noDataImg from "app/assets/images/empty-box.png";

function PageNoData(props) {
  const { noDataMessage, noDataAction } = props;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-12">
      <img alt="no-data" className="w-24 h-24 mb-4" src={noDataImg} />
      <p className="text-xl font-semibold text-gray-600 mb-6">{noDataMessage || "No data"}</p>

      {noDataAction}
    </div>
  );
}

export default PageNoData;
