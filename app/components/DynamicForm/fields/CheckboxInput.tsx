import React from "react";
import { FieldSchema } from "../index";

const CheckboxInput = ({ field, register, error }: any) => (
  <div className="flex items-center space-x-2">
    <input
      type="checkbox"
      {...register(field.name, field.validation)}
      className="w-4 h-4"
    />
    <label className="font-medium">{field.label}</label>
    {error && <p className="text-red-500 text-sm ml-2">{error.message}</p>}
  </div>
);

export default CheckboxInput;