import React from "react";
import { Dialog, Zoom } from "@mui/material";

function ConfirmClose(props) {
  const {
    open,
    handleClose,
    dialogProps,
    title,
    handleResetAndClose,
    children,
  } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth={true}
      PaperProps={{
        style: {
          minHeight: "160px",
          borderRadius: "8px",
          position: "relative",
          padding: "16px",
          maxWidth: "460px"
        },
      }}
      TransitionComponent={Zoom}
      {...dialogProps}
    >
      <div className="w-full h-full flex flex-col">
        <div className="w-full h-auto shrink-0">
          <h2 className="text-2xl font-semibold">{title}</h2>
        </div>

        <div className="w-full h-full flex-grow min-h-[80px]">{children}</div>

        <div className="w-full h-10 shrink-0 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={handleClose}
            className="text-base px-4 py-2 rounded text-gray-800 bg-white hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleResetAndClose}
            className="text-base px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600"
          >
            Confirm close
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default ConfirmClose;
