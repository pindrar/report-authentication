"use client";
import { z } from "zod";
import DynamicForm, { FieldSchema } from "../DynamicForm";

export default function BioForm() {
  const schema: FieldSchema[] = [
    {
      name: "name",
      label: "Nama",
      type: "text",
      validation: z.string().min(3, "Minimal 3 karakter"),
      step: 0,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      validation: z.string().email("Format email tidak valid"),
      step: 1,
    },
    {
      name: "bio",
      label: "Bio",
      type: "textarea",
      validation: z.string().optional(),
      step: 2,
    },
    {
      name: "dob",
      label: "Tanggal Lahir",
      type: "date",
      validation: z.string().nonempty("Tanggal wajib diisi"),
      step: 3,
    },
    {
      name: "gender",
      label: "Jenis Kelamin",
      type: "select",
      options: [
        { label: "Laki-laki", value: "male" },
        { label: "Perempuan", value: "female" },
      ],
      validation: z.string().nonempty("Pilih salah satu"),
      step: 4,
    },
  ];
  const handleSubmit = async (data: any) => {
    console.log("Data dari form (server):", data);
    // Misal: await saveToDatabase(data);
  };

  return <DynamicForm schema={schema} onSubmit={handleSubmit} />;
}
