import type { TBilling as Billing } from './plan';
import type { TSelectedAddOns as SelectedAddOns } from './add-on';
import type { Plan } from '~/constants/plans';
import { useState } from 'react';
import Image from 'next/image';
import { addOns } from '~/constants/add-ons';
import { plans } from '~/constants/plans';

export const Summary: React.FC<{
  plan: Plan;
  billing: Billing;
  selectedAddOns: SelectedAddOns;
  backToPlan: () => void;
  prevStep: () => void;
}> = ({ plan, billing, selectedAddOns, backToPlan, prevStep }) => {
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  let total = billing === 'monthly' ? plans[plan].monthlyPrice : plans[plan].yearlyPrice;

  Object.entries(addOns).forEach(([key, { monthlyPrice, yearlyPrice }]) => {
    if (selectedAddOns[key as keyof typeof addOns]) {
      total += billing === 'monthly' ? monthlyPrice : yearlyPrice;
    }
  });

  return (
    <div className="flex min-h-full flex-col justify-between gap-8 bg-magnolia lg:h-fit lg:w-[42rem] lg:bg-transparent">
      <div className="z-10 mx-4 mt-32 flex h-fit flex-col gap-8 rounded-lg bg-white px-8 py-10 lg:m-0 lg:min-h-full lg:px-24">
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
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-bold text-marine-blue">Finishing up</h1>
              <p className="font-medium text-cool-gray">
                Double-check everything looks OK before confirming.
              </p>
            </div>

            <div className="flex flex-col gap-4 rounded-lg bg-alabaster p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-marine-blue">
                    {plans[plan].name} ({billing[0]?.toUpperCase() + billing.slice(1)})
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
                  {billing === 'monthly'
                    ? `${plans[plan].monthlyPrice}/mo`
                    : `${plans[plan].yearlyPrice}/yr`}
                </span>
              </div>

              {Object.values(selectedAddOns).some(Boolean) && (
                <>
                  <hr />

                  {Object.entries(addOns).map(
                    ([key, { name, monthlyPrice, yearlyPrice }]) =>
                      selectedAddOns[key as keyof typeof addOns] && (
                        <div key={key} className="flex justify-between gap-4">
                          <p className="text-cool-gray">{name}</p>
                          <span className="text-marine-blue">
                            ${billing === 'monthly' ? `${monthlyPrice}/mo` : `${yearlyPrice}/yr`}
                          </span>
                        </div>
                      ),
                  )}
                </>
              )}
            </div>

            <div className="flex justify-between gap-4 px-4">
              <p className="text-cool-gray">
                Total (per {billing === 'monthly' ? 'month' : 'year'})
              </p>
              <span className="font-bold text-purplish-blue">
                +${total}/{billing === 'monthly' ? 'mo' : 'yr'}
              </span>
            </div>
          </>
        )}
      </div>

      {!isConfirmed && (
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
            onClick={() => setIsConfirmed(true)}
            className="rounded-lg bg-purplish-blue px-6 py-3 font-medium text-white transition-colors hover:bg-marine-blue active:bg-marine-blue"
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};
