import React, { useEffect, useState } from "react";
import CommonDialog from "../../CommonDialog";
import { DialogTitle } from "@mui/material";

import MilestoneDialogFormContent from "../MilestoneDialogFormContent";
import { callApiStatus } from "app/constants";
import { projectServices } from "app/services/api";
import PageLoadingBackdrop from "../../../PageStatus/PageLoadingBackdrop";

function CreateProjectMilestoneDialogContent(props) {
  const { handleCreateSuccess, handleClose, projectId } = props;

  const [createStatus, setCreateStatus] = useState(callApiStatus.idle);

  const handleSubmitForm = async (formData) => {
    console.log("submitted data: ", formData);
    if (createStatus === callApiStatus.loading) return;

    setCreateStatus(callApiStatus.loading);
    projectServices
      .createMilestone(projectId, formData)
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
            Add new milestone
          </h2>
        </div>
      </DialogTitle>
      <MilestoneDialogFormContent
        handleSubmitForm={handleSubmitForm}
        handleClose={handleClose}
      />

      <PageLoadingBackdrop open={createStatus === callApiStatus.loading} />
    </>
  );
}

function CreateProjectMilestoneDialog(props) {
  const { open, handleClose, projectId, handleCreateSuccess } = props;

  return (
    <CommonDialog open={open} handleClose={handleClose}>
      <CreateProjectMilestoneDialogContent
        projectId={projectId}
        handleCreateSuccess={handleCreateSuccess}
        handleClose={handleClose}
      />
    </CommonDialog>
  );
}

export default CreateProjectMilestoneDialog;
