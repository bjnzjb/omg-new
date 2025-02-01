import { Dialog, Zoom } from "@mui/material";
import React, { useEffect, useState } from "react";
import PageLoadingBackdrop from "../../../PageStatus/PageLoadingBackdrop";
import { callApiStatus } from "../../../../constants";

function ConfirmDelete(props) {
  const { open, handleClose, dialogProps, title, children, deleteAction, handleDeleteSuccess, handleDeleteError } =
    props;
  const [deleteStatus, setDeleteStatus] = useState(callApiStatus.idle);

  const handleDelete = async () => {
    console.log("deleteStatus", deleteStatus);
    console.log("deleteAction", deleteAction);
    if (deleteStatus === callApiStatus.loading) return;

    setDeleteStatus(callApiStatus.loading);
    try {
      const res = await deleteAction();
      handleClose();
      handleDeleteSuccess(res);
    } catch (error) {
      handleDeleteError(error);
    }
  };

  useEffect(() => {
    setDeleteStatus(callApiStatus.idle);
  }, [open]);

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
            onClick={handleDelete}
            className="text-base px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600"
          >
            Delete
          </button>
        </div>
      </div>

      <PageLoadingBackdrop open={deleteStatus === callApiStatus.loading} />
    </Dialog>
  );
}

export default ConfirmDelete;
