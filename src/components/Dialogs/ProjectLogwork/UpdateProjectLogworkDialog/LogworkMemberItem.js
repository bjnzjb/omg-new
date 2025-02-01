import React, { useState } from "react";
import { MenuItem, Popover } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight, faEllipsis, faPenToSquare, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import CommonPopoverMenu from "../../../UI/Forms/CommonPopoverMenu";
import moment from "moment";
import { defaultDateFormat } from "../../../../constants";

function SelectLogworkEffort(props) {
  const { value, setValue } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
      <button type="button" onClick={(e) => setAnchorEl(e.target)} className="w-16 h-7">
        {value === 0 ? (
          <div className="w-full h-full flex items-center justify-center rounded-full border bg-red-100 border-red-200 hover:border-red-400">
            Off
          </div>
        ) : null}

        {value === 0.5 ? (
          <div className="w-full h-full flex items-center justify-center rounded-full border bg-cyan-100 border-cyan-300 hover:border-cyan-400">
            50%
          </div>
        ) : null}

        {value === 1 ? (
          <div className="w-full h-full flex items-center justify-center rounded-full border bg-green-100 border-green-300 hover:border-green-400">
            100%
          </div>
        ) : null}
      </button>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            style: {
              width: "64px",
            },
          },
        }}
      >
        <div className="w-full h-auto flex flex-col py-1">
          <button
            type="button"
            onClick={() => {
              setValue(0);
              setAnchorEl(null);
            }}
            className="w-16 h-7 text-red-500 hover:bg-red-100"
          >
            Off
          </button>
          <button
            type="button"
            onClick={() => {
              setValue(0.5);
              setAnchorEl(null);
            }}
            className="w-16 h-7 text-gray-800 hover:bg-cyan-100"
          >
            50%
          </button>
          <button
            type="button"
            onClick={() => {
              setValue(1);
              setAnchorEl(null);
            }}
            className="w-16 h-7 text-gray-800 hover:bg-green-100"
          >
            100%
          </button>
        </div>
      </Popover>
    </>
  );
}

function LogworkMemberItem(props) {
  const { initData, inputData, dayKeyList, setInputData, projectResources, memberId } = props;

  const [showMenuEl, setShowMenuEl] = useState(null);

  const handleResetInput = () => {
    console.log("initData", initData);
    setInputData({ ...initData });
  };

  const handleAutocomplete = () => {
    const newInput = {};
    const memberResource = projectResources.filter((item) => item.member_id === memberId);
    const now = moment();
    dayKeyList.forEach((dayKey) => {
      const day = moment(dayKey, defaultDateFormat);

      const resourceItem = memberResource.find((item) => {
        const startResource = moment(item.start_date).hour(0);
        const endResource = moment(item.end_date).hour(0);

        return day.diff(startResource) >= 0 && endResource.diff(day) >= 0;
      });

      newInput[dayKey] = ![6, 0].includes(day.day()) && now.diff(day) >= 0 ? resourceItem?.effort || 0 : 0;
    });

    console.log("newInput : ", newInput);
    setInputData(newInput);
  };

  const getMemberName = () => {
    // TODO
    return memberId;
  };

  return (
    <>
      <div className="w-full h-auto border-b py-1">
        <div className="w-full h-full flex hover:bg-gray-100 rounded">
          <div className="w-52 h-10 px-2 py-1.5">
            <p className="text-start text-lg font-semibold text-gray-800 truncate">{getMemberName(memberId)}</p>
          </div>

          <div className="w-[calc(100%-208px)] h-full relative pr-10">
            <div className="w-full grid grid-cols-7 py-0.5">
              {dayKeyList.map((dayKey) => (
                <div className="w-full h-full flex">
                  <div className="w-[1px] h-full py-1">
                    <div className="w-full h-full bg-gray-200" />
                  </div>
                  <div className="w-full h-full px-2">
                    <div
                      className={`w-full h-full flex items-center justify-center py-1 rounded ${
                        initData?.[dayKey] !== inputData?.[dayKey] ? "bg-yellow-100" : ""
                      }`}
                    >
                      <SelectLogworkEffort
                        value={inputData?.[dayKey]}
                        setValue={(newValue) => {
                          if (inputData) setInputData({ ...inputData, [dayKey]: newValue });
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={(e) => setShowMenuEl(e.currentTarget)}
              className={`absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded ${
                showMenuEl ? "bg-slate-200" : "hover:bg-slate-200"
              }`}
            >
              <FontAwesomeIcon icon={faEllipsis} />
            </button>
          </div>
        </div>
      </div>

      <CommonPopoverMenu
        slotProps={{
          paper: {
            style: { width: "180px" },
          },
        }}
        open={Boolean(showMenuEl)}
        anchorEl={showMenuEl}
        onClose={() => setShowMenuEl(null)}
      >
        <MenuItem
          onClick={() => {
            handleResetInput();
            setShowMenuEl(null);
          }}
          className="!font-bai-jamjuree"
        >
          <div className="w-full h-full flex items-center gap-3">
            <span>
              <FontAwesomeIcon icon={faArrowRotateRight} />
            </span>
            <span>Reset input</span>
          </div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleAutocomplete();
            setShowMenuEl(null);
          }}
          className="!font-bai-jamjuree"
        >
          <div className="w-full h-full flex items-center gap-3">
            <span>
              <FontAwesomeIcon icon={faPenToSquare} />
            </span>
            <span>Autocomplete</span>
          </div>
        </MenuItem>
      </CommonPopoverMenu>
    </>
  );
}

export default LogworkMemberItem;
