import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { DialogActions, DialogContent, DialogContentText } from "@mui/material";

import LogworkMemberItem from "./LogworkMemberItem";
import ProjectLogworkTableHeader from "./ProjectLogworkTableHeader";
import { callApiDateTimeFormat, defaultDateFormat } from "../../../../constants";
import moment from "moment";
import { projectServices } from "../../../../services/api";

const UpdateProjectLogworkDialogContent = forwardRef(function UpdateProjectLogworkDialogContent(props, ref) {
  const { week, projectId, projectResources, projectMember, handleUpdateLogworkSuccess, logworkData, initData } = props;

  const [inputData, setInputData] = useState(initData);

  useEffect(() => {
    setInputData(initData);
  }, [initData]);

  useImperativeHandle(
    ref,
    () => {
      return {
        checkHasChanged() {
          return checkHasChanged();
        },
      };
    },
    [],
  );

  const dayKeyList = useMemo(() => {
    const result = [week.format(defaultDateFormat)];
    for (let i = 1; i < 7; i++) {
      result.push(week.clone().add(i, "day").format(defaultDateFormat));
    }
    return result;
  }, [week]);

  const checkHasChanged = () => {
    console.log("checkHasChanged");
    return true;
  };

  const resetAllInput = () => {
    setInputData({ ...initData });
  };

  const autoCompleteAllInput = () => {
    const newInputData = {};
    if (!Array.isArray(projectMember) || projectMember.length === 0 || !week) {
      setInputData(newInputData);
      return;
    }

    const memberIdKeyList = projectMember.map((item) => item.member_id);

    memberIdKeyList.forEach((memberId) => {
      const memberResource = projectResources.filter((item) => item.member_id === memberId);
      newInputData[memberId] = {};
      const now = moment();
      dayKeyList.forEach((dayKey) => {
        const day = moment(dayKey, defaultDateFormat);
        if ([0, 6].includes(day.day()) || now.diff(day) < 0) {
          newInputData[memberId][dayKey] = 0;
          return;
        }

        const resourceItem = memberResource.find((item) => {
          const startResource = moment(item.start_date).hour(0);
          const endResource = moment(item.end_date).hour(0);

          console.log("startResource", startResource.format("YYYY-MM-DD HH-mm-ss"));

          return day.diff(startResource) >= 0 && endResource.diff(day) >= 0;
        });

        newInputData[memberId][dayKey] = resourceItem?.effort || 0;
      });
    });

    setInputData(newInputData);
  };

  const handleUpdateLogwork = () => {
    const logworkList = [];

    projectMember.forEach((member) =>
      dayKeyList.forEach((dayKey) => {
        logworkList.push({
          member_id: member.member_id,
          effort: inputData?.[member.member_id]?.[dayKey] || 0,
          date: moment(dayKey, defaultDateFormat).format(callApiDateTimeFormat),
        });
      }),
    );

    const callApiLogworkData = {
      project_id: projectId,
      start_date: week.format(callApiDateTimeFormat),
      end_date: week.clone().add(6, "day").format(callApiDateTimeFormat),
      logwork: logworkList,
    };

    console.log("callApiLogworkData :", callApiLogworkData);

    projectServices.updateProjectLogwork(callApiLogworkData).then((res) => handleUpdateLogworkSuccess(res));
  };

  return (
    <>
      <DialogContent aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogContentText id="scroll-dialog-description">
          <div className="w-full h-auto relative">
            <ProjectLogworkTableHeader
              week={week}
              resetAllInput={resetAllInput}
              autoCompleteAllInput={autoCompleteAllInput}
            />

            {projectMember.map((member) => (
              <LogworkMemberItem
                key={member.member_id}
                memberId={member.member_id}
                dayKeyList={dayKeyList}
                initData={initData?.[member.member_id]}
                inputData={inputData?.[member.member_id]}
                setInputData={(newMemberLogwork) => {
                  if (inputData) setInputData({ ...inputData, [member.member_id]: newMemberLogwork });
                }}
                projectResources={projectResources}
              />
            ))}
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions
        style={{
          padding: "24px",
          borderTop: "1px solid #c8c8c8",
        }}
      >
        <button type="button" className="text-base px-4 py-2 rounded text-gray-800 bg-white hover:bg-gray-200">
          Cancel
        </button>

        <button
          onClick={handleUpdateLogwork}
          type="button"
          className="text-base px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600"
        >
          Update logwork
        </button>
      </DialogActions>
    </>
  );
});

export default UpdateProjectLogworkDialogContent;
