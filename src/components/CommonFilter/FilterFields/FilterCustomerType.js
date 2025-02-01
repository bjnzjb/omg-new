import React from "react";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { customerTypeOptions } from "app/constants";

const customerTypeFilterOptions = [
  {
    value: "",
    label: "All",
  },
  ...customerTypeOptions,
];

function FilterCustomerType(props) {
  const { type, setType } = props;
  return (
    <div className="w-full h-auto flex">
      <div className="w-36 shrink-0 py-1.5">
        <p className="text-lg font-semibold">Customer type: </p>
      </div>

      <div className="w-[calc(100%-144px)] h-auto flex items-center pl-4">
        <RadioGroup
          row
          value={type}
          onChange={(event) => {
            setType(event.target.value);
          }}
        >
          {customerTypeFilterOptions.map((item) => (
            <FormControlLabel
              value={item.value}
              control={<Radio />}
              label={
                <span className="font-bai-jamjuree mr-2">{item.label}</span>
              }
            />
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

export default FilterCustomerType;
