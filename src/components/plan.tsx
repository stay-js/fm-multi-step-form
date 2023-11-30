'use client';

import { type Plan as TPlan, type Billing, plans } from '~/constants/plans';
import { RadioGroup, Switch } from '@headlessui/react';
import Image from 'next/image';
import { cn } from '~/utils/cn';
import { BottomNavigation, Title } from './ui';

export const Plan: React.FC<{
  plan: TPlan;
  setPlan: React.Dispatch<React.SetStateAction<TPlan>>;
  billing: Billing;
  setBilling: React.Dispatch<React.SetStateAction<Billing>>;
  prevStep: () => void;
  nextStep: () => void;
}> = ({ plan, setPlan, billing, setBilling, prevStep, nextStep }) => (
  <div className="page-container">
    <div className="page-content">
      <Title title="Select your plan">You have the option of monthly or yearly billing.</Title>

      <div className="flex flex-col gap-6">
        <RadioGroup value={plan} onChange={setPlan} className="grid gap-3 lg:grid-cols-3">
          {Object.entries(plans).map(([key, { icon, name, monthlyPrice, yearlyPrice }]) => (
            <RadioGroup.Option key={key} value={key}>
              {({ checked }) => (
                <div
                  className={cn(
                    'flex cursor-pointer items-center gap-4 rounded-lg border p-4 hover:border-purplish-blue focus:border-purplish-blue lg:flex-col lg:items-start lg:gap-10',
                    checked ? 'border-purplish-blue bg-alabaster' : 'border-light-gray',
                  )}
                >
                  <Image src={icon} alt={`${name} icon`} width={40} height={40} />

                  <div>
                    <p className="font-bold text-marine-blue">{name}</p>
                    <p className="font-medium text-cool-gray">
                      ${billing === 'monthly' ? `${monthlyPrice}/mo` : `${yearlyPrice}/yr`}
                    </p>
                    {billing === 'yearly' && (
                      <p className="text-sm font-medium text-marine-blue">2 months free</p>
                    )}
                  </div>
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </RadioGroup>

        <div className="flex items-center justify-center gap-6 rounded-lg bg-alabaster p-4">
          <button
            type="button"
            onClick={() => setBilling('monthly')}
            className={cn('font-bold text-cool-gray', billing === 'monthly' && 'text-marine-blue')}
          >
            Monthly
          </button>

          <Switch
            checked={billing === 'yearly'}
            onChange={() => setBilling((value) => (value === 'yearly' ? 'monthly' : 'yearly'))}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-marine-blue"
          >
            <span
              className={cn(
                'inline-block h-4 w-4 transform rounded-full bg-white transition',
                billing === 'yearly' ? 'translate-x-6' : 'translate-x-1',
              )}
            />
          </Switch>

          <button
            type="button"
            onClick={() => setBilling('yearly')}
            className={cn('font-bold text-cool-gray', billing === 'yearly' && 'text-marine-blue')}
          >
            Yearly
          </button>
        </div>
      </div>
    </div>

    <BottomNavigation prevStep={prevStep} nextStep={nextStep} />
  </div>
);
