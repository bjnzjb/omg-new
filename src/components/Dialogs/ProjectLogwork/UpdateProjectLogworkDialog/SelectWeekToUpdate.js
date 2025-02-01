import React, { useState } from "react";
import moment from "moment";
import {
  Popover,
} from "@mui/material";
import { DateCalendar, LocalizationProvider, PickersDay } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { getMondayOfThisWeek } from "app/utils";
import { defaultDateFormat } from "app/constants";

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "isSelected" && prop !== "isHovered",
})(({ theme, isSelected, isHovered, day }) => ({
  borderRadius: 0,
  ...(isSelected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.main,
    },
  }),
  ...(isHovered && {
    backgroundColor: theme.palette.primary[theme.palette.mode],
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary[theme.palette.mode],
    },
  }),
  ...(day.day() === 1 && {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  }),
  ...(day.day() === 0 && {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
}));

const isInSameWeek = (day, selectedDay) => {
  if (selectedDay == null) {
    return false;
  }

  if (day.day() !== 0) return selectedDay.isSame(day, "week");
  return selectedDay.clone().add(1, "week").isSame(day, "week");
};

function Day(props) {
  const { day, selectedDay, hoveredDay, ...other } = props;

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={{ px: 2.5 }}
      disableMargin
      selected={false}
      isSelected={isInSameWeek(day, selectedDay)}
      isHovered={isInSameWeek(day, hoveredDay)}
    />
  );
}

function SelectWeek(props) {
  const { value, setValue } = props;

  const [showCalendarEl, setShowCalendarEl] = useState(null);
  const [hoveredDay, setHoveredDay] = React.useState(null);

  const renderSelectedWeek = () => {
    if (!value) return <span>Select week</span>;

    const startOfCurrentWeek = getMondayOfThisWeek();

    if (value.isSame(startOfCurrentWeek, "day")) return <span>This week</span>;

    if (startOfCurrentWeek.clone().subtract(1, "week").isSame(value, "day")) return <span>Last week</span>;

    return <span>{`${value.format(defaultDateFormat)} ~ ${value.clone().add(6, "d").format(defaultDateFormat)}`}</span>;
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
            <DateCalendar
              value={value}
              onChange={(newValue) => {
                if (!newValue) {
                  setValue(null);
                  return;
                }

                if (newValue.day() === 0) setValue(newValue.clone().subtract(6, "d"));
                else setValue(newValue.clone().startOf("week").add(1, "d"));

                setShowCalendarEl(null);
              }}
              showDaysOutsideCurrentMonth
              slots={{ day: Day }}
              slotProps={{
                day: (ownerState) => ({
                  selectedDay: value,
                  hoveredDay,
                  onPointerEnter: () => setHoveredDay(ownerState.day),
                  onPointerLeave: () => setHoveredDay(null),
                }),
              }}
              calendarStartDay={1}
              shouldDisableDate={(day) => day && day.diff(moment()) > 0}
            />
          </LocalizationProvider>
        </div>
      </Popover>
    </>
  );
}

export default SelectWeek;
