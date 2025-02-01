import React, { useMemo } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { defaultDateFormat } from "app/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function InputDate(props) {
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
    <div className="w-full h-auto mb-3">
      <label htmlFor={inputId} className="text-base font-semibold block mb-1">
        {props.fieldIsRequired ? <span className="text-red-500">*</span> : null}
        {label}
      </label>

      <div className="w-full h-[42px]">
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
      {touched && errors ? (
        <p className="w-full h-auto text-sm text-red-500 !font-bai-jamjuree pl-5 relative">
          <div className="absolute w-5 h-5 left-0 top-0 flex items-center justify-center">
            <FontAwesomeIcon icon={faCircleExclamation} size="sx" />
          </div>
          {errors}
        </p>
      ) : null}
    </div>
  );
}
