
import moment from "moment";
import React, { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { defaultDateFormat } from "../../../../constants";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";


function InputDateSmall(props) {
  const { id, value, onChange, label, handleBlur, touched, errors, ...rest } =
    props;

  const inputId = useMemo(() => {
    if (!id) {
      return uuidv4();
    }
    return id;
  }, [id]);

  const valueDate = useMemo(() => {
    if (!value) return null;

    return moment(value, defaultDateFormat);
  }, [value]);

  return (
    <div className="w-full h-auto">
      <div className="w-full h-9">
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            id={inputId}
            name={inputId}
            label=""
            value={valueDate}
            onChange={(newDate) => {
              if (!newDate) onchange("");
              else onChange(newDate.format(defaultDateFormat));
            }}
            format={defaultDateFormat}
            slotProps={{
              textField: {
                size: "small",
                sx: {
                  "& .MuiOutlinedInput-root": {
                    "& input": {
                      padding: "6px 14px",
                      color: "#1f2937",
                      fontFamily:
                        '"Bai Jamjuree", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                    },
                    "& fieldset": {
                      borderColor: "#9ca2af",
                    },
                    "&:hover fieldset": {
                      border: "1px solid #3b82f6",
                    },
                    "&.Mui-focused fieldset": {
                      border: "1px solid #3b82f6",
                    },
                  },
                  "& .MuiButtonBase-root": {
                    width: "36px",
                    height: "36px",
                  },
                },
                className: "!font-bai-jamjuree",
                onBlur: handleBlur,
                id: inputId,
                name: inputId,
              },
            }}
            className="w-full !font-bai-jamjuree"
            {...rest}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
}

export default InputDateSmall