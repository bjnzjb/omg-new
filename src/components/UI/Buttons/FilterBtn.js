import { faAngleDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function FilterBtn(props) {
  const {
    countFilterCondition,
    isShowFilter,
    handleResetFilter,
    handleShowFilter,
  } = props;
  return (
    <button
      type="button"
      className={`w-auto h-full rounded hover:bg-gray-200 text-gray-600 flex items-center ${
        isShowFilter || countFilterCondition ? "!bg-blue-100" : ""
      }`}
      onClick={(e) => handleShowFilter(e.currentTarget)}
    >
      <div className="w-auto h-full flex items-center justify-center flex-nowrap gap-3 px-1.5">
        <svg
          width="16"
          height="16"
          fill="currentColor"
          ariaHidden="true"
          viewBox="0 0 20 20"
        >
          <path
            d="M17.857 2.877a1.52 1.52 0 01-.211 1.619l-5.157 6.163v4.727c0 .633-.392 1.2-.984 1.422l-1.938.73a1.52 1.52 0 01-2.056-1.422v-5.457L2.354 4.496A1.52 1.52 0 013.52 2h12.96c.59 0 1.127.342 1.377.877zm-1.377.643H3.52l5.396 6.45c.074.088.115.2.115.315v5.83l1.938-.73v-5.1a.49.49 0 01.115-.315l5.396-6.45z"
            clipRule="evenodd"
          ></path>
        </svg>

        <span>
          Filter
          {countFilterCondition ? <span> / {countFilterCondition}</span> : null}
        </span>
      </div>

      {!countFilterCondition ? (
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
              handleResetFilter();
            }}
            className="w-8 shrink-0 h-full flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faXmark} size="sm" />
          </button>
        </>
      )}
    </button>
  );
}

export default FilterBtn;
