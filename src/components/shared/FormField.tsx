import { forwardRef } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    { label, className = "", error, registration, type = "text", ...props },
    ref
  ) => {
    return (
      <div className="form-control w-full space-y-1">
        <label className="label font-semibold">
          <span className="label-text">{label}</span>
        </label>

        <input
          {...registration}
          {...props}
          ref={(e) => {
            registration.ref(e);
            if (typeof ref === "function") ref(e);
            else if (ref) ref.current = e;
          }}
          type={type}
          className={`input w-full ${error ? "input-error" : ""} ${className}`}
        />

        {error && <p className="text-error text-xs">{error.message}</p>}
      </div>
    );
  }
);

FormField.displayName = "FormField";

export default FormField;
