import React from "react";

import { Popover } from "@mui/material";
import FilterBtn from "app/components/UI/Buttons/FilterBtn";

function CommonFilter(props) {
  const {
    children,
    handleResetFilter,
    numberOfFilterConditionsChange,
    showMenuEl,
    setShowMenuEl,
  } = props;

  return (
    <>
      <FilterBtn
        handleShowFilter={(targetEl) => setShowMenuEl(targetEl)}
        handleResetFilter={handleResetFilter}
        countFilterCondition={numberOfFilterConditionsChange}
        isShowFilter={Boolean(showMenuEl)}
      />
      <Popover
        open={Boolean(showMenuEl)}
        anchorEl={showMenuEl}
        onClose={() => setShowMenuEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            style: {
              border: "1px solid #d0d4e3",
            },
          },
        }}
      >
        {children}
      </Popover>
    </>
  );
}

export default CommonFilter;
