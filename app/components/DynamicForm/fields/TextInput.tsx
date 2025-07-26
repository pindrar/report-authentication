import React from "react";
import { FieldSchema } from "../index";
import { FieldError, FieldErrorsImpl, Merge, UseFormRegister } from "react-hook-form";

interface TextInputProps {
  field: FieldSchema;
  register: UseFormRegister<any>;
  error?: FieldError;
  onEnter?: () => void;
}

const TextInput = ({ field, register, error, onEnter }: TextInputProps) => (
  <div className="flex flex-col">
    <label className="font-medium mb-1">{field.label}</label>
    <input
      type={field.type}
      placeholder={field.placeholder || ""}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onEnter?.();
        }
      }}
      {...register(field.name)}
      className="border rounded px-3 py-2"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

export default TextInput;
