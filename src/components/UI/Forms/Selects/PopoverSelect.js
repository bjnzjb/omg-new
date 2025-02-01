import React, { useEffect, useMemo, useRef, useState } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CommonPopoverMenu from "../CommonPopoverMenu";
import { MenuItem } from "@mui/material";

function PopoverSelect(props) {
  const { selectedValue, setSelectedValue, options, disabled } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectWidth, setSelectWidth] = useState(0);

  const selectRef = useRef();
  useEffect(() => {
    if (selectRef.current) setSelectWidth(selectRef.current.offsetWidth);
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (value) => {
    setSelectedValue(value);
    handleClose();
  };

  const selectedLabel = useMemo(() => {
    const selectedObj = options.find((item) => item.value === selectedValue);
    return selectedObj?.label || null;
  }, [selectedValue, options]);

  return (
    <>
      <button
        type="button"
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
        className={`w-full h-full flex border border-[#9ca3af] rounded !outline-none hover:border-gray-700 ${
          Boolean(anchorEl) ? "!border-blue-500" : ""
        } ${disabled ? "bg-inherit" : "bg-white"}`}
        ref={selectRef}
        disabled={disabled}
      >
        <div className="w-[calc(100%-32px)] h-full">
          <div className="w-full h-full px-2.5 flex items-center">{selectedLabel}</div>
        </div>
        <div className="w-8 h-full flex items-center justify-center">
          <div>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>
      </button>

      <CommonPopoverMenu
        slotProps={{
          paper: {
            style: { width: selectWidth + "px" },
          },
        }}
        open={Boolean(anchorEl) && !disabled}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <div className="w-full h-full flex flex-col max-h-[320px] overflow-y-auto">
          {options.map((option) => (
            <MenuItem
              key={option.value}
              selected={selectedValue === option.value}
              onClick={() => handleSelect(option.value)}
              className="!font-bai-jamjuree"
            >
              {option.label}
            </MenuItem>
          ))}
        </div>
      </CommonPopoverMenu>
    </>
  );
}

export default PopoverSelect;
