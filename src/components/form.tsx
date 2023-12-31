'use client';

import type { Plan as TPlan } from '~/constants/plans';
import { type SelectedAddOns, defaultValues as defaultAddons } from '~/constants/add-ons';
import { type TInfo, Info, defaultValues as defaultInfo } from './info';
import { useState } from 'react';
import { cn } from '~/utils/cn';
import { Plan } from './plan';
import { AddOn } from './add-on';
import { Summary } from './summary';

export const Form: React.FC = () => {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [info, setInfo] = useState<TInfo>(defaultInfo);
  const [selectedPlan, setSelectedPlan] = useState<TPlan>('arcade');
  const [isBillingMonthly, setIsBillingMonthly] = useState<boolean>(false);
  const [selectedAddOns, setSelectedAddOns] = useState<SelectedAddOns>(defaultAddons);

  return (
    <div className="relative flex min-h-screen w-screen flex-col rounded-2xl bg-white lg:min-h-fit lg:w-fit lg:flex-row lg:p-4">
      <div className="absolute flex w-full gap-4 lg:relative lg:w-fit">
        <picture className="w-full">
          <source
            srcSet="/bg-sidebar-desktop.svg"
            media="(min-width: 1024px)"
            className="-z-10 select-none"
          />
          <img src="/bg-sidebar-mobile.svg" className="w-full" alt="" />
        </picture>

        <ul className="absolute flex w-full justify-center gap-6 p-10 text-white lg:inset-0 lg:flex-col lg:justify-start">
          {['Your Info', 'Select Plan', 'Add-ons', 'Summary'].map((title, index) => (
            <li className="flex items-center gap-4" key={title}>
              <div
                className={cn(
                  'grid h-10 w-10 place-content-center rounded-full border font-bold',
                  index === step && 'bg-light-blue text-purplish-blue',
                )}
              >
                {index + 1}
              </div>

              <div className="hidden text-start lg:block">
                <p className="text-white">STEP {index + 1}</p>
                <h2 className="font-bold uppercase text-white">{title}</h2>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {step === 0 && <Info info={info} setInfo={setInfo} nextStep={() => setStep(1)} />}
      {step === 1 && (
        <Plan
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          isBillingMonthly={isBillingMonthly}
          setIsBillingMonthly={setIsBillingMonthly}
          prevStep={() => setStep(0)}
          nextStep={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <AddOn
          selectedAddOns={selectedAddOns}
          setSelectedAddOns={setSelectedAddOns}
          isBillingMonthly={isBillingMonthly}
          prevStep={() => setStep(1)}
          nextStep={() => setStep(3)}
        />
      )}
      {step === 3 && (
        <Summary
          selectedPlan={selectedPlan}
          isBillingMonthly={isBillingMonthly}
          selectedAddOns={selectedAddOns}
          backToPlan={() => setStep(1)}
          prevStep={() => setStep(2)}
        />
      )}
    </div>
  );
};
