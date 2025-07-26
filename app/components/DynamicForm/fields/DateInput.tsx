import React from "react";
import { FieldSchema } from "../index";

const DateInput = ({ field, register, error }: any) => (
  <div className="flex flex-col">
    <label className="font-medium mb-1">{field.label}</label>
    <input
      type="date"
      {...register(field.name)}
      className="border rounded px-3 py-2"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

export default DateInput;