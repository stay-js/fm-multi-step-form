import type { TBilling } from './plan';
import Image from 'next/image';
import { cn } from '~/utils/cn';

export type TAddons = {
  online: boolean;
  storage: boolean;
  customizableProfile: boolean;
};

export const AddOns: React.FC<{
  addons: TAddons;
  setAddons: (addons: TAddons) => void;
  billing: TBilling;
  prevStep: () => void;
  nextStep: () => void;
}> = ({ addons, setAddons, billing, prevStep, nextStep }) => (
  <div className="flex h-full flex-col justify-between bg-magnolia lg:min-w-[42rem] lg:bg-transparent">
    <div className="absolute left-4 right-4 top-32 flex h-fit flex-col gap-6 rounded-lg bg-white px-8 py-10 lg:static lg:h-full lg:px-24">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold text-marine-blue">Pick add-ons</h1>
        <p className="font-medium text-cool-gray">Add-ons help enhance your gaming experience.</p>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setAddons({ ...addons, online: !addons.online })}
          className={cn(
            'flex items-center gap-4 rounded-lg border p-3 text-start',
            addons.online ? 'border-purplish-blue bg-alabaster' : 'border-light-gray',
          )}
        >
          <span
            className={cn(
              'grid h-5 w-5 place-content-center rounded border',
              addons.online && 'bg-purplish-blue',
            )}
          >
            {addons.online && <Image src="/icon-checkmark.svg" width={12} height={9} alt="" />}
          </span>

          <div>
            <p className="font-bold text-marine-blue">Online service</p>
            <p className="font-medium text-cool-gray">Access to multiplayer games</p>
          </div>

          <p className="ms-auto font-medium text-purplish-blue">
            +${billing === 'monthly' ? '1/mo' : '10/yr'}
          </p>
        </button>

        <button
          type="button"
          onClick={() => setAddons({ ...addons, storage: !addons.storage })}
          className={cn(
            'flex items-center gap-4 rounded-lg border p-3 text-start',
            addons.storage ? 'border-purplish-blue bg-alabaster' : 'border-light-gray',
          )}
        >
          <span
            className={cn(
              'grid h-5 w-5 place-content-center rounded border',
              addons.storage && 'bg-purplish-blue',
            )}
          >
            {addons.storage && <Image src="/icon-checkmark.svg" width={12} height={9} alt="" />}
          </span>

          <div>
            <p className="font-bold text-marine-blue">Larger storage</p>
            <p className="font-medium text-cool-gray">Extra 1TB of cloud save</p>
          </div>

          <p className="ms-auto font-medium text-purplish-blue">
            +${billing === 'monthly' ? '2/mo' : '20/yr'}
          </p>
        </button>

        <button
          type="button"
          onClick={() => setAddons({ ...addons, customizableProfile: !addons.customizableProfile })}
          className={cn(
            'flex items-center gap-4 rounded-lg border p-3 text-start',
            addons.customizableProfile ? 'border-purplish-blue bg-alabaster' : 'border-light-gray',
          )}
        >
          <span
            className={cn(
              'grid h-5 w-5 place-content-center rounded border',
              addons.customizableProfile && 'bg-purplish-blue',
            )}
          >
            {addons.customizableProfile && (
              <Image src="/icon-checkmark.svg" width={12} height={9} alt="" />
            )}
          </span>

          <div>
            <p className="font-bold text-marine-blue">Customizable profile</p>
            <p className="font-medium text-cool-gray">Custom them on your profile</p>
          </div>

          <p className="ms-auto font-medium text-purplish-blue">
            +${billing === 'monthly' ? '2/mo' : '20/yr'}
          </p>
        </button>
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
