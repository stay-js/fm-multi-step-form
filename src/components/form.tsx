'use client';

import type { TBilling, TPlan } from './plan';
import type { TInfo } from './info';
import type { TAddons } from './add-ons';
import { useState } from 'react';
import { cn } from '~/utils/cn';
import { Info } from './info';
import { Plan } from './plan';
import { AddOns } from './add-ons';

export const Form: React.FC = () => {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);

  const [info, setInfo] = useState<TInfo>({
    name: '',
    email: '',
    phone: '',
  });

  const [plan, setPlan] = useState<TPlan>('arcade');
  const [billing, setBilling] = useState<TBilling>('yearly');

  const [addons, setAddons] = useState<TAddons>({
    online: false,
    storage: false,
    customizableProfile: false,
  });

  return (
    <div className="relative flex min-h-screen w-screen flex-col rounded-lg bg-white lg:min-h-fit lg:w-fit lg:flex-row lg:p-4">
      <div className="relative isolate flex gap-4 ">
        <picture className="w-full">
          <source
            srcSet="/bg-sidebar-desktop.svg"
            media="(min-width: 1024px)"
            className="-z-10 select-none"
          />
          <img src="/bg-sidebar-mobile.svg" className="w-full" alt="" />
        </picture>

        <ul className="absolute flex w-full justify-center gap-6 p-10 text-white lg:inset-0 lg:flex-col">
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
          plan={plan}
          setPlan={setPlan}
          billing={billing}
          setBilling={setBilling}
          prevStep={() => setStep(0)}
          nextStep={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <AddOns
          addons={addons}
          setAddons={setAddons}
          billing={billing}
          prevStep={() => setStep(1)}
          nextStep={() => setStep(3)}
        />
      )}
    </div>
  );
};
