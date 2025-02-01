import React, { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const customStyles = {
  control: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: "white",
    border: isFocused ? "1px solid #3c82f6" : "1px solid #9ca3af",
    boxShadow: "none",
    height: "42px",
  }),
  input: (styles) => ({ ...styles, lineHeight: "24px", margin: 0, padding: 0 }),
};

export default function SelectMultiple(props) {
  const {
    id,
    value,
    onChange,
    label,
    options,
    touched,
    setTouched,
    errors,
    ...rest
  } = props;

  const inputId = useMemo(() => {
    if (!id) {
      return uuidv4();
    }
    return id;
  }, [id]);

  const selectedOption = useMemo(() => {
    if (!Array.isArray(options)) return undefined;
    return options.find((item) => item.value === value);
  }, [value, options]);

  return (
    <>
      <div className="w-full h-auto mb-3">
        <label htmlFor={inputId} className="text-base font-semibold block mb-1">
          {props.fieldIsRequired ? (
            <span className="text-red-500">*</span>
          ) : null}
          {label}
        </label>

        <div className="w-full h-[42px]">
          <Select
            id={id}
            className="basic-single"
            classNamePrefix="select"
            isSearchable={true}
            isClearable={true}
            name="color"
            options={options}
            styles={customStyles}
            value={selectedOption}
            onChange={(newSelected) => {
              onChange(newSelected ? newSelected.value : undefined);
            }}
            {...rest}
            onMenuClose={setTouched}
          />
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
    </>
  );
}
