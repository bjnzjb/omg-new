import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useFetchDivisionOptions } from "../../../hooks/fetchData/useFetchDivisionOptions";
import PopoverSelect from "../../UI/Forms/Selects/PopoverSelect";

function FilterDivision(props) {
  const { division, setDivision, customLabel } = props;

  const { divisionOptions, loadingDivisionStatus, fetchDivisionOptions } = useFetchDivisionOptions();

  const divisionFilterOptions = useMemo(
    () => [
      {
        value: "",
        label: "All",
      },
      ...divisionOptions,
    ],
    [divisionOptions],
  );

  useEffect(() => {
    fetchDivisionOptions();
  }, []);

  return (
    <div className="w-full h-9 flex my-2">
      <div className="w-36 shrink-0">
        <p className="text-lg font-semibold py-1">{customLabel || "Division"}</p>
      </div>

      <div className="w-[calc(100%-144px)] h-full flex items-center pl-4">
        <PopoverSelect selectedValue={division} setSelectedValue={setDivision} options={divisionFilterOptions} />
      </div>
    </div>
  );
}

export default FilterDivision;
