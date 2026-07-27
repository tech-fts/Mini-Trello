import type { ChangeEvent, HTMLInputTypeAttribute } from "react";

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  disabled?: boolean;
  /** Render as textarea instead of input. */
  multiline?: boolean;
}

/**
 * Reusable form field — eliminates duplicate label+input patterns
 * in CreateBoardModal, CardModal, LoginPage, and RegisterPage.
 *
 * DRY: One component instead of repeated <div className="form-group"><label>...</div>.
 */
export function FormField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  disabled = false,
  multiline = false,
}: FormFieldProps) {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(e.target.value);
  };

  return (
    <div className="form-group">
      <label>{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          rows={3}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
    </div>
  );
}
