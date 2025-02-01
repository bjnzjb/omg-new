import React from "react";
import moment from "moment";
import { defaultDateFormat } from "app/constants";
import InputDateSmall from "../../UI/Forms/InputForSearchAndFilter/InputDate";

const timeRangeOptions = [
  {
    label: "Current month",
    getValue: () => ({
      filterStart: moment().clone().startOf("month").format(defaultDateFormat),
      filterEnd: moment().clone().endOf("month").format(defaultDateFormat),
    }),
  },
  {
    label: "Previous month",
    getValue: () => ({
      filterStart: moment()
        .subtract(1, "M")
        .clone()
        .startOf("month")
        .format(defaultDateFormat),
      filterEnd: moment()
        .subtract(1, "M")
        .clone()
        .endOf("month")
        .format(defaultDateFormat),
    }),
  },
  {
    label: "Next month",
    getValue: () => ({
      filterStart: moment()
        .add(1, "M")
        .clone()
        .startOf("month")
        .format(defaultDateFormat),
      filterEnd: moment()
        .add(1, "M")
        .clone()
        .endOf("month")
        .format(defaultDateFormat),
    }),
  },
  {
    label: "Current year",
    getValue: () => ({
      filterStart: moment().clone().startOf("year").format(defaultDateFormat),
      filterEnd: moment().clone().endOf("year").format(defaultDateFormat),
    }),
  },
  {
    label: "Current quarter",
    getValue: () => ({
      filterStart: moment()
        .clone()
        .startOf("quarter")
        .format(defaultDateFormat),
      filterEnd: moment().clone().endOf("quarter").format(defaultDateFormat),
    }),
  },
];

function FilterTimeRange(props) {
  const { filterTimeRange, setFilterTimeRange } = props;

  const checkItemActive = (itemValue) => {
    return (
      itemValue?.filterStart === filterTimeRange?.filterStart &&
      itemValue?.filterEnd === filterTimeRange?.filterEnd
    );
  };
  return (
    <div className="w-full h-auto mb-4">
      <div className="w-full h-9 flex mb-2">
        <div className="w-36 shrink-0">
          <p className="text-lg font-semibold py-1">Time range: </p>
        </div>

        <div className="w-[calc(100%-144px)] h-full flex items-center">
          <div className="w-full h-auto flex items-start gap-6">
            <div className="w-1/2 h-auto">
              <InputDateSmall
                id="filter-resource-start"
                value={filterTimeRange.filterStart}
                onChange={(newValue) => {
                  setFilterTimeRange({
                    ...filterTimeRange,
                    filterStart: newValue,
                  });
                }}
                handleBlur={() => {}}
              />
            </div>

            <div className="w-1/2 h-auto">
              <InputDateSmall
                id="filter-resource-end"
                value={filterTimeRange.filterEnd}
                onChange={(newValue) => {
                  setFilterTimeRange({
                    ...filterTimeRange,
                    filterEnd: newValue,
                  });
                }}
                handleBlur={() => {}}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full inline-flex items-center gap-2">
        {timeRangeOptions.map((item) => (
          <button
            type="button"
            onClick={() => {
              setFilterTimeRange(item.getValue());
            }}
            className={`px-3 py-0.5 text-sm rounded border border-gray-400 hover:bg-gray-100 ${
              checkItemActive(item.getValue()) ? "!bg-blue-100" : ""
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterTimeRange;
