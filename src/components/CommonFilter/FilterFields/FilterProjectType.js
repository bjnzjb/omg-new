import React from "react";
import { projectTypeOptions } from "app/constants/options";
import PopoverSelect from "../../UI/Forms/Selects/PopoverSelect";

const projectTypeFilterOptions = [
  {
    value: "",
    label: "All",
  },
  ...projectTypeOptions,
];

function FilterProjectType(props) {
  const { type, setType, customLabel } = props;
  return (
    <div className="w-full h-9 flex my-2">
      <div className="w-36 shrink-0">
        <p className="text-lg font-semibold py-1">{customLabel || "Project type"}</p>
      </div>

      <div className="w-[calc(100%-144px)] h-full flex items-center pl-4">
        <PopoverSelect selectedValue={type} setSelectedValue={setType} options={projectTypeFilterOptions} />
      </div>
    </div>
  );
}

export default FilterProjectType;
