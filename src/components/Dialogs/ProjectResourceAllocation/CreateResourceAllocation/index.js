import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CommonDialog from "../../CommonDialog";
import { DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import SelectSingle from "app/components/UI/Forms/Selects/SelectSingle";
import { callApiDateTimeFormat, callApiStatus, defaultDateFormat } from "app/constants";
import { effortRateOptions } from "app/constants/options";
import InputArea from "app/components/UI/Forms/Inputs/InputArea";
import InputDate from "app/components/UI/Forms/Inputs/InputDate";
import { countWorkingDays } from "app/utils";
import moment from "moment";
import { projectResourceRoleOptions } from "../../../../constants/options";
import { useFetchMemberOptions } from "../../../../hooks/fetchData/useFetchMemberOptions";
import { projectServices } from "../../../../services/api";
import { toast } from "react-toastify";
import ConfirmClose from "../../ConfirmDialogs/ConfirmClose";
import PageLoadingBackdrop from "../../../PageStatus/PageLoadingBackdrop";

const initialValues = {
  member_id: undefined,
  role_id: undefined,
  start_date: "",
  end_date: "",
  effort: 1,
  memo: "",
};

function CreateResourceAllocation(props) {
  const { open, setOpen, projectId, projectBaseInfo, handleCreateProjectSuccess } = props;

  const { memberOptions, loadingMemberStatus, fetchMemberOptions } = useFetchMemberOptions();

  const [createResourceStatus, setCreateResourceStatus] = useState(callApiStatus.idle);
  const [confirmClose, setConfirmClose] = useState(false);

  useEffect(() => {
    if (open) fetchMemberOptions();
  }, [open]);

  const validationSchema = Yup.object().shape({
    member_id: Yup.number().required(),
    role_id: Yup.number().required(),
    start_date: Yup.string().required(),
    end_date: Yup.string().required(),
    effort: Yup.number().required(),
    memo: Yup.string().max(200),
  });

  const onSubmit = async (values) => {
    console.log("confirmCustomerData: ", values);
    handleCreateResource(values);
  };

  const { handleSubmit, errors, values, setFieldValue, resetForm, touched, handleBlur, setFieldTouched } = useFormik({
    initialValues: initialValues,
    onSubmit,
    validationSchema,
  });

  const checkHasChanged = () => {
    if (
      values.member_id !== initialValues.member_id ||
      values.role_id !== initialValues.role_id ||
      values.start_date !== initialValues.start_date ||
      values.end_date !== initialValues.end_date ||
      values.effort !== initialValues.effort ||
      values.memo !== initialValues.memo
    )
      return true;
    return false;
  };
  const handleClose = () => {
    if (checkHasChanged()) setConfirmClose(true);
    else handleResetAndClose(true);
  };

  const handleResetAndClose = () => {
    resetForm();
    setOpen(false);
    setConfirmClose(false);
    setCreateResourceStatus(callApiStatus.idle);
  };

  const handleCreateResource = (formData) => {
    console.log("formData", formData);
    if (createResourceStatus === callApiStatus.loading) return;
    const resourceInfo = {
      project_id: projectId,
      member_id: formData.member_id,
      role_id: formData.role_id,
      start_date: moment(formData.start_date, defaultDateFormat).format(callApiDateTimeFormat),
      end_date: moment(formData.end_date, defaultDateFormat).format(callApiDateTimeFormat),
      effort: formData.effort,
      memo: formData.memo,
    };

    console.log("resourceInfo", resourceInfo);
    setCreateResourceStatus(callApiStatus.loading);
    projectServices
      .addNewProjectResource(resourceInfo)
      .then((res) => {
        toast.success("Add resource success.");
        handleResetAndClose();
        const newProjectData = res.data;
        if (typeof handleCreateProjectSuccess === "function") handleCreateProjectSuccess(newProjectData);
      })
      .catch((error) => {
        console.log("error: ", error);
        toast.error("Create resource fail!");
        setCreateResourceStatus(callApiStatus.idle);
      });
  };

  return (
    <CommonDialog open={open} handleClose={handleClose}>
      <DialogTitle
        style={{
          padding: "24px 24px 12px 24px",
        }}
        id="scroll-dialog-title"
      >
        <div className="w-full h-auto flex flex-col items-center justify-center">
          <h2 className="w-full h-12 text-[32px] font-medium text-start">Add new resource</h2>
        </div>
      </DialogTitle>
      <DialogContent aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
          <SelectSingle
            id="member_id"
            label="Member"
            value={values.member_id}
            onChange={(newValue) => setFieldValue("member_id", newValue)}
            options={memberOptions}
            touched={touched.member_id}
            errors={errors.member_id}
            setTouched={() => setFieldTouched("member_id", true)}
            fieldIsRequired
            isClearable={true}
            isSearchable={true}
            isLoading={loadingMemberStatus === callApiStatus.loading}
          />

          <SelectSingle
            id="role_id"
            label="Role"
            value={values.role_id}
            onChange={(newValue) => setFieldValue("role_id", newValue)}
            options={projectResourceRoleOptions}
            touched={touched.role_id}
            errors={errors.role_id}
            setTouched={() => setFieldTouched("role_id", true)}
            fieldIsRequired
            isClearable={true}
            isSearchable={true}
          />

          <div className="w-full h-auto flex items-start gap-6">
            <div className="w-1/2 h-auto">
              <InputDate
                id="start_date"
                label="Plan start"
                value={values.start_date}
                onChange={(newValue) => {
                  setFieldValue("start_date", newValue);

                  if (
                    values.end_date &&
                    moment(values.end_date, defaultDateFormat).diff(moment(newValue, defaultDateFormat)) < 0
                  ) {
                    setFieldValue("end_date", moment(newValue, defaultDateFormat).add(1, "M"));
                  }
                }}
                touched={touched.start_date}
                errors={errors.start_date}
                handleBlur={handleBlur}
                fieldIsRequired
              />
            </div>

            <div className="w-1/2 h-auto">
              <InputDate
                id="end_date"
                label="Plan end"
                value={values.end_date}
                onChange={(newValue) => {
                  setFieldValue("end_date", newValue);

                  if (
                    values.start_date &&
                    moment(newValue, defaultDateFormat).diff(moment(values.start_date, defaultDateFormat)) < 0
                  ) {
                    setFieldValue("start_date", moment(newValue, defaultDateFormat).subtract(1, "M"));
                  }
                }}
                touched={touched.end_date}
                errors={errors.end_date}
                handleBlur={handleBlur}
                fieldIsRequired
              />
            </div>
          </div>

          <div className="w-full h-auto flex items-start gap-6">
            <div className="w-1/2 h-auto">
              <SelectSingle
                id="effort"
                label="Effort Rate"
                value={values.effort}
                onChange={(newValue) => setFieldValue("effort", newValue)}
                options={effortRateOptions}
                touched={touched.effort}
                errors={errors.effort}
                setTouched={() => setFieldTouched("effort", true)}
                fieldIsRequired
                isClearable={false}
                isSearchable={false}
              />
            </div>

            <div className="w-1/2 h-auto">
              <div className="w-full h-auto mb-3">
                <label className="text-base font-semibold block mb-1">Total Effort</label>

                <div className="w-full h-[42px] flex items-center justify-start">
                  {countWorkingDays(moment(values.start_date), moment(values.end_date), values.effort)} days
                </div>
              </div>
            </div>
          </div>

          <InputArea
            id="memo"
            label="Memo"
            value={values.memo}
            onChange={(newValue) => {
              setFieldValue("memo", newValue);
            }}
            touched={touched.memo}
            errors={errors.memo}
            handleBlur={handleBlur}
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
          onClick={handleClose}
          className="text-base px-4 py-2 rounded text-gray-800 bg-white hover:bg-gray-200 mr-4"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={() => handleSubmit()}
          className="text-base px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600"
        >
          Add resource
        </button>
      </DialogActions>

      <ConfirmClose
        open={confirmClose}
        handleClose={() => setConfirmClose(false)}
        handleResetAndClose={handleResetAndClose}
        title="Confirm close add resource!"
      >
        <p className="py-4">There are some changes, are you sure you want to skip it?</p>
      </ConfirmClose>

      <PageLoadingBackdrop open={createResourceStatus === callApiStatus.loading} />
    </CommonDialog>
  );
}

export default CreateResourceAllocation;
