import React from "react";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { marketOptions } from "app/constants";

const marketFilterOptions = [
  {
    value: "",
    label: "All",
  },
  ...marketOptions,
];

function FilterCustomerMarket(props) {
  const { market, setMarket } = props;
  return (
    <div className="w-full h-auto flex">
      <div className="w-36 shrink-0 py-1.5">
        <p className="text-lg font-semibold">Market: </p>
      </div>

      <div className="w-[calc(100%-144px)] h-auto flex items-center pl-4">
        <RadioGroup
          row
          value={market}
          onChange={(event) => {
            setMarket(event.target.value);
          }}
        >
          {marketFilterOptions.map((item) => (
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

export default FilterCustomerMarket;
