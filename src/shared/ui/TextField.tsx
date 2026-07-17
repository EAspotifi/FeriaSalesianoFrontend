import type { InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errors?: string[];
}

export function TextField({ label, errors, id, ...rest }: TextFieldProps) {
  const inputId = id ?? rest.name;
  const hasError = Boolean(errors && errors.length > 0);

  return (
    <div className="field">
      <label className="field__label" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className={`field__input${hasError ? " field__input--error" : ""}`}
        {...rest}
      />
      {hasError && (
        <ul className="field__errors">
          {errors!.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
