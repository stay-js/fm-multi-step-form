import { forwardRef, useId } from 'react';

type Props = {
  id?: string;
  label: string;
  placeholder?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ id: customId, label, placeholder, error, ...props }, ref) => {
    const id = useId();

    return (
      <div className="flex w-full flex-col gap-1">
        <div className="flex justify-between gap-2">
          <label htmlFor={customId || id} className="text-marine-blue w-fit">
            {label}
          </label>

          {error && <p className="text-strawberry-red font-bold">{error}</p>}
        </div>

        <input
          className="text-marine-blue focus:border-purplish-blue border-light-gray rounded-lg border px-4 py-3 font-medium focus:outline-none"
          type="text"
          id={customId || id}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';
