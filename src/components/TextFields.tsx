import { useTextFields } from "@/contexts/TextFieldsContext";

export function TextFields() {
  const { fields, addField, removeField, updateField } = useTextFields();

  return (
    <>
      <div className="d-flex flex-column gap-3">
        {fields.map((field) => (
          <div key={field.id} className="d-flex w-100 gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Text"
              value={field.text}
              onChange={(e) => updateField(field.id, { text: e.target.value })}
            />

            <input
              type="color"
              className="form-control form-control-color"
              value={field.textColor}
              onChange={(e) =>
                updateField(field.id, { textColor: e.target.value })
              }
            />

            <input
              type="color"
              className="form-control form-control-color"
              value={field.outlineColor}
              onChange={(e) =>
                updateField(field.id, { outlineColor: e.target.value })
              }
            />

            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => removeField(field.id)}
            >
              Remove
            </button>
          </div>
        ))}

        <div className="text-start">
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={addField}
          >
            Add Text Field
          </button>
        </div>
      </div>
    </>
  );
}
