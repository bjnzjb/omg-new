import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "@mui/material";
import { LocalizationProvider, YearCalendar } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import React, { useState } from "react";

function SelectYear(props) {
  const { value, setValue } = props;

  const [showCalendarEl, setShowCalendarEl] = useState(null);

  const renderSelectedWeek = () => {
    if (!value) return <span>Select year</span>;

    return <span>{value.format("YYYY")}</span>;
  };

  return (
    <>
      <button
        type="button"
        onClick={(e) => setShowCalendarEl(e.currentTarget)}
        className="w-auto h-9 pl-3 pr-2 shrink-0 flex items-center gap-2 border border-gray-300 rounded"
      >
        <div className="whitespace-nowrap">{renderSelectedWeek()}</div>

        <div className="w-6 h-6 flex items-center justify-center cursor-pointer">
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
      </button>

      <Popover
        open={Boolean(showCalendarEl)}
        anchorEl={showCalendarEl}
        onClose={() => setShowCalendarEl(null)}
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
              transform: "translateY(6px)",
              border: "1px solid #d0d4e3",
            },
          },
        }}
      >
        <div>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <YearCalendar
              value={value}
              onChange={(newValue) => {
                if (!newValue) {
                  setValue(null);
                  return;
                }
                if (newValue.format("YYYY") !== value?.format("YYYY")) setValue(newValue);
                setShowCalendarEl(null);
              }}
              showDaysOutsideCurrentMonth
              shouldDisableDate={(day) => day && day.diff(moment()) > 0}
            />
          </LocalizationProvider>
        </div>
      </Popover>
    </>
  );
}

export default SelectYear;
