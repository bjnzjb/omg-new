import React from "react";
import { Dialog, Zoom } from "@mui/material";

function CommonDialog(props) {
  const { open, handleClose, children, dialogProps } = props;
  return (
    <>
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
          },
        }}
        TransitionComponent={Zoom}
        {...dialogProps}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-3 right-4 w-8 h-8 rounded flex items-center justify-center text-gray-700 hover:bg-gray-200"
        >
          <svg width="28" height="28" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M6.53 5.47a.75.75 0 00-1.06 1.06l3.156 3.156-3.156 3.155a.75.75 0 101.061 1.061l3.155-3.155 3.155 3.155a.75.75 0 101.061-1.06l-3.155-3.156 3.156-3.156a.75.75 0 10-1.06-1.06L9.685 8.626 6.53 5.47z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>

        {children}
      </Dialog>
    </>
  );
}

export default CommonDialog;
