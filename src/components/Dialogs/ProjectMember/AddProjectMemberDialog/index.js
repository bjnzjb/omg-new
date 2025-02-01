import React, { useState } from "react";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CommonDialog from "app/components/Dialogs/CommonDialog";
import SelectMultiple from "app/components/UI/Forms/Selects/SelectMulti";

const memberOptionsFake = [
  {
    value: 1,
    label: "member 1",
  },
  {
    value: 2,
    label: "member 2",
  },
  {
    value: 3,
    label: "member 3",
  },
  {
    value: 4,
    label: "member 4",
  },
];

function AddProjectMember(props) {
  const { open, setOpen } = props;

  const [selected, setSelected] = useState([]);

  return (
    <CommonDialog open={open} handleClose={() => setOpen(false)}>
      <DialogTitle
        style={{
          padding: "24px 24px 12px 24px",
        }}
        id="scroll-dialog-title"
      >
        <div className="w-full h-auto flex flex-col items-center justify-center">
          <h2 className="w-full h-12 text-[32px] font-medium text-start">
            Add project member
          </h2>
        </div>
      </DialogTitle>
      <DialogContent
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
          <SelectMultiple
            id="customerId"
            label="Customer"
            value={selected}
            onChange={(newValue) => setSelected(newValue)}
            options={memberOptionsFake}
            setTouched={() => {}}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions
        style={{
          padding: "24px",
          borderTop: "1px solid #c8c8c8",
        }}
      >
        <button
          type="button"
          className="text-base px-4 py-2 rounded text-gray-800 bg-white hover:bg-gray-200 mr-4"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={() => {}}
          className="text-base px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600"
        >
          Add Project
        </button>
      </DialogActions>
    </CommonDialog>
  );
}

export default AddProjectMember;
