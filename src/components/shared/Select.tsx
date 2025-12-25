import React, { forwardRef } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
  error?: FieldError;
  registration: UseFormRegisterReturn;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, options, defaultValue, className, error, registration, ...props },
    ref
  ) => {
    return (
      <div className="form-control w-full space-y-1">
        <label className="label font-semibold">
          <span className="label-text">{label}</span>
        </label>

        <select
          className={`select select-bordered w-full ${
            error ? "select-error" : ""
          } ${className || ""}`}
          defaultValue={defaultValue}
          {...registration}
          {...props}
          ref={(e) => {
            if (registration?.ref) registration.ref(e);
            if (typeof ref === "function") ref(e);
            else if (ref)
              (
                ref as React.MutableRefObject<HTMLSelectElement | null>
              ).current = e;
          }}
        >
          <option disabled={true}>{defaultValue || "Select an option"}</option>

          {options.map((o, i) => (
            <option key={i} value={o}>
              {o}
            </option>
          ))}
        </select>

        {error && <p className="text-error text-xs mt-1">{error.message}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
export default Select;
