import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from "@mui/material";
import CommonDialog from "app/components/Dialogs/CommonDialog";
import BudgetAllocationChart from "app/components/Charts/AreaChart/BudgetAllocationChart";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { callApiDateTimeFormat, callApiStatus, defaultDateFormat, defaultMonthFormat } from "app/constants";
import SmallInputNumber from "app/components/UI/Forms/SmallInputs/SmallInputNumber";
import SmallInputArea from "app/components/UI/Forms/SmallInputs/SmallInputArea";
import { projectServices } from "app/services/api";
import PageLoading from "../../../PageStatus/PageLoading";
import { toast } from "react-toastify";
import PageError from "../../../PageStatus/PageError";
import PageNoData from "../../../PageStatus/PageNoData";
import ConfirmClose from "../../ConfirmDialogs/ConfirmClose";
import PageLoadingBackdrop from "../../../PageStatus/PageLoadingBackdrop";
import InputDateSmall from "../../../UI/Forms/InputForSearchAndFilter/InputDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function PhaseInputItem(props) {
  const { phaseInput, setPhaseInput, numericalOrder, handleDeleteMonth } = props;

  return (
    <div className="w-full h-auto px-10 relative border-b text-gray-800 hover:bg-slate-100">
      <div className="w-10 h-12 absolute top-0 left-0">
        <div className="w-full h-full flex items-center justify-center">{numericalOrder}</div>
      </div>

      <div className="w-full h-auto flex items-start">
        <div className="w-40 h-12 shrink-0 px-2 py-3 text-center">
          <Tooltip arrow title={`${phaseInput.start_date} ~ ${phaseInput.end_date}`}>
            <p className="text-base cursor-default">
              {moment(phaseInput.start_date, defaultDateFormat).format(defaultMonthFormat)}
            </p>
          </Tooltip>
        </div>
        <div className="w-24 h-12 shrink-0 px-2 py-1.5">
          <SmallInputNumber
            value={phaseInput.budget}
            onChange={(newValue) => setPhaseInput({ ...phaseInput, budget: newValue })}
          />
        </div>

        <div className="w-[calc(100%-256px)] h-auto shrink-0 px-2 py-1.5">
          <SmallInputArea
            value={phaseInput.note}
            onChange={(newValue) => setPhaseInput({ ...phaseInput, note: newValue })}
            rows={1}
          />
        </div>
      </div>

      <div className="w-10 h-12 absolute top-0 right-0 flex items-center justify-center">
        <button
          type="button"
          onClick={handleDeleteMonth}
          className="w-8 h-8 rounded hover:bg-gray-200 flex items-center justify-center text-red-500"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}

function NewPhaseInputItem(props) {
  const { phaseInput, setPhaseInput, numericalOrder, budgetPlanUpdated, handleDeleteMonth } = props;

  const handleUpdateStartDate = (newStartDate) => {
    if (!newStartDate) setPhaseInput({ ...phaseInput, start_date: "", end_date: "" });
    else
      setPhaseInput({
        ...phaseInput,
        start_date: newStartDate,
        end_date: moment(newStartDate).add(1, "month").format(defaultDateFormat),
      });
  };

  const checkDuplicated = useMemo(() => {
    console.log("checkDuplicated: ", phaseInput);
    if (!phaseInput.start_date) return false;

    const duplicatedMonth = budgetPlanUpdated.find((item) => {
      if ((item.tempId && item.tempId !== phaseInput.tempId) || !item.tempId) {
        if (!item.start_date) return false;

        return (
          moment(item.start_date, defaultDateFormat).format(defaultMonthFormat) ===
          moment(phaseInput.start_date, defaultDateFormat).format(defaultMonthFormat)
        );
      }

      return false;
    });

    console.log("duplicatedMonth: ", duplicatedMonth);
    return duplicatedMonth;
  }, [budgetPlanUpdated, phaseInput]);

  return (
    <div className="w-full h-auto px-10 relative border-b text-gray-800 hover:bg-slate-100">
      <div className="w-10 h-12 absolute top-0 left-0">
        <div className="w-full h-full flex items-center justify-center">{numericalOrder}</div>
      </div>

      <div className="w-full h-auto flex items-start">
        <div className="w-40 h-12 shrink-0 px-2 py-3 text-center flex items-center">
          <InputDateSmall
            value={phaseInput.start_date}
            onChange={handleUpdateStartDate}
            views={["month", "year"]}
            format={defaultMonthFormat}
          />
        </div>
        <div className="w-24 h-12 shrink-0 px-2 py-1.5">
          <SmallInputNumber
            value={phaseInput.budget}
            onChange={(newValue) => setPhaseInput({ ...phaseInput, budget: newValue })}
          />
        </div>

        <div className="w-[calc(100%-256px)] h-auto shrink-0 px-2 py-1.5">
          <SmallInputArea
            value={phaseInput.note}
            onChange={(newValue) => setPhaseInput({ ...phaseInput, note: newValue })}
            rows={1}
          />
        </div>
      </div>

      <div className="w-10 h-12 absolute top-0 right-0 flex items-center justify-center">
        <button
          type="button"
          onClick={handleDeleteMonth}
          className="w-8 h-8 rounded hover:bg-gray-200 flex items-center justify-center text-red-500"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      {checkDuplicated ? <p className="w-full text-red-500 text-xs px-3">Duplicated month!</p> : null}
    </div>
  );
}

