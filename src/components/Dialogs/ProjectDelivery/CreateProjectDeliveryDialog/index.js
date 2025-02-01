import React, { useEffect, useState } from "react";
import CommonDialog from "../../CommonDialog";
import { DialogTitle } from "@mui/material";

import DeliveryDialogFormContent from "../DeliveryDialogFormContent";
import { callApiStatus } from "app/constants";
import { projectServices } from "app/services/api";
import PageLoadingBackdrop from "../../../PageStatus/PageLoadingBackdrop";

function CreateProjectDeliveryDialogContent(props) {
  const { handleCreateSuccess, handleClose, projectId } = props;

  const [createStatus, setCreateStatus] = useState(callApiStatus.idle);

  const handleSubmitForm = async (formData) => {
    if (createStatus === callApiStatus.loading) return;

    setCreateStatus(callApiStatus.loading);
    projectServices
      .createDelivery(projectId, formData)
      .then((res) => {
        // TODO:
        setCreateStatus(callApiStatus.idle);
        if (typeof handleCreateSuccess === "function") handleCreateSuccess();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        setCreateStatus(callApiStatus.idle);
      });
  };

  return (
    <>
      <DialogTitle
        style={{
          padding: "24px 24px 12px 24px",
        }}
        id="scroll-dialog-title"
      >
        <div className="w-full h-auto flex flex-col items-center justify-center">
          <h2 className="w-full h-12 text-[32px] font-medium text-start">
            Add new delivery
          </h2>
        </div>
      </DialogTitle>
      <DeliveryDialogFormContent handleSubmitForm={handleSubmitForm} handleClose={handleClose} />

      <PageLoadingBackdrop open={createStatus === callApiStatus.loading} />
    </>
  );
}

function CreateProjectDeliveryDialog(props) {
  const { open, handleClose, projectId, handleCreateSuccess } = props;

  return (
    <CommonDialog open={open} handleClose={handleClose}>
      <CreateProjectDeliveryDialogContent
        projectId={projectId}
        handleCreateSuccess={handleCreateSuccess}
        handleClose={handleClose}
      />
    </CommonDialog>
  );
}

export default CreateProjectDeliveryDialog;
