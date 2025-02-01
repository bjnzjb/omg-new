import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CommonDialog from "app/components/Dialogs/CommonDialog";
import { DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

import SelectSingle from "app/components/UI/Forms/Selects/SelectSingle";
import { callApiStatus } from "app/constants";
import InputArea from "app/components/UI/Forms/Inputs/InputArea";
import InputText from "app/components/UI/Forms/Inputs/InputText";
import InputNumber from "app/components/UI/Forms/Inputs/InputNumber";
import InputDate from "app/components/UI/Forms/Inputs/InputDate";
import ConfirmClose from "../../ConfirmDialogs/ConfirmClose";
import PageLoadingBackdrop from "../../../PageStatus/PageLoadingBackdrop";
import { projectServices } from "../../../../services/api";
import { toast } from "react-toastify";
import { useFetchCustomerOptions } from "../../../../hooks/fetchData/useFetchCustomerOptions";
import { useFetchMemberOptions } from "../../../../hooks/fetchData/useFetchMemberOptions";
import { filterMemberRole } from "../../../../utils";
import { projectTypeOptions } from "../../../../constants/options";
import { useFetchDivisionOptions } from "../../../../hooks/fetchData/useFetchDivisionOptions";

const initialValues = {
  name: "",
  key: "",
  customer_id: undefined,
  project_type_id: projectTypeOptions[0].value,
  billable: 0,
  start_date: "",
  end_date: "",
  introduction: "",

  // Person In Charge
  unit_id: undefined,
  pm_id: undefined,
  sm_id: undefined,
  sale_id: undefined,
};

function CreateProjectDialog(props) {
  const { open, setOpen, handleCreateProjectSuccess } = props;

  const [createProjectStatus, setCreateProjectStatus] = useState(callApiStatus.idle);
  const [confirmClose, setConfirmClose] = useState(false);
  const { customerOptions, loadingCustomerStatus, fetchCustomerOptions } = useFetchCustomerOptions();
  const { memberOptions, loadingMemberStatus, fetchMemberOptions } = useFetchMemberOptions();
  const { divisionOptions, loadingDivisionStatus, fetchDivisionOptions } = useFetchDivisionOptions();

  const validationSchema = Yup.object().shape({
    // TODO: Add Custom Message
    name: Yup.string().required().max(50),
    key: Yup.string().required().max(50),
    customer_id: Yup.string().required(),
    project_type_id: Yup.string().required(),
    billable: Yup.number().required().moreThan(0),
    start_date: Yup.string().required(),
    end_date: Yup.string().required(),
    introduction: Yup.string().max(500),

    // Person In Charge
    unit_id: Yup.string().required(),
    pm_id: Yup.string().required(),
    sm_id: Yup.string(),
    sale_id: Yup.string(),
  });

  const onSubmit = async (values) => {
    console.log("confirmProjectData: ", values);
    handleCreateProject(values);
  };

  const { handleSubmit, errors, values, setFieldValue, resetForm, touched, handleBlur, setFieldTouched } = useFormik({
    initialValues: initialValues,
    onSubmit,
    validationSchema,
  });

  useEffect(() => {
    if (open) {
      if (loadingCustomerStatus !== callApiStatus.loading && loadingCustomerStatus !== callApiStatus.success) {
        fetchCustomerOptions();
      }
      if (loadingMemberStatus !== callApiStatus.loading && loadingMemberStatus !== callApiStatus.success) {
        // fetchMemberOptions();
      }
      if (loadingDivisionStatus !== callApiStatus.loading && loadingDivisionStatus !== callApiStatus.success) {
        // fetchDivisionOptions();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const pmOptions = useMemo(() => {
    return filterMemberRole(memberOptions, "pm");
  }, [memberOptions]);

  const smOptions = useMemo(() => {
    return filterMemberRole(memberOptions, "sm");
  }, [memberOptions]);

  const saleOptions = useMemo(() => {
    return filterMemberRole(memberOptions, "sale");
  }, [memberOptions]);

  const checkHasChanged = () => {
    if (
      values.name !== initialValues.name ||
      values.key !== initialValues.key ||
      values.customer_id !== initialValues.customer_id ||
      values.project_type_id !== initialValues.project_type_id ||
      values.billable !== initialValues.billable ||
      values.start_date !== initialValues.start_date ||
      values.end_date !== initialValues.end_date ||
      values.introduction !== initialValues.introduction ||
      values.unit_id !== initialValues.unit_id ||
      values.pm_id !== initialValues.pm_id ||
      values.sm_id !== initialValues.sm_id ||
      values.sale_id !== initialValues.sale_id
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
    setCreateProjectStatus(callApiStatus.idle);
  };

  const handleCreateProject = (formData) => {
    if (createProjectStatus === callApiStatus.loading) return;
    const projectInfo = {
      name: formData.name,
      key: formData.key,
      code: genProjectCode,
      customer_id: formData.customer_id,
      project_type_id: formData.project_type_id,
      billable: formData.billable,
      start_date: formData.start_date,
      end_date: formData.end_date,
      introduction: formData.introduction,

      // Person In Charge
      unit_id: formData.unit_id,
      pm_id: formData.pm_id,
      sm_id: formData.sm_id,
      // sale_id: formData.sale_id,
    };

    setCreateProjectStatus(callApiStatus.loading);
    projectServices
      .createNewProject(projectInfo)
      .then((res) => {
        toast.success("Create project success.");
        handleResetAndClose();
        const newProjectData = res.data;
        if (typeof handleCreateProjectSuccess === "function") handleCreateProjectSuccess(newProjectData);
      })
      .catch((error) => {
        console.log("error: ", error);
        toast.error("Create project fail!");
        setCreateProjectStatus(callApiStatus.idle);
      });
  };

  const genProjectCode = useMemo(() => {
    const customer = customerOptions.find((item) => item.value === values.customer_id);
    return `${customer?.key || ""}_${values.key || ""}`;
  }, [values.key, values.customer_id, customerOptions]);

  return (
    <CommonDialog open={open} handleClose={handleClose}>
      <DialogTitle
        style={{
          padding: "24px 24px 12px 24px",
        }}
        id="scroll-dialog-title"
      >
        <div className="w-full h-auto flex flex-col items-center justify-center">
          <h2 className="w-full h-12 text-[32px] font-medium text-start">Add new project</h2>

          <div className="w-full h-36 flex items-center justify-center ">
            <div className="w-24 h-24 rounded-xl overflow-hidden relative group/project-image">
              {/* result img */}
              <div className="absolute w-full h-full inset-0 bg-green-400">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-3xl font-semibold text-white">N</span>
                </div>
              </div>

              {/* edit btn */}
              <button className="absolute w-full h-full inset-0 bg-white bg-opacity-70 transition-all opacity-0 group-hover/project-image:opacity-100">
                <div className="w-full h-full flex flex-col items-center justify-center text-base leading-5 text-blue-500">
                  <span className="">
                    <FontAwesomeIcon icon={faPencil} />
                  </span>
                  <span className="leading-6 font-medium">edit</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </DialogTitle>
      <DialogContent aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
          <div className="w-full h-10 flex items-center justify-center relative">
            <div className="w-full h-[2px] rounded-full bg-gray-400" />

            <p className="w-auto h-auto text-base font-semibold text-gray-600 bg-white px-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              Project Info
            </p>
          </div>

          <InputText
            id="name"
            label="Project name"
            value={values.name}
            onChange={(newValue) => {
              setFieldValue("name", newValue);
            }}
            touched={touched.name}
            errors={errors.name}
            handleBlur={handleBlur}
            fieldIsRequired
          />

          <div className="w-full h-auto flex items-start gap-6">
            <div className="w-1/2 h-auto">
              <InputText
                id="key"
                label="Project Key"
                value={values.key}
                onChange={(newValue) => {
                  setFieldValue("key", newValue);
                }}
                touched={touched.key}
                errors={errors.key}
                handleBlur={handleBlur}
                fieldIsRequired
              />
            </div>

            <div className="w-1/2 h-auto">
              <InputText id="code" label="Project code" value={genProjectCode} fieldIsRequired disabled />
            </div>
          </div>

          <SelectSingle
            id="customer_id"
            label="Customer"
            value={values.customer_id}
            onChange={(newValue) => setFieldValue("customer_id", newValue)}
            options={customerOptions}
            touched={touched.customer_id}
            errors={errors.customer_id}
            setTouched={() => setFieldTouched("customer_id", true)}
            fieldIsRequired
            isLoading={loadingCustomerStatus === callApiStatus.loading}
          />

          <SelectSingle
            id="project_type_id"
            label="Project Type"
            value={values.project_type_id}
            onChange={(newValue) => setFieldValue("project_type_id", newValue)}
            options={projectTypeOptions}
            touched={touched.project_type_id}
            errors={errors.project_type_id}
            setTouched={() => setFieldTouched("project_type_id", true)}
            fieldIsRequired
            isClearable={false}
            isSearchable={false}
          />

          <div className="w-full h-auto flex items-start gap-6">
            <InputNumber
              id="billable"
              label="Billable"
              value={values.billable}
              onChange={(newValue) => {
                setFieldValue("billable", Number(newValue));
              }}
              touched={touched.billable}
              errors={errors.billable}
              handleBlur={(e) => {
                console.log("eereeeee", e);
                handleBlur(e);
              }}
              fieldIsRequired
            />
          </div>

          <div className="w-full h-auto flex items-start gap-6">
            <div className="w-1/2 h-auto">
              <InputDate
                id="start_date"
                label="Plan start"
                value={values.start_date}
                onChange={(newValue) => {
                  setFieldValue("start_date", newValue);
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
                }}
                touched={touched.end_date}
                errors={errors.end_date}
                handleBlur={handleBlur}
                fieldIsRequired
              />
            </div>
          </div>

          <InputArea
            id="introduction"
            label="Project inroduction"
            value={values.introduction}
            onChange={(newValue) => {
              setFieldValue("introduction", newValue);
            }}
            touched={touched.introduction}
            errors={errors.introduction}
            handleBlur={handleBlur}
            fieldIsRequired={false}
          />

          <div className="w-full h-10 flex items-center justify-center relative">
            <div className="w-full h-[2px] rounded-full bg-gray-400" />

            <p className="w-auto h-auto text-base font-semibold text-gray-600 bg-white px-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              Person In Charge
            </p>
          </div>

          <SelectSingle
            id="unit_id"
            label="Unit"
            value={values.unit_id}
            onChange={(newValue) => setFieldValue("unit_id", newValue)}
            options={divisionOptions}
            touched={touched.unit_id}
            errors={errors.unit_id}
            setTouched={() => setFieldTouched("unit_id", true)}
            fieldIsRequired
            isClearable={false}
            isSearchable={false}
            isLoading={loadingDivisionStatus === callApiStatus.loading}
          />

          <SelectSingle
            id="pm_id"
            label="PM"
            value={values.pm_id}
            onChange={(newValue) => setFieldValue("pm_id", newValue)}
            options={pmOptions}
            touched={touched.pm_id}
            errors={errors.pm_id}
            setTouched={() => setFieldTouched("pm_id", true)}
            fieldIsRequired
            isClearable={true}
            isSearchable={true}
            isLoading={loadingMemberStatus === callApiStatus.loading}
          />

          <SelectSingle
            id="sm_id"
            label="SM"
            value={values.sm_id}
            onChange={(newValue) => setFieldValue("sm_id", newValue)}
            options={smOptions}
            touched={touched.sm_id}
            errors={errors.sm_id}
            setTouched={() => setFieldTouched("sm_id", true)}
            isClearable={true}
            isSearchable={true}
            isLoading={loadingMemberStatus === callApiStatus.loading}
          />

          <SelectSingle
            id="sale_id"
            label="Sale"
            value={values.sale_id}
            onChange={(newValue) => setFieldValue("sale_id", newValue)}
            options={saleOptions}
            touched={touched.sale_id}
            errors={errors.sale_id}
            setTouched={() => setFieldTouched("sale_id", true)}
            isClearable={true}
            isSearchable={true}
            isLoading={loadingMemberStatus === callApiStatus.loading}
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
          Add Project
        </button>
      </DialogActions>

      <ConfirmClose
        open={confirmClose}
        handleClose={() => setConfirmClose(false)}
        handleResetAndClose={handleResetAndClose}
        title="Confirm close add project!"
      >
        <p className="py-4">There are some changes, are you sure you want to skip it?</p>
      </ConfirmClose>

      <PageLoadingBackdrop open={createProjectStatus === callApiStatus.loading} />
    </CommonDialog>
  );
}

export default CreateProjectDialog;
