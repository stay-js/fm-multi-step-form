import { cn } from '~/utils/cn';

export const FormPage: React.FC<{
  children: React.ReactNode;
  title: string;
  subTitle: string;
  previousPage?: () => void;
}> = ({ children, title, subTitle, previousPage }) => (
  <form className="bg-light-blue flex h-full flex-col justify-between lg:bg-transparent">
    <div className="absolute left-4 right-4 top-32 flex h-fit flex-col gap-6 rounded-lg bg-white px-8 py-10 lg:static lg:h-full lg:px-24">
      <div className="flex flex-col gap-3">
        <h1 className="text-marine-blue text-3xl font-bold">{title}</h1>
        <p className="text-cool-gray font-medium">{subTitle}</p>
      </div>

      {children}
    </div>

    <div
      className={cn(
        'mt-auto flex items-center bg-white p-4 lg:px-24',
        !previousPage ? 'justify-end' : 'justify-between',
      )}
    >
      {previousPage && (
        <button
          type="button"
          onClick={previousPage}
          className="hover:text-marine-blue text-cool-gray active:text-marine-blue font-medium transition-colors"
        >
          Go Back
        </button>
      )}

      <button
        type="submit"
        className="hover:bg-purplish-blue active:bg-purplish-blue bg-marine-blue rounded-lg px-6 py-3 font-medium text-white transition-colors"
      >
        Next Step
      </button>
    </div>
  </form>
);
