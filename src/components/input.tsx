import { forwardRef, useId } from 'react';
import { cn } from '~/utils/cn';

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
        <div className="flex justify-between gap-2 text-sm">
          <label htmlFor={customId || id} className="w-fit text-marine-blue">
            {label}
          </label>

          {error && <p className="font-bold text-strawberry-red">{error}</p>}
        </div>

        <input
          className={cn(
            'rounded-lg border border-light-gray px-4 py-3 font-medium text-marine-blue focus:border-purplish-blue focus:outline-none',
            error && 'border-strawberry-red',
          )}
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
