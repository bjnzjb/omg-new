import React, { useEffect, useState } from "react";
import CommonDialog from "../../CommonDialog";
import { DialogTitle } from "@mui/material";

import DeliveryDialogFormContent from "../DeliveryDialogFormContent";
import { callApiStatus } from "app/constants";
import { projectServices } from "app/services/api";
import PageLoadingBackdrop from "../../../PageStatus/PageLoadingBackdrop";

function UpdateProjectDeliveryDialogContent(props) {
  const { handleUpdateSuccess, handleClose, updateDelivery, projectId } = props;

  const [updateStatus, setUpdateStatus] = useState(callApiStatus.idle);

  const handleSubmitForm = async (formData) => {
    console.log("submitted data: ", formData);
    if (updateStatus === callApiStatus.loading) return;

    setUpdateStatus(callApiStatus.loading);
    projectServices
      .updateDelivery(updateDelivery.id, { ...formData, project_id: projectId })
      .then((res) => {
        // TODO:
        setUpdateStatus(callApiStatus.idle);
        if (typeof handleUpdateSuccess === "function") handleUpdateSuccess();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        setUpdateStatus(callApiStatus.idle);
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
          <h2 className="w-full h-12 text-[32px] font-medium text-start">Update delivery</h2>
        </div>
      </DialogTitle>
      <DeliveryDialogFormContent
        handleSubmitForm={handleSubmitForm}
        updateDelivery={updateDelivery}
        handleClose={handleClose}
      />

      <PageLoadingBackdrop open={updateStatus === callApiStatus.loading} />
    </>
  );
}

function UpdateProjectDeliveryDialog(props) {
  const { open, handleClose, projectId, handleUpdateSuccess, updateDelivery } = props;
  return (
    <CommonDialog open={open} handleClose={handleClose}>
      <UpdateProjectDeliveryDialogContent
        projectId={projectId}
        handleUpdateSuccess={handleUpdateSuccess}
        handleClose={handleClose}
        updateDelivery={updateDelivery}
      />
    </CommonDialog>
  );
}

export default UpdateProjectDeliveryDialog;
