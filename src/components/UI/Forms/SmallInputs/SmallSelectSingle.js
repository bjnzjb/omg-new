import React, { useMemo } from "react";
import Select from "react-select";

const customStyles = {
  control: (styles, { isFocused, isDisabled }) => ({
    ...styles,
    backgroundColor: isDisabled ? "inherit" : "white",
    border: isFocused ? "1px solid #3c82f6" : "1px solid #9ca3af",
    boxShadow: "none",
    height: "36px",
    minHeight: "36px",
  }),
  singleValue: (styles) => ({ ...styles, color: "#000" }),
  input: (styles) => ({ ...styles, lineHeight: "24px", margin: 0, padding: 0 }),
};

export default function SmallSelectSingle(props) {
  const { id, value, onChange, options, ...rest } = props;

  const selectedValue = useMemo(() => {
    if (!Array.isArray(options)) return undefined;
    return options.find((item) => item.value === value);
  }, [value, options]);

  return (
    <div className="w-full h-9">
      <Select
        id={id}
        className="basic-single"
        classNamePrefix="select"
        isSearchable={true}
        isClearable={true}
        options={options}
        styles={customStyles}
        value={selectedValue}
        onChange={(newSelected) => {
          console.log("newSelected", newSelected);
          onChange(newSelected ? newSelected.value : undefined);
        }}
        {...rest}
      />
    </div>
  );
}