function BudgetPlanEditForm(props) {
  const { projectBaseInfo, budgetPlanUpdated, setBudgetPlanUpdated } = props;

  const countTotalPlan = useMemo(() => {
    if (!Array.isArray(budgetPlanUpdated) || budgetPlanUpdated.length === 0) return 0;
    const result = budgetPlanUpdated.reduce((a, b) => a + b.budget, 0);
    return Math.floor(result * 100) / 100;
  }, [budgetPlanUpdated]);

  const setPhaseInput = (phaseInput, newValue) => {
    const newList = [...budgetPlanUpdated];

    const editedPhaseIndex = newList.findIndex((item) =>
      item.id ? item.id === phaseInput.id : item.tempId === phaseInput.tempId,
    );
    if (editedPhaseIndex < 0) return;

    if (newList[editedPhaseIndex].tempId) {
      newList[editedPhaseIndex] = {
        ...newList[editedPhaseIndex],
        start_date: newValue.start_date,
        end_date: newValue.end_date,
        budget: newValue.budget,
        note: newValue.note,
      };
    } else {
      newList[editedPhaseIndex] = {
        ...newList[editedPhaseIndex],
        budget: newValue.budget,
        note: newValue.note,
      };
    }

    setBudgetPlanUpdated(newList);
  };

  const handleAddMonth = () => {
    const newMonth = {
      tempId: uuidv4(),
      name_sprint: "",
      start_date: "",
      end_date: "",
      budget: 0,
      note: "",
    };

    setBudgetPlanUpdated((oldList) => [...oldList, newMonth]);
  };

  const handleDeleteMonth = (month) => {
    setBudgetPlanUpdated(
      budgetPlanUpdated.filter((item) => (month.id ? item.id !== month.id : item.tempId !== month.tempId)),
    );
  };

  return (
    <div className="w-full h-full flex max-h-[50vh]">
      <div className="w-1/3 h-auto max-h-[50vh] pr-4 text-gray-800">
        <div className="w-full h-auto px-3 py-2 border border-gray-400 rounded-md mb-6">
          <h2 className="text-2xl font-semibold mb-1">Project Info</h2>

          <div className="w-full flex text-lg mb-1 bg-gray-100 py-1 px-2 rounded">
            <p className="w-1/2">Billable </p>
            <p className="w-1/2 font-semibold">{projectBaseInfo.billable}MM</p>
          </div>
          <div className="w-full flex text-lg mb-1 bg-gray-100 py-1 px-2 rounded">
            <p className="w-1/2">Plan start </p>
            <p className="w-1/2 font-semibold">{moment(projectBaseInfo.start_date).utc().format(defaultDateFormat)}</p>
          </div>
          <div className="w-full flex text-lg mb-1 bg-gray-100 py-1 px-2 rounded">
            <p className="w-1/2">Plan end </p>
            <p className="w-1/2 font-semibold">{moment(projectBaseInfo.end_date).utc().format(defaultDateFormat)}</p>
          </div>
        </div>

        <div className="w-full h-auto px-3 py-2 border border-gray-400 rounded-md mb-6">
          <h2 className="text-xl font-semibold mb-1">
            Total plan :{" "}
            <span className={countTotalPlan > projectBaseInfo.billable ? "text-red-500" : "text-green-500"}>
              {countTotalPlan}MM
            </span>
          </h2>
        </div>
      </div>
      <div className="w-2/3 h-auto max-h-[50vh] overflow-auto">
        <div className="w-full h-auto relative">
          <div className="w-full h-10 pl-10 sticky top-0 z-10 border-b-2 border-gray-200 bg-gray-100 text-gray-500 font-semibold">
            <div className="w-10 h-10 absolute top-0 left-0">
              <div className="w-full h-full flex items-center justify-center">#</div>
            </div>

            <div className="w-full h-full flex items-center">
              <div className="w-40 h-full shrink-0 py-1.5 text-center">Month</div>
              <div className="w-24 h-full shrink-0 py-1.5 text-center">Budget{"(MM)"}</div>
              <div className="w-[calc(100%-256px)] h-full shrink-0 py-1.5 text-center">Note</div>
            </div>
          </div>

          {budgetPlanUpdated.map((phaseInput, index) =>
            !phaseInput.tempId ? (
              <PhaseInputItem
                key={phaseInput.id}
                numericalOrder={index + 1}
                phaseInput={phaseInput}
                setPhaseInput={(newValue) => setPhaseInput(phaseInput, newValue)}
                handleDeleteMonth={() => handleDeleteMonth(phaseInput)}
              />
            ) : (
              <NewPhaseInputItem
                key={phaseInput.tempId}
                numericalOrder={index + 1}
                phaseInput={phaseInput}
                budgetPlanUpdated={budgetPlanUpdated}
                setPhaseInput={(newValue) => setPhaseInput(phaseInput, newValue)}
                handleDeleteMonth={() => handleDeleteMonth(phaseInput)}
              />
            ),
          )}

          <div className="w-full h-auto my-3">
            <button
              type="button"
              onClick={handleAddMonth}
              className="w-auto h-8 px-3 rounded border border-gray-400 flex items-center justify-center"
            >
              Add month
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function UpdateProjectBudgetPlanDialogContent(props) {
  const { projectId, projectBaseInfo, budgetPlanUpdated, setBudgetPlanUpdated, handleClose, handleSaveChange } = props;

  const [showBudgetAllocationChart, setShowBudgetAllocationChart] = useState(false);

  const checkValidItemToShowChart = (item) => {
    if (!item.start_date) return false;
    if (item.tempId)
      return !budgetPlanUpdated.find((budgetItem) => {
        if (budgetItem.tempId === item.tempId) return false;
        if (budgetItem.tempId) return budgetItem.start_date === item.start_date;
        return (
          moment(item.start_date, defaultDateFormat).format(defaultMonthFormat) ===
          moment(budgetItem.start_date, defaultDateFormat).format(defaultMonthFormat)
        );
      });

    return true;
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
          <h2 className="w-full h-12 text-[32px] font-medium text-start">Project Budget Plan</h2>

          <div className="w-full h-10 flex items-start justify-center">
            <div className="w-auto h-8 flex items-center justify-center text-base">
              <button
                type="button"
                className={`w-24 h-full border flex items-center justify-center rounded-l-full ${
                  !showBudgetAllocationChart ? "border-green-500 text-green-500" : ""
                }`}
                onClick={() => setShowBudgetAllocationChart(false)}
              >
                Edit
              </button>

              <button
                type="button"
                className={`w-24 h-full border flex items-center justify-center rounded-r-full ${
                  showBudgetAllocationChart ? "border-green-500 text-green-500" : ""
                }`}
                onClick={() => setShowBudgetAllocationChart(true)}
              >
                Chart
              </button>
            </div>
          </div>
        </div>
      </DialogTitle>
      <DialogContent aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
          {!showBudgetAllocationChart ? (
            <BudgetPlanEditForm
              projectId={projectId}
              projectBaseInfo={projectBaseInfo}
              budgetPlanUpdated={budgetPlanUpdated}
              setBudgetPlanUpdated={setBudgetPlanUpdated}
            />
          ) : (
            <div className="w-full h-[50vh]">
              <BudgetAllocationChart
                data={
                  Array.isArray(budgetPlanUpdated)
                    ? budgetPlanUpdated.filter(checkValidItemToShowChart).map((item) => ({
                        month: moment(item.start_date, defaultDateFormat).format(defaultMonthFormat),
                        budget: item.budget,
                      }))
                    : []
                }
              />
            </div>
          )}
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
          onClick={handleClose}
          className="text-base px-4 py-2 rounded text-gray-800 bg-white hover:bg-gray-200 mr-4"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSaveChange}
          className="text-base px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600"
        >
          Save
        </button>
      </DialogActions>
    </>
  );
}

function UpdateProjectBudgetPlanDialog(props) {
  const { open, setOpen, projectId, projectBaseInfo, handleUpdateBudgetPlanSuccess } = props;

  // Call API Info
  const [callApiState, setCallApiState] = useState({
    isLoading: true,
    data: [],
    error: null,
  });
  const [budgetPlanUpdated, setBudgetPlanUpdated] = useState([]);
  const [saveChangeStatus, setSaveChangeStatus] = useState(callApiStatus.idle);
  const [confirmClose, setConfirmClose] = useState(false);

  const loadProjectBudget = useCallback(() => {
    setCallApiState({ isLoading: true, data: [], error: null });
    setBudgetPlanUpdated([]);

    projectServices
      .getAllBudgetPlan(projectId)
      .then((res) => {
        const data = [...res.data]
          .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
          .map((item) => ({
            ...item,
            start_date: moment(item.start_date).utc().format(defaultDateFormat),
            end_date: moment(item.end_date).utc().format(defaultDateFormat),
          }));

        setCallApiState({
          isLoading: false,
          data: data,
          error: null,
        });
        setBudgetPlanUpdated(data);
      })
      .catch((error) => {
        console.log("error", error);
        toast.error("Get budget plan fail!");
        setCallApiState({ isLoading: false, data: [], error: error });
      });
  }, [projectId]);

  useEffect(() => {
    if (open) {
      loadProjectBudget();
    }
  }, [open, loadProjectBudget]);

  const checkHasChanged = () => {
    if (!Array.isArray(callApiState.data) || !Array.isArray(budgetPlanUpdated)) return false;
    if (callApiState.data.length === 0 && budgetPlanUpdated.length === 0) return false;

    const checkChangeAndRemoveItem = callApiState.data.find((dataItem) => {
      const updatedItemCorresponding = budgetPlanUpdated.find((updatedItem) => dataItem.id === updatedItem.id);
      if (
        updatedItemCorresponding &&
        updatedItemCorresponding.budget === dataItem.budget &&
        updatedItemCorresponding.note === dataItem.note
      )
        return false;
      return true;
    });
    if (checkChangeAndRemoveItem) return true;

    const checkAddItem = budgetPlanUpdated.find((item) => item.tempId);

    if (checkAddItem) return true;
    return false;
  };

  const handleClose = () => {
    if (setSaveChangeStatus === callApiStatus.loading) return;

    if (checkHasChanged()) setConfirmClose(true);
    else handleResetAndClose(true);
  };

  const handleResetAndClose = () => {
    setOpen(false);
    setConfirmClose(false);
    setSaveChangeStatus(callApiStatus.idle);
  };

  const handleSaveChange = () => {
    if (!checkHasChanged()) {
      handleResetAndClose();
      toast.success("There are no changes.");
      return;
    }

    console.log("budgetPlanUpdated", budgetPlanUpdated);
    const budgets = budgetPlanUpdated.map((item) => ({
      budget: item.budget,
      note: item.note,
      start_date: moment(item.start_date, defaultDateFormat).format(callApiDateTimeFormat),
      end_date: moment(item.end_date, defaultDateFormat).format(callApiDateTimeFormat),
    }));

    const data = {
      project_id: projectId,
      budgets: budgets,
    };

    setSaveChangeStatus(callApiStatus.loading);
    projectServices
      .updateBudgetPlan(data)
      .then((res) => {
        handleResetAndClose();
        toast.success("Update budget plan success.");
        if (typeof handleUpdateBudgetPlanSuccess === "function") handleUpdateBudgetPlanSuccess(res.data);
      })
      .catch((error) => {
        setSaveChangeStatus(callApiStatus.error);
        console.log("error", error);
        toast.error("Update budget plan fail!");
      });
  };

  return (
    <CommonDialog open={open} handleClose={handleClose} dialogProps={{ maxWidth: "md" }}>
      {callApiState.isLoading ? <PageLoading /> : null}

      {!callApiState.isLoading && callApiState.error ? <PageError /> : null}

      {!callApiState.isLoading && !callApiState.error ? (
        Array.isArray(callApiState.data) ? (
          <UpdateProjectBudgetPlanDialogContent
            budgetPlan={callApiState.data}
            projectId={projectId}
            projectBaseInfo={projectBaseInfo}
            budgetPlanUpdated={budgetPlanUpdated}
            setBudgetPlanUpdated={setBudgetPlanUpdated}
            handleClose={handleClose}
            handleSaveChange={handleSaveChange}
          />
        ) : (
          <PageNoData />
        )
      ) : null}

      <ConfirmClose
        open={confirmClose}
        handleClose={() => setConfirmClose(false)}
        handleResetAndClose={handleResetAndClose}
        title="Confirm close update budget plan!"
      >
        <p className="py-4">There are some changes, are you sure you want to skip it?</p>
      </ConfirmClose>

      <PageLoadingBackdrop open={saveChangeStatus === callApiStatus.loading} />
    </CommonDialog>
  );
}

export default UpdateProjectBudgetPlanDialog;
