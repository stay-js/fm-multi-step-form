import type { TBilling } from './plan';
import Image from 'next/image';
import { cn } from '~/utils/cn';
import { addOns } from '~/constants/add-ons';

export type TSelectedAddOns = {
  online: boolean;
  storage: boolean;
  customizableProfile: boolean;
};

type keys = keyof typeof addOns;

export const AddOn: React.FC<{
  selectedAddOns: TSelectedAddOns;
  setSelectedAddOns: (addOns: TSelectedAddOns) => void;
  billing: TBilling;
  prevStep: () => void;
  nextStep: () => void;
}> = ({ selectedAddOns, setSelectedAddOns, billing, prevStep, nextStep }) => (
  <div className="flex h-full flex-col justify-between bg-magnolia lg:min-w-[42rem] lg:bg-transparent">
    <div className="absolute left-4 right-4 top-32 flex h-fit flex-col gap-8 rounded-lg bg-white px-8 py-10 lg:static lg:h-full lg:px-24">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold text-marine-blue">Pick add-ons</h1>
        <p className="font-medium text-cool-gray">Add-ons help enhance your gaming experience.</p>
      </div>

      <div className="flex flex-col gap-3" role="group">
        {Object.entries(addOns).map(([key, { name, description, monthlyPrice, yearlyPrice }]) => (
          <div
            key={key}
            onClick={() =>
              setSelectedAddOns({ ...selectedAddOns, [key]: !selectedAddOns[key as keys] })
            }
            className={cn(
              'flex items-center gap-4 rounded-lg border p-3 text-start hover:border-purplish-blue focus:border-purplish-blue',
              selectedAddOns[key as keys]
                ? 'border-purplish-blue bg-alabaster'
                : 'border-light-gray',
            )}
          >
            <span
              role="checkbox"
              aria-checked={selectedAddOns[key as keys]}
              aria-labelledby={`${key}-label`}
              className={cn(
                'grid h-5 w-5 place-content-center rounded border',
                selectedAddOns[key as keys] && 'bg-purplish-blue',
              )}
            >
              {selectedAddOns[key as keys] && (
                <Image src="/icon-checkmark.svg" width={12} height={9} alt="" />
              )}
            </span>

            <div>
              <label id={`${key}-label`} className="font-bold text-marine-blue">
                {name}
              </label>
              <p className="font-medium text-cool-gray">{description}</p>
            </div>

            <p className="ms-auto font-medium text-purplish-blue">
              +${billing === 'monthly' ? `${monthlyPrice}/mo` : `${yearlyPrice}/yr`}
            </p>
          </div>
        ))}
      </div>
    </div>

    <div className="mt-auto flex items-center justify-between bg-white p-4 lg:px-24">
      <button
        type="button"
        onClick={prevStep}
        className="font-medium text-cool-gray transition-colors hover:text-marine-blue focus:text-marine-blue"
      >
        Go Back
      </button>

      <button
        type="button"
        onClick={nextStep}
        className="rounded-lg bg-marine-blue px-6 py-3 font-medium text-white transition-colors hover:bg-purplish-blue active:bg-purplish-blue"
      >
        Next Step
      </button>
    </div>
  </div>
);
