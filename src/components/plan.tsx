'use client';

import { type Plan as TPlan, plans } from '~/constants/plans';
import { RadioGroup, Switch } from '@headlessui/react';
import Image from 'next/image';
import { cn } from '~/utils/cn';
import { BottomNavigation, Title } from './ui';

export const Plan: React.FC<{
  selectedPlan: TPlan;
  setSelectedPlan: React.Dispatch<React.SetStateAction<TPlan>>;
  isBillingMonthly: boolean;
  setIsBillingMonthly: React.Dispatch<React.SetStateAction<boolean>>;
  prevStep: () => void;
  nextStep: () => void;
}> = ({
  selectedPlan,
  setSelectedPlan,
  isBillingMonthly,
  setIsBillingMonthly,
  prevStep,
  nextStep,
}) => (
  <div className="page-container">
    <div className="page-content">
      <Title title="Select your plan">You have the option of monthly or yearly billing.</Title>

      <div className="flex flex-col gap-6">
        <RadioGroup
          value={selectedPlan}
          onChange={setSelectedPlan}
          className="grid gap-3 lg:grid-cols-3"
        >
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
                      ${isBillingMonthly ? `${monthlyPrice}/mo` : `${yearlyPrice}/yr`}
                    </p>
                    {!isBillingMonthly && (
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
            onClick={() => setIsBillingMonthly(true)}
            className={cn('font-bold text-cool-gray', isBillingMonthly && 'text-marine-blue')}
          >
            Monthly
          </button>

          <Switch
            checked={!isBillingMonthly}
            onChange={() => setIsBillingMonthly((value) => !value)}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-marine-blue"
          >
            <span
              className={cn(
                'inline-block h-4 w-4 transform rounded-full bg-white transition',
                isBillingMonthly ? 'translate-x-1' : 'translate-x-6',
              )}
            />
          </Switch>

          <button
            type="button"
            onClick={() => setIsBillingMonthly(false)}
            className={cn('font-bold text-cool-gray', !isBillingMonthly && 'text-marine-blue')}
          >
            Yearly
          </button>
        </div>
      </div>
    </div>

    <BottomNavigation prevStep={prevStep} nextStep={nextStep} />
  </div>
);
