import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";

const divisionFilterOptions = [
  {
    value: "",
    label: "All",
  },
  {
    value: "bu1",
    label: "BU1",
  },
  {
    value: "bu2",
    label: "BU2",
  },
  {
    value: "bu3",
    label: "BU3",
  },
  {
    value: "bu10",
    label: "BU10",
  },
];

function FilterDivision(props) {
  const { division, setDivision } = props;
  return (
    <div className="w-full h-9 flex">
      <div className="w-36 shrink-0">
        <p className="text-lg font-semibold py-1.5">Division: </p>
      </div>

      <div className="w-[calc(100%-144px)] h-full flex items-center pl-4">
        <RadioGroup
          row
          value={division}
          onChange={(event) => {
            setDivision(event.target.value);
          }}
        >
          {divisionFilterOptions.map((item) => (
            <FormControlLabel
              value={item.value}
              control={<Radio />}
              label={
                <span className="font-bai-jamjuree mr-2">
                  {item.label}
                </span>
              }
            />
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

export default FilterDivision;
