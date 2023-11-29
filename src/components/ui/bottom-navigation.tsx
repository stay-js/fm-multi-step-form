import { cn } from '~/utils/cn';

export const BottomNavigation: React.FC<{
  prevStep?: () => void;
  nextStepType?: 'submit' | 'button';
  nextStep?: () => void;
  confirm?: () => void;
}> = ({ prevStep, nextStepType = 'button', nextStep, confirm }) => (
  <div
    className={cn(
      'mt-auto flex items-center  bg-white p-4 lg:px-24',
      prevStep ? 'justify-between' : 'justify-end',
    )}
  >
    {prevStep && (
      <button
        type="button"
        onClick={prevStep}
        className="font-medium text-cool-gray transition-colors hover:text-marine-blue focus:text-marine-blue"
      >
        Go Back
      </button>
    )}

    <button
      type={nextStepType}
      onClick={nextStep ?? confirm}
      className={cn(
        'rounded-lg px-6 py-3 font-medium text-white transition-colors',
        confirm
          ? 'bg-purplish-blue hover:bg-marine-blue focus:bg-marine-blue'
          : 'bg-marine-blue hover:bg-purplish-blue focus:bg-purplish-blue',
      )}
    >
      {confirm ? 'Confirm' : 'Next Step'}
    </button>
  </div>
);
