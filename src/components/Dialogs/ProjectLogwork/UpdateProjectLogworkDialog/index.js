import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CommonDialog from "../../CommonDialog";
import { DialogTitle } from "@mui/material";

import SelectWeekToUpdate from "./SelectWeekToUpdate";
import { projectServices } from "../../../../services/api";
import { toast } from "react-toastify";
import { callApiDateTimeFormat, defaultDateFormat } from "../../../../constants";
import PageLoading from "../../../PageStatus/PageLoading";
import PageError from "../../../PageStatus/PageError";
import PageNoData from "../../../PageStatus/PageNoData";
import ConfirmClose from "../../ConfirmDialogs/ConfirmClose";
import { getMondayOfThisWeek } from "../../../../utils";
import UpdateProjectLogworkDialogContent from "./UpdateProjectLogworkDialogContent";
import moment from "moment";
import { date } from "yup";

function UpdateProjectLogworkDialog(props) {
  const { open, setOpen, projectId, projectResources, projectMember, handleUpdateLogworkSuccess } = props;

  const [week, setWeek] = useState(() => getMondayOfThisWeek());

  const [confirmClose, setConfirmClose] = useState(false);

  const [callApiState, setCallApiState] = useState({
    isLoading: true,
    data: [],
    error: null,
  });

  const loadLogworkData = useCallback(() => {
    setCallApiState({ isLoading: true, data: [], error: null });
    projectServices
      .getAllLogwork(projectId, {
        start: week.format(callApiDateTimeFormat),
        end: week.clone().add(1, "week").format(callApiDateTimeFormat),
      })
      .then((res) => {
        setCallApiState({
          isLoading: false,
          data: res.data,
          error: null,
        });
      })
      .catch((error) => {
        toast.error("Load logwork data fail!");
        setCallApiState({ isLoading: false, data: [], error: error });
      });
  }, [projectId, week]);

  useEffect(() => {
    if (open) loadLogworkData();
  }, [open, loadLogworkData]);

  const contentRef = useRef();

  const handleResetAndClose = () => {
    setOpen(false);
    setConfirmClose(false);
  };

  function handleClose() {
    if (contentRef.current && contentRef.current.checkHasChanged()) setConfirmClose(true);
    else handleResetAndClose();
  }

  const initData = useMemo(() => {
    const result = {};
    if (!Array.isArray(projectMember) || projectMember.length === 0 || !week) return result;

    const logworkList = Array.isArray(callApiState.data) ? callApiState.data : [];

    const memberIdKeyList = projectMember.map((item) => item.member_id);
    const dayKeyList = [week.format(defaultDateFormat)];
    for (let i = 1; i < 7; i++) {
      dayKeyList.push(week.clone().add(i, "day").format(defaultDateFormat));
    }

    memberIdKeyList.forEach((memberId) => {
      result[memberId] = {};
      dayKeyList.forEach((dayKey) => {
        const logworkItem = logworkList.find(
          (item) => item.member_id === memberId && moment(item.date).format(defaultDateFormat) === dayKey,
        );
        result[memberId][dayKey] = logworkItem?.effort || 0;
      });
    });

    return result;
  }, [projectMember, week, callApiState.data]);

  return (
    <CommonDialog open={open} handleClose={handleClose} dialogProps={{ maxWidth: "lg" }}>
      <DialogTitle
        style={{
          padding: "24px 24px 12px 24px",
        }}
        id="scroll-dialog-title"
      >
        <div className="w-full h-auto flex flex-col items-center justify-center">
          <div className="w-full h-auto flex items-center gap-6">
            <h2 className="w-auto h-12 text-[32px] font-medium text-start mb-2">Logwork</h2>

            <SelectWeekToUpdate value={week} setValue={setWeek} />
          </div>
        </div>
      </DialogTitle>

      {callApiState.isLoading ? <PageLoading /> : null}

      {!callApiState.isLoading && callApiState.error ? <PageError /> : null}

      {!callApiState.isLoading && !callApiState.error && Array.isArray(callApiState.data) ? (
        <UpdateProjectLogworkDialogContent
          week={week}
          projectId={projectId}
          projectResources={projectResources}
          projectMember={projectMember}
          handleUpdateLogworkSuccess={handleUpdateLogworkSuccess}
          logworkData={callApiState.data}
          initData={initData}
          ref={contentRef}
        />
      ) : null}

      <ConfirmClose
        open={confirmClose}
        handleClose={() => setConfirmClose(false)}
        handleResetAndClose={handleResetAndClose}
        title="Confirm close update logwork!"
      >
        <p className="py-4">There are some changes, are you sure you want to skip it?</p>
      </ConfirmClose>
    </CommonDialog>
  );
}

export default UpdateProjectLogworkDialog;
