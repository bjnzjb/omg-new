import React, { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

export default function SmallInputArea(props) {
  const { id, value, onChange, ...rest } = props;

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
    <div className="w-full h-auto">
      <textarea
        id={inputId}
        value={value}
        onChange={onChangeValue}
        rows={4}
        className="w-full h-full px-2 py-[5px] input-border-bg-color text-gray-800 block"
        {...rest}
      />
    </div>
  );
}
