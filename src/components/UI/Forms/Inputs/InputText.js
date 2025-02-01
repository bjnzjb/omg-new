import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

export default function InputText(props) {
  const { id, value, onChange, label, handleBlur, touched, errors, ...rest } = props;

  const inputId = useMemo(() => {
    if (!id) {
      return uuidv4();
    }
    return id;
  }, [id]);

  const onChangeValue = (e) => {
    onChange(e.currentTarget.value);
  };

  return (
    <div className="w-full h-auto mb-3">
      <label htmlFor={inputId} className="text-base font-semibold block mb-1">
        {props.fieldIsRequired ? <span className="text-red-500">*</span> : null}
        {label}
      </label>

      <div className="w-full h-[42px]">
        <input
          id={inputId}
          name={inputId}
          value={value}
          onChange={onChangeValue}
          onBlur={handleBlur}
          className="w-full h-full px-4 py-2 input-border-bg-color text-gray-800"
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
