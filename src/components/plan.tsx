import { RadioGroup, Switch } from '@headlessui/react';
import Image from 'next/image';
import { cn } from '~/utils/cn';

export type TPlan = 'arcade' | 'advanced' | 'pro';
export type TBilling = 'monthly' | 'yearly';

export const Plan: React.FC<{
  plan: TPlan;
  setPlan: (plan: TPlan) => void;
  billing: TBilling;
  setBilling: (billing: TBilling) => void;
  prevStep: () => void;
  nextStep: () => void;
}> = ({ plan, setPlan, billing, setBilling, prevStep, nextStep }) => (
  <div className="flex h-full flex-col justify-between bg-magnolia lg:min-w-[42rem] lg:bg-transparent">
    <div className="absolute left-4 right-4 top-32 flex h-fit flex-col gap-6 rounded-lg bg-white px-8 py-10 lg:static lg:h-full lg:px-24">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold text-marine-blue">Select your plan</h1>
        <p className="font-medium text-cool-gray">
          You have the option of monthly or yearly billing.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <RadioGroup value={plan} onChange={setPlan} className="grid gap-3 lg:grid-cols-3">
          <RadioGroup.Option value="arcade">
            {({ checked }) => (
              <div
                className={cn(
                  'flex cursor-pointer items-center gap-4 rounded-lg border p-4 lg:flex-col lg:items-start lg:gap-10',
                  checked ? 'border-purplish-blue bg-alabaster' : 'border-light-gray',
                )}
              >
                <Image src="/icon-arcade.svg" alt="Arcade icon" width={40} height={40} />

                <div>
                  <p className="font-bold text-marine-blue">Arcade</p>
                  <p className="font-medium text-cool-gray">
                    ${billing === 'monthly' ? '9/mo' : '90/yr'}
                  </p>
                  {billing === 'yearly' && (
                    <p className="text-sm font-medium text-marine-blue">2 months free</p>
                  )}
                </div>
              </div>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option value="advanced">
            {({ checked }) => (
              <div
                className={cn(
                  'flex cursor-pointer items-center gap-4 rounded-lg border p-4 lg:flex-col lg:items-start lg:gap-10',
                  checked ? 'border-purplish-blue bg-alabaster' : 'border-light-gray',
                )}
              >
                <Image src="/icon-advanced.svg" alt="Arcade icon" width={40} height={40} />

                <div>
                  <p className="font-bold text-marine-blue">Advanced</p>
                  <p className="font-medium text-cool-gray">
                    ${billing === 'monthly' ? '12/mo' : '120/yr'}
                  </p>
                  {billing === 'yearly' && (
                    <p className="text-sm font-medium text-marine-blue">2 months free</p>
                  )}
                </div>
              </div>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option value="pro">
            {({ checked }) => (
              <div
                className={cn(
                  'flex cursor-pointer items-center gap-4 rounded-lg border p-4 lg:flex-col lg:items-start lg:gap-10',
                  checked ? 'border-purplish-blue bg-alabaster' : 'border-light-gray',
                )}
              >
                <Image src="/icon-pro.svg" alt="Arcade icon" width={40} height={40} />

                <div>
                  <p className="font-bold text-marine-blue">Pro</p>
                  <p className="font-medium text-cool-gray">
                    ${billing === 'monthly' ? '15/mo' : '150/yr'}
                  </p>
                  {billing === 'yearly' && (
                    <p className="text-sm font-medium text-marine-blue">2 months free</p>
                  )}
                </div>
              </div>
            )}
          </RadioGroup.Option>
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
            onChange={() => setBilling(billing === 'yearly' ? 'monthly' : 'yearly')}
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

    <div className="mt-auto flex items-center justify-between bg-white p-4 lg:px-24">
      <button
        type="button"
        onClick={prevStep}
        className="font-medium text-cool-gray transition-colors hover:text-marine-blue active:text-marine-blue"
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
