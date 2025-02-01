import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo } from "react";
import PhoneInput from "react-phone-number-input";
import { v4 as uuidv4 } from "uuid";
import "react-phone-number-input/style.css";
import "./style.css";

export default function InputPhoneNumber(props) {
  const { id, value, onChange, label, handleBlur, touched, errors, ...rest } =
    props;

  const inputId = useMemo(() => {
    if (!id) {
      return uuidv4();
    }
    return id;
  }, [id]);

  return (
    <div className="w-full h-auto mb-3">
      <label htmlFor={inputId} className="text-base font-semibold block mb-1">
        {props.fieldIsRequired ? <span className="text-red-500">*</span> : null}
        {label}
      </label>

      <div className="w-full h-[42px]">
        <PhoneInput
          id={id}
          international
          countryCallingCodeEditable={false}
          defaultCountry="JP"
          value={value}
          onChange={(value) => {
            // console.log("phone number value: ", value);
            onChange(value || "");
          }}
          onBlur={handleBlur}
          {...rest}
        />
      </div>
      {touched && errors ? (
        <p className="w-full h-auto text-sm text-red-500 !font-bai-jamjuree pl-5 relative">
          <div className="absolute w-5 h-5 left-0 top-0 flex items-center justify-center">
            <FontAwesomeIcon icon={faCircleExclamation} size="sx" />
          </div>
          {errors}
        </p>
      ) : null}
    </div>
  );
}
