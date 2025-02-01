import React, { useMemo, useState } from "react";
import { MenuItem } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight, faEllipsis, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import CommonPopoverMenu from "../../../UI/Forms/CommonPopoverMenu";

function ProjectLogworkTableHeader(props) {
  const { week, resetAllInput, autoCompleteAllInput } = props;

  const [showMenuEl, setShowMenuEl] = useState(null);

  const weekDays = useMemo(() => {
    const result = [week.clone()];
    for (let i = 1; i < 7; i++) {
      result.push(week.clone().add(i, "day"));
    }

    return result;
  }, [week]);

  return (
    <>
      <div className="w-full h-12 flex bg-gray-100 text-lg sticky top-0 left-0 z-10">
        {/* Member name */}
        <div className="w-52 h-full flex items-center justify-center px-2">
          <p className="text-center">Member</p>
        </div>

        <div className="w-[calc(100%-208px)] h-full pr-10 relative">
          <div className="w-full h-full grid grid-cols-7">
            {weekDays.map((weekDay) => (
              <div key={weekDay.unix()} className="w-full h-full flex flex-col items-center justify-center">
                <p className="text-lg leading-5">{weekDay.format("DD/MM")}</p>
                <p className="text-sm leading-4 text-gray-500">{weekDay.format("ddd")}</p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={(e) => setShowMenuEl(e.currentTarget)}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded hover:bg-slate-200"
          >
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
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
            if (typeof resetAllInput === "function") resetAllInput();
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
            if (typeof autoCompleteAllInput === "function") autoCompleteAllInput();
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

export default ProjectLogworkTableHeader;
