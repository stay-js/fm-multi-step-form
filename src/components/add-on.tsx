import type { Dispatch, SetStateAction } from 'react';
import type { TBilling } from './plan';
import Image from 'next/image';
import { cn } from '~/utils/cn';
import { addOns } from '~/constants/add-ons';
import { BottomNavigation, Title } from './ui';

export type TSelectedAddOns = {
  online: boolean;
  storage: boolean;
  customizableProfile: boolean;
};

type keys = keyof typeof addOns;

export const AddOn: React.FC<{
  selectedAddOns: TSelectedAddOns;
  setSelectedAddOns: Dispatch<SetStateAction<TSelectedAddOns>>;
  billing: TBilling;
  prevStep: () => void;
  nextStep: () => void;
}> = ({ selectedAddOns, setSelectedAddOns, billing, prevStep, nextStep }) => (
  <div className="page-container">
    <div className="page-content">
      <Title title="Pick add-ons">Add-ons help enhance your gaming experience.</Title>

      <div className="flex flex-col gap-3" role="group">
        {Object.entries(addOns).map(([key, { name, description, monthlyPrice, yearlyPrice }]) => (
          <div
            key={key}
            onClick={() => setSelectedAddOns((value) => ({ ...value, [key]: !value[key as keys] }))}
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

    <BottomNavigation prevStep={prevStep} nextStep={nextStep} />
  </div>
);
