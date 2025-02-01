import React from "react";
import { projectStatusOptions } from "app/constants";
import PopoverSelect from "../../UI/Forms/Selects/PopoverSelect";

const projectTypeFilterOptions = [
  {
    value: "",
    label: "All",
  },
  ...projectStatusOptions,
];

function FilterProjectStatus(props) {
  const { status, setStatus, customLabel } = props;
  return (
    <div className="w-full h-9 flex my-2">
      <div className="w-36 shrink-0">
        <p className="text-lg font-semibold py-1">{customLabel || "Project status"}</p>
      </div>

      <div className="w-[calc(100%-144px)] h-full flex items-center pl-4">
        <PopoverSelect selectedValue={status} setSelectedValue={setStatus} options={projectTypeFilterOptions} />
      </div>
    </div>
  );
}

export default FilterProjectStatus;
