import React, { useMemo } from "react";
import { NumericFormat } from "react-number-format";
import { v4 as uuidv4 } from "uuid";

export default function SmallInputNumber(props) {
  const { id, value, onChange, ...rest } = props;

  const inputId = useMemo(() => {
    if (!id) {
      return uuidv4();
    }
    return id;
  }, [id]);

  return (
    <div className="w-full h-9">
      <NumericFormat
        id={inputId}
        name={inputId}
        value={value}
        onValueChange={(values) => {
          if (typeof values.floatValue === "number")
            onChange(values.floatValue);
          else onChange(0);
        }}
        allowNegative={false}
        decimalScale={2}
        valueIsNumericString={true}
        thousandSeparator=","
        className="w-full h-full px-4 py-1 input-border-bg-color text-gray-800 text-right"
        min={0}
        {...rest}
      />
    </div>
  );
}
