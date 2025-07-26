"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React, { useState } from "react";
import TextInput from "./fields/TextInput";
import NumberInput from "./fields/NumberInput";
import SelectInput from "./fields/SelectInput";
import CheckboxInput from "./fields/CheckboxInput";
import TextArea from "./fields/TextArea";
import DateInput from "./fields/DateInput";

export type FieldType = "text" | "number" | "select" | "checkbox" | "email" | "textarea" | "date";

export interface FieldSchema {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { label: string; value: string }[]; // for select
  validation?: z.ZodTypeAny;
  step?: number; // for multi-step
}

interface DynamicFormProps {
  schema: FieldSchema[];
  onSubmit: SubmitHandler<unknown>;
}

const buildZodSchema = (schema: FieldSchema[]) => {
  const shape: Record<string, z.ZodTypeAny> = {};
  schema.forEach(field => {
    shape[field.name] = field.validation || z.any();
  });
  return z.object(shape);
};

const DynamicForm: React.FC<DynamicFormProps> = ({ schema, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = Array.from(new Set(schema.map(f => f.step || 0))).sort();
  const stepFields = schema.filter(f => (f.step || 0) === steps[currentStep]);
  const zodSchema = buildZodSchema(stepFields);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues
  } = useForm({
    resolver: zodResolver(zodSchema),
    mode: "onTouched"
  });

  const renderField = (field: FieldSchema) => {
    switch (field.type) {
      case "text":
      case "email":
        return <TextInput field={field} register={register} error={errors[field.name]} onEnter={() => {console.log('>>>GGGG')}}/>;
      case "number":
        return <NumberInput field={field} register={register} error={errors[field.name]} />;
      case "select":
        return <SelectInput field={field} register={register} error={errors[field.name]} />;
      case "checkbox":
        return <CheckboxInput field={field} register={register} error={errors[field.name]} />;
      case "textarea":
        return <TextArea field={field} register={register} error={errors[field.name]} />;
      case "date":
        return <DateInput field={field} register={register} error={errors[field.name]} />;
      default:
        return null;
    }
  };

  const handleNext = async () => {
    const valid = await trigger(stepFields.map(f => f.name));
    if (valid && currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const isLastStep = currentStep === steps.length - 1;

  const handleFinalSubmit = async () => {
    const valid = await trigger();
    if (valid) {
      const allValues = getValues();
      onSubmit(allValues);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      {stepFields.map((field) => (
        <div key={field.name}>{renderField(field)}</div>
      ))}

      <div className="flex gap-2">
        {currentStep > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Back
          </button>
        )}

        {!isLastStep ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={handleFinalSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
};

export default DynamicForm;