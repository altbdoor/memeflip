import { createContext, useContext, useState } from "react";

interface TextField {
  id: string;
  text: string;
  textColor: string;
  outlineColor: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface TextFieldsContextType {
  fields: TextField[];
  addField: () => void;
  removeField: (id: string) => void;
  updateField: (id: string, updates: Partial<TextField>) => void;
}

const TextFieldsContext = createContext<TextFieldsContextType | undefined>(
  undefined,
);

export function TextFieldsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fields, setFields] = useState<TextField[]>([
    {
      id: crypto.randomUUID(),
      text: "bottom text",
      textColor: "#000",
      outlineColor: "#fff",
      x: 4,
      y: 4,
      width: 0,
      height: 0,
    },
  ]);

  const addField = () => {
    setFields([
      ...fields,
      {
        id: crypto.randomUUID(),
        text: "",
        textColor: "#000",
        outlineColor: "#fff",
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
    ]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const updateField = (id: string, updates: Partial<TextField>) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, ...updates } : field,
      ),
    );
  };

  return (
    <TextFieldsContext.Provider
      value={{ fields, addField, removeField, updateField }}
    >
      {children}
    </TextFieldsContext.Provider>
  );
}

export function useTextFields() {
  const context = useContext(TextFieldsContext);
  if (!context) {
    throw new Error("useTextFields must be used within a TextFieldsProvider");
  }
  return context;
}
