import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@mui/material";

function SortBtn(props) {
  const {
    numberOfSort,
    handleResetSort,
    isShowSort,
    handleShowSort,
    sortBy,
    sortOptions,
  } = props;

  const renderTooltipContent = () => {
    if (!Array.isArray(sortBy) || sortBy.length === 0) return null;

    const getFieldLabel = (field) => {
      if (!Array.isArray(sortOptions)) return "";
      const option = sortOptions.find((item) => item.value === field);
      return option ? option.label : "";
    };

    return (
      <div className="w-auto h-auto">
        {sortBy.map((item) => (
          <p>{`${getFieldLabel(item.field)}: ${
            item.isAscending ? "Ascending" : "Descending"
          }`}</p>
        ))}
      </div>
    );
  };

  return (
    <Tooltip arrow title={renderTooltipContent()}>
      <button
        type="button"
        className={`w-auto h-full rounded hover:bg-gray-200 text-gray-600 flex items-center ${
          isShowSort || numberOfSort ? "!bg-blue-100" : ""
        }`}
        onClick={(e) => handleShowSort(e.currentTarget)}
      >
        <div className="w-auto h-full flex items-center justify-center flex-nowrap gap-3 px-1.5">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7.139 2.757c.208 0 .397.086.533.223l2.4 2.403a.75.75 0 01-1.06 1.061L7.888 5.318v11.74a.75.75 0 11-1.498 0V5.318L5.265 6.444a.748.748 0 11-1.06-1.06L6.61 2.976a.752.752 0 01.53-.22zm7.304 15.05a.746.746 0 00.533-.223l2.4-2.402a.75.75 0 00-1.059-1.061l-1.125 1.126V3.507a.75.75 0 10-1.498 0v11.74L12.57 14.12a.748.748 0 10-1.06 1.06l2.404 2.407a.745.745 0 00.53.22z"></path>
          </svg>

          <span>
            Sort
            {numberOfSort ? <span> / {numberOfSort}</span> : null}
          </span>
        </div>

        {!numberOfSort ? (
          <div className="w-8 h-full flex items-center justify-center text-gray-600">
            <FontAwesomeIcon icon={faAngleDown} size="sm" />
          </div>
        ) : (
          <>
            <div className="w-[1px] h-full bg-white shrink-0" />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleResetSort();
              }}
              className="w-8 shrink-0 h-full flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faXmark} size="sm" />
            </button>
          </>
        )}
      </button>
    </Tooltip>
  );
}

export default SortBtn;
