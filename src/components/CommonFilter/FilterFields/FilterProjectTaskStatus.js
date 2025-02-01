import React from "react";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { constprojectTaskStatusOptions } from "app/constants";

const projectTypeFilterOptions = [
  {
    value: "",
    label: "All",
  },
  ...constprojectTaskStatusOptions,
];

function FilterProjectTaskStatus(props) {
  const { status, setStatus, customLabel } = props;
  return (
    <div className="w-full h-9 flex">
      <div className="w-36 shrink-0">
        <p className="text-lg font-semibold py-1.5">
          {customLabel || "Task status"}
        </p>
      </div>

      <div className="w-[calc(100%-144px)] h-full flex items-center pl-4">
        <RadioGroup
          row
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
          }}
        >
          {projectTypeFilterOptions.map((item) => (
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

export default FilterProjectTaskStatus;
