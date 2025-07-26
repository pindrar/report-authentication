import React from "react";
import { FieldSchema } from "../index";

const SelectInput = ({ field, register, error }: any) => (
  <div className="flex flex-col">
    <label className="font-medium mb-1">{field.label}</label>
    <select {...register(field.name, field.validation)} className="border rounded px-3 py-2">
      <option value="">-- Pilih --</option>
      {field.options?.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

export default SelectInput;