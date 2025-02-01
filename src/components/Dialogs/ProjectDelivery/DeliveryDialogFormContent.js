import { DialogActions, DialogContent, DialogContentText } from "@mui/material";
import React, { useEffect, useState } from "react";
import InputText from "../../UI/Forms/Inputs/InputText";
import InputArea from "../../UI/Forms/Inputs/InputArea";
import InputDate from "../../UI/Forms/Inputs/InputDate";
import { useFormik } from "formik";
import * as Yup from "yup";
import SelectSingle from "../../UI/Forms/Selects/SelectSingle";
import { deliveryStatusOptions } from "../../../constants/options";

function DeliveryDialogFormContent(props) {
  const { updateDelivery, handleSubmitForm, handleClose } = props;

  const validationSchema = Yup.object().shape({
    // TODO: Add Custom Message
    title: Yup.string().required().max(30),
    description: Yup.string().required().max(200),
    start_date: Yup.string().required(),
    status: Yup.string().required(),
  });

  const onSubmit = async (values) => {
    handleSubmitForm(values);
  };

  const { handleSubmit, errors, values, setFieldValue, touched, handleBlur, setFieldTouched } = useFormik({
    initialValues: {
      title: updateDelivery?.title || "",
      description: updateDelivery?.description || "",
      start_date: updateDelivery?.start_date || "",
      status: updateDelivery?.status || deliveryStatusOptions[0].value,
    },
    onSubmit,
    validationSchema,
  });

  useEffect(() => {
    console.log("updateDelivery", updateDelivery);
  }, [updateDelivery]);

  return (
    <>
      <DialogContent aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
          <InputText
            id="title"
            label="Title"
            value={values.title}
            onChange={(newValue) => setFieldValue("title", newValue)}
            touched={touched.title}
            errors={errors.title}
            handleBlur={handleBlur}
            fieldIsRequired
          />

          <InputArea
            id="description"
            label="Delivery Content"
            value={values.description}
            onChange={(newValue) => {
              setFieldValue("description", newValue);
            }}
            touched={touched.description}
            errors={errors.description}
            handleBlur={handleBlur}
            fieldIsRequired
          />

          <InputDate
            id="start_date"
            label="Delivery Date"
            value={values.start_date}
            onChange={(newValue) => {
              setFieldValue("start_date", newValue);
            }}
            touched={touched.start_date}
            errors={errors.start_date}
            handleBlur={handleBlur}
            fieldIsRequired
          />

          <SelectSingle
            id="status"
            label="Status"
            value={values.status}
            onChange={(newValue) => setFieldValue("status", newValue)}
            options={deliveryStatusOptions}
            touched={touched.status}
            errors={errors.status}
            setTouched={() => setFieldTouched("status", true)}
            fieldIsRequired
            isClearable={false}
            isSearchable={false}
            isDisabled={!Boolean(updateDelivery)} // TODO:
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
          onClick={() => {
            if (typeof handleClose === "function") handleClose();
          }}
          className="text-base px-4 py-2 rounded text-gray-800 bg-white hover:bg-gray-200 mr-4"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={() => handleSubmit()}
          className="text-base px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600"
        >
          {updateDelivery ? "Update delivery" : "Add delivery"}
        </button>
      </DialogActions>
    </>
  );
}

export default DeliveryDialogFormContent;
