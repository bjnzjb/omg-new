import React, { useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CommonDialog from "app/components/Dialogs/CommonDialog";
import { DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

import SelectSingle from "app/components/UI/Forms/Selects/SelectSingle";
import { marketOptions, languageOptions, saleOptions, callApiStatus } from "app/constants";
import InputArea from "app/components/UI/Forms/Inputs/InputArea";
import InputText from "app/components/UI/Forms/Inputs/InputText";
import InputPhoneNumber from "../../../UI/Forms/Inputs/InputPhoneNumber";
import ConfirmClose from "../../ConfirmDialogs/ConfirmClose";
import { customerServices } from "../../../../services/api";
import { toast } from "react-toastify";
import PageLoadingBackdrop from "../../../PageStatus/PageLoadingBackdrop";

const initialValues = {
  name: "",
  market: "",
  language: "",
  sales: "",
  customer_email: "",
  customer_phone: "",
  customer_address: "",
  customer_introduction: "",

  // Representativ Person
  representative_customer_name: "",
  representative_customer_email: "",
  representative_customer_phone_number: "",
};

function CreateCustomerDialog(props) {
  const { open, setOpen, handleCreateCustomerSuccess } = props;

  const [createCustomerStatus, setCreateCustomerStatus] = useState(callApiStatus.idle);
  const [confirmClose, setConfirmClose] = useState(false);

  const validationSchema = Yup.object().shape({
    // TODO: Add Custom Message
    name: Yup.string().required().max(50),
    key: Yup.string().required().max(50),
    market: Yup.string().required(),
    language: Yup.string().required(),
    sales: Yup.string().required(),
    customer_email: Yup.string().required().email(),
    customer_phone: Yup.string().required().min(8).max(20),
    customer_address: Yup.string(),
    customer_introduction: Yup.string(),

    // Representativ Person
    representative_customer_name: Yup.string().required(),
    representative_customer_email: Yup.string().required().email(),
    representative_customer_phone_number: Yup.string().required().min(8).max(20),

    // Avatar
    customerImage: Yup.string(),
  });

  const onSubmit = (values) => {
    handleCreateCustomer(values);
  };

  const { handleSubmit, errors, values, setFieldValue, resetForm, touched, handleBlur, setFieldTouched } = useFormik({
    initialValues: initialValues,
    onSubmit,
    validationSchema,
  });

  const checkHasChanged = () => {
    if (
      values.name !== initialValues.name ||
      values.key !== initialValues.key ||
      values.market !== initialValues.market ||
      values.language !== initialValues.language ||
      values.sales !== initialValues.sales ||
      values.customer_email !== initialValues.customer_email ||
      values.customer_phone !== initialValues.customer_phone ||
      values.customer_address !== initialValues.customer_address ||
      values.customer_introduction !== initialValues.customer_introduction ||
      values.representative_customer_name !== initialValues.representative_customer_name ||
      values.representative_customer_email !== initialValues.representative_customer_email ||
      values.representative_customer_phone_number !== initialValues.representative_customer_phone_number
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
    setCreateCustomerStatus(callApiStatus.idle);
  };

  const handleCreateCustomer = (formData) => {
    if (createCustomerStatus === callApiStatus.loading) return;
    const customerInfo = {
      name: formData.name,
      key: formData.key,
      market: formData.market,
      // language: formData.language,
      sales: formData.sales,
      customer_email: formData.customer_email,
      customer_phone: formData.customer_phone,
      customer_address: formData.customer_address,
      customer_introduction: formData.customer_introduction,
      representative_customer_name: formData.representative_customer_name,
      representative_customer_email: formData.representative_customer_email,
      representative_customer_phone_number: formData.representative_customer_phone_number,
    };

    setCreateCustomerStatus(callApiStatus.loading);
    customerServices
      .createNewCustomer(customerInfo)
      .then((res) => {
        toast.success("Create customer success.");
        handleResetAndClose();
        if (typeof handleCreateCustomerSuccess === "function") handleCreateCustomerSuccess(res.data);
      })
      .catch((error) => {
        console.log("error: ", error);
        toast.error("Create customer fail!");
        setCreateCustomerStatus(callApiStatus.idle);
      });
  };

  const customerCode = useMemo(() => {
    return `${values.market || ""}_${values.key || ""}`;
  }, [values.key, values.market]);

  return (
    <CommonDialog open={open} handleClose={handleClose}>
      <DialogTitle
        style={{
          padding: "24px 24px 12px 24px",
        }}
        id="scroll-dialog-title"
      >
        <div className="w-full h-auto flex flex-col items-center justify-center">
          <h2 className="w-full h-12 text-[32px] font-medium text-start">Add new customer</h2>

          <div className="w-full h-36 flex items-center justify-center ">
            <div className="w-24 h-24 rounded-xl overflow-hidden relative group/customer-image">
              {/* result img */}
              <div className="absolute w-full h-full inset-0 bg-green-400">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-3xl font-semibold text-white">N</span>
                </div>
              </div>

              {/* edit btn */}
              <button className="absolute w-full h-full inset-0 bg-white bg-opacity-70 transition-all opacity-0 group-hover/customer-image:opacity-100">
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
              Customer Info
            </p>
          </div>

          <InputText
            id="name"
            label="Customer name"
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
                label="Customer key"
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
              <InputText id="code" label="Customer code" value={customerCode} fieldIsRequired disabled />
            </div>
          </div>

          <SelectSingle
            id="market"
            label="Market"
            value={values.market}
            onChange={(newValue) => setFieldValue("market", newValue)}
            options={marketOptions}
            touched={touched.market}
            errors={errors.market}
            setTouched={() => setFieldTouched("market", true)}
            fieldIsRequired
          />

          <SelectSingle
            id="language"
            label="Language"
            value={values.language}
            onChange={(newValue) => setFieldValue("language", newValue)}
            options={languageOptions}
            touched={touched.language}
            errors={errors.language}
            setTouched={() => setFieldTouched("language", true)}
            fieldIsRequired
            isClearable={false}
            isSearchable={false}
          />

          <SelectSingle
            id="sales"
            label="Sale"
            value={values.sales}
            onChange={(newValue) => setFieldValue("sales", newValue)}
            options={saleOptions}
            touched={touched.sales}
            errors={errors.sales}
            setTouched={() => setFieldTouched("sales", true)}
            fieldIsRequired
            isClearable={false}
            isSearchable={false}
          />

          <InputText
            id="customer_email"
            label="Customer Email"
            value={values.customer_email}
            onChange={(newValue) => setFieldValue("customer_email", newValue)}
            touched={touched.customer_email}
            errors={errors.customer_email}
            handleBlur={handleBlur}
            fieldIsRequired
          />

          <InputPhoneNumber
            id="customer_phone"
            label="Customer phone number"
            value={values.customer_phone}
            onChange={(newValue) => setFieldValue("customer_phone", newValue)}
            touched={touched.customer_phone}
            errors={errors.customer_phone}
            handleBlur={handleBlur}
            fieldIsRequired
          />

          <InputText
            id="customer_address"
            label="Customer Address"
            value={values.customer_address}
            onChange={(newValue) => setFieldValue("customer_address", newValue)}
            touched={touched.customer_address}
            errors={errors.customer_address}
            handleBlur={handleBlur}
          />

          <InputArea
            id="customer_introduction"
            label="Customer introduction"
            value={values.customer_introduction}
            onChange={(newValue) => {
              setFieldValue("customer_introduction", newValue);
            }}
            touched={touched.customer_introduction}
            errors={errors.customer_introduction}
            handleBlur={handleBlur}
            fieldIsRequired={false}
          />

          <div className="w-full h-10 flex items-center justify-center relative">
            <div className="w-full h-[2px] rounded-full bg-gray-400" />

            <p className="w-auto h-auto text-base font-semibold text-gray-600 bg-white px-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              Representative person
            </p>
          </div>

          <div className="w-full h-auto p-4 rounded-md bg-gray-100">
            <InputText
              id="representative_customer_name"
              label="Name"
              value={values.representative_customer_name}
              onChange={(newValue) => setFieldValue("representative_customer_name", newValue)}
              touched={touched.representative_customer_name}
              errors={errors.representative_customer_name}
              handleBlur={handleBlur}
              fieldIsRequired
            />

            <InputText
              id="representative_customer_email"
              label="Email"
              value={values.representative_customer_email}
              onChange={(newValue) => setFieldValue("representative_customer_email", newValue)}
              touched={touched.representative_customer_email}
              errors={errors.representative_customer_email}
              handleBlur={handleBlur}
              fieldIsRequired
            />

            <InputPhoneNumber
              id="representative_customer_phone_number"
              label="Phone number"
              value={values.representative_customer_phone_number}
              onChange={(newValue) => setFieldValue("representative_customer_phone_number", newValue)}
              touched={touched.representative_customer_phone_number}
              errors={errors.representative_customer_phone_number}
              handleBlur={handleBlur}
              fieldIsRequired
            />
          </div>
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
          Add Customer
        </button>
      </DialogActions>

      <ConfirmClose
        open={confirmClose}
        handleClose={() => setConfirmClose(false)}
        handleResetAndClose={handleResetAndClose}
        title="Confirm close add customer!"
      >
        <p className="py-4">There are some changes, are you sure you want to skip it?</p>
      </ConfirmClose>

      <PageLoadingBackdrop open={createCustomerStatus === callApiStatus.loading} />
    </CommonDialog>
  );
}

export default CreateCustomerDialog;
