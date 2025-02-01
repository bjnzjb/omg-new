import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      fill="currentColor"
      ariaHidden="true"
      className="icon_e0d27df956 search-icon"
      data-testid="icon"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M8.652 2.373a6.34 6.34 0 103.92 11.32l3.837 3.837a.75.75 0 101.06-1.06l-3.836-3.837a6.34 6.34 0 00-4.981-10.26zm3.439 9.744a4.84 4.84 0 10-6.879-6.81 4.84 4.84 0 006.879 6.81z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CommonSearchBox(props) {
  const { searchTextProp, setSearchTextProp } = props;
  const [searchText, setSearchText] = useState(searchTextProp);

  const handleResetSearch = () => {
    if (!searchTextProp) return;
    setSearchTextProp("");
    setSearchText("");
  };

  const updatePropsRef = useRef();

  useEffect(() => {
    setSearchText(searchTextProp);
  }, [searchTextProp]);

  useEffect(() => {
    if (updatePropsRef.current) clearTimeout(updatePropsRef.current);
    updatePropsRef.current = setTimeout(() => {
      setSearchTextProp(searchText.trim());
    }, 500);
  }, [searchText, setSearchTextProp]);

  return (
    <div className="w-44 h-full flex-1 relative">
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search"
        className="w-full h-full bg-gray-50 border border-gray-400 focus:border-blue-500 rounded outline-none shadow-none pl-3 pr-8 py-1 text-base text-gray-700"
      />

      <button
        type="button"
        onClick={handleResetSearch}
        className={`absolute top-1/2 right-1 w-6 h-6 -translate-y-1/2 rounded flex items-center justify-center text-gray-500 ${
          searchTextProp ? "hover:bg-gray-300" : "cursor-default"
        }`}
      >
        {!searchTextProp ? (
          <SearchIcon />
        ) : (
          <FontAwesomeIcon icon={faXmark} size="sm" />
        )}
      </button>
    </div>
  );
}

export default CommonSearchBox;
