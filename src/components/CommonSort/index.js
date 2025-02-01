import React, { useMemo, useState } from "react";
import SortBtn from "../UI/Buttons/SortBtn";
import { Popover } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faXmark } from "@fortawesome/free-solid-svg-icons";
import PopoverSelect from "../UI/Forms/Selects/PopoverSelect";
import { v4 as uuidv4 } from "uuid";

function SortByItem(props) {
  const {
    sortByList,
    sortOptions,
    sortByItem,
    handleUpdateSort,
    handleDeleteSort,
  } = props;

  const sortKeyOptions = useMemo(() => {
    if (!Array.isArray(sortOptions)) return [];

    const availableOptions = sortOptions.filter((option) => {
      if (
        option.value === sortByItem.field ||
        !sortByList.find((item) => option.value === item.field)
      )
        return true;
      return false;
    });

    return availableOptions.map((item) => ({
      value: item.value,
      label: (
        <div className="w-full h-full flex items-center">{item.label}</div>
      ),
    }));
  }, [sortByList, sortOptions, sortByItem]);

  return (
    <div className="w-full h-9 pr-12 mb-5 relative flex">
      <div className="w-2/3 h-full pr-3">
        <PopoverSelect
          selectedValue={sortByItem.field}
          setSelectedValue={(newField) => {
            handleUpdateSort({
              field: newField,
              isAscending: sortByItem.isAscending,
            });
          }}
          options={sortKeyOptions}
        />
      </div>
      <div className="w-1/3 h-full">
        <PopoverSelect
          selectedValue={sortByItem.isAscending}
          setSelectedValue={(isAscending) => {
            handleUpdateSort({
              field: sortByItem.field,
              isAscending: isAscending,
            });
          }}
          options={[
            {
              value: true,
              label: "Ascending",
            },
            {
              value: false,
              label: "Descending",
            },
          ]}
        />
      </div>

      <button
        type="button"
        onClick={handleDeleteSort}
        className="w-9 h-full rounded-md hover:bg-gray-200 flex items-center justify-center absolute top-0 right-0"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
}

function SortBoxContent(props) {
  const { sortByProp, sortOptions, handleResetSort, handleApplySort } = props;

  const [sortBy, setSortBy] = useState(sortByProp);

  const disabledAddNewSort = useMemo(() => {
    return sortBy.length === sortOptions.length;
  }, [sortBy, sortOptions]);

  const disabledResetSort = useMemo(() => {
    if (
      (Array.isArray(sortByProp) && sortByProp.length > 0) ||
      (Array.isArray(sortBy) && sortBy.length > 0)
    )
      return false;

    return true;
  }, [sortByProp, sortBy]);

  const handleAddSort = () => {
    if (!Array.isArray(sortOptions)) return;

    const selectedField = sortOptions.find(
      (option) => !sortBy.find((item) => item.field === option.value)
    );
    if (selectedField) {
      setSortBy([
        ...sortBy,
        { tempId: uuidv4(), field: selectedField.value, isAscending: true },
      ]);
    }
  };

  const handleUpdateSortByItem = (tempId, newSortByItem) => {
    console.log("tempId", tempId);
    console.log("newSortByItem", newSortByItem);
    const updateIndex = sortBy.findIndex((item) => item.tempId === tempId);
    if (updateIndex >= 0) {
      const newSortby = [
        ...sortBy.slice(0, updateIndex),
        { tempId: tempId, ...newSortByItem },
        ...sortBy.slice(updateIndex + 1),
      ];

      console.log("newSortby", newSortby);

      setSortBy(newSortby);
    }
  };

  const handleDeleteSortByItem = (tempId) => {
    setSortBy((oldList) => oldList.filter((item) => item.tempId !== tempId));
  };

  return (
    <div className="w-[520px] h-auto">
      <div className="w-full flex items-center justify-between px-4 py-3">
        <h2 className="text-xl font-semibold text-gray-700">Sort by</h2>

        <button
          type="button"
          onClick={() => {
            if (!disabledResetSort) handleResetSort();
          }}
          className={`px-3 py-1 rounded text-sm font-normal ${
            disabledResetSort
              ? "text-gray-400"
              : "text-blue-400 hover:bg-gray-100"
          }`}
        >
          Reset all
        </button>
      </div>

      <div className="w-full h-auto px-4 pb-4">
        <div className="w-full h-auto">
          {sortBy.map((sortByItem) => (
            <SortByItem
              key={sortByItem.tempId}
              sortByList={sortBy}
              sortOptions={sortOptions}
              sortByItem={{
                field: sortByItem.field,
                isAscending: sortByItem.isAscending,
              }}
              handleUpdateSort={(newSortByItem) => {
                handleUpdateSortByItem(sortByItem.tempId, newSortByItem);
              }}
              handleDeleteSort={() => handleDeleteSortByItem(sortByItem.tempId)}
            />
          ))}
        </div>

        <div className="w-full h-8 flex items-center justify-between">
          <button
            type="button"
            onClick={handleAddSort}
            disabled={disabledAddNewSort}
            className="w-auto h-8 px-3 text-sm py-1.5 rounded text-gray-600 hover:bg-gray-200"
          >
            <FontAwesomeIcon icon={faAdd} color="inherit" />
            <span className="ml-2">Add new sort</span>
          </button>

          <button
            type="button"
            onClick={() => {
              handleApplySort(sortBy);
            }}
            className="w-auto h-8 px-3 flex items-center justify-center border border-gray-400 text-base rounded text-gray-600 hover:bg-gray-100"
          >
            <span className="">Apply sort</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function CommonSort(props) {
  const { sortByProp, setSortByProp, sortOptions } = props;

  const [showSortEl, setShowSortEl] = useState(null);

  const numberOfSort = useMemo(
    () => (Array.isArray(sortByProp) ? sortByProp.length : 0),
    [sortByProp]
  );

  const handleResetSort = () => {
    setSortByProp([]);
    setShowSortEl(null);
  };

  const handleApplySort = (newSortby) => {
    setSortByProp(newSortby);
    setShowSortEl(null);
  };

  return (
    <>
      <SortBtn
        sortBy={sortByProp}
        numberOfSort={numberOfSort}
        handleResetSort={handleResetSort}
        isShowSort={Boolean(showSortEl)}
        handleShowSort={(el) => setShowSortEl(el)}
        sortOptions={sortOptions}
      />

      <Popover
        open={Boolean(showSortEl)}
        anchorEl={showSortEl}
        onClose={() => setShowSortEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            style: {
              border: "1px solid #d0d4e3",
            },
          },
        }}
      >
        <SortBoxContent
          sortByProp={sortByProp}
          setSortByProp={setSortByProp}
          sortOptions={sortOptions}
          handleResetSort={handleResetSort}
          handleApplySort={handleApplySort}
        />
      </Popover>
    </>
  );
}

export default CommonSort;
