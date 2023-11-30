'use client';

import { type SelectedAddOns, addOns } from '~/constants/add-ons';
import { type Plan, plans } from '~/constants/plans';
import { useState } from 'react';
import Image from 'next/image';
import { BottomNavigation, Title } from './ui';

export const Summary: React.FC<{
  selectedPlan: Plan;
  isBillingMonthly: boolean;
  selectedAddOns: SelectedAddOns;
  backToPlan: () => void;
  prevStep: () => void;
}> = ({ selectedPlan, isBillingMonthly, selectedAddOns, backToPlan, prevStep }) => {
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  let total = isBillingMonthly ? plans[selectedPlan].monthlyPrice : plans[selectedPlan].yearlyPrice;

  Object.entries(addOns).forEach(([key, { monthlyPrice, yearlyPrice }]) => {
    if (selectedAddOns[key as keyof typeof selectedAddOns]) {
      total += isBillingMonthly ? monthlyPrice : yearlyPrice;
    }
  });

  return (
    <div className="page-container">
      <div className="page-content">
        {isConfirmed ? (
          <div className="grid h-full place-content-center gap-8 py-16 text-center">
            <Image
              src="/icon-thank-you.svg"
              className="mx-auto"
              width={80}
              height={80}
              alt="Checkmark"
            />

            <div className="flex flex-col gap-3 text-cool-gray">
              <h1 className="text-3xl font-bold text-marine-blue">Thank you!</h1>
              <p className="text-lg">
                Thanks for confirming your subscription! We hope you have fun using our platform. If
                you ever need support, please feel free to email us at support@loregaming.com.
              </p>
            </div>
          </div>
        ) : (
          <>
            <Title title="Finishing up">Double-check everything looks OK before confirming.</Title>

            <div className="flex flex-col gap-4 rounded-lg bg-alabaster p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-marine-blue">
                    {plans[selectedPlan].name} ({isBillingMonthly ? 'Monthly' : 'Yearly'})
                  </p>
                  <button
                    type="button"
                    onClick={backToPlan}
                    className="text-cool-gray underline hover:text-purplish-blue focus:text-purplish-blue"
                  >
                    Change
                  </button>
                </div>

                <span className="font-medium text-marine-blue">
                  $
                  {isBillingMonthly
                    ? `${plans[selectedPlan].monthlyPrice}/mo`
                    : `${plans[selectedPlan].yearlyPrice}/yr`}
                </span>
              </div>

              {Object.values(selectedAddOns).some(Boolean) && (
                <>
                  <hr />

                  {Object.entries(addOns).map(
                    ([key, { name, monthlyPrice, yearlyPrice }]) =>
                      selectedAddOns[key as keyof typeof selectedAddOns] && (
                        <div key={key} className="flex justify-between gap-4">
                          <p className="text-cool-gray">{name}</p>
                          <span className="text-marine-blue">
                            ${isBillingMonthly ? `${monthlyPrice}/mo` : `${yearlyPrice}/yr`}
                          </span>
                        </div>
                      ),
                  )}
                </>
              )}
            </div>

            <div className="flex justify-between gap-4 px-4">
              <p className="text-cool-gray">Total (per {isBillingMonthly ? 'month' : 'year'})</p>
              <span className="font-bold text-purplish-blue">
                +${total}/{isBillingMonthly ? 'mo' : 'yr'}
              </span>
            </div>
          </>
        )}
      </div>

      {!isConfirmed && (
        <BottomNavigation prevStep={prevStep} confirm={() => setIsConfirmed(true)} />
      )}
    </div>
  );
};
