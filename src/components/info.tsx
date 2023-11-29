import type { Dispatch, SetStateAction } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './input';

export const formSchema = z.object({
  name: z.string().min(1, { message: 'This field is required' }),
  email: z
    .string()
    .min(1, { message: 'This field is required' })
    .email({ message: 'Please provide a valid e-mail address' }),
  phone: z
    .string()
    .min(1, { message: 'This field is required' })
    .regex(/^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]{8,14}$/g, {
      message: 'Please provide a valid phone number',
    }),
});

export type TInfo = z.infer<typeof formSchema>;

export const Info: React.FC<{
  info: TInfo;
  setInfo: Dispatch<SetStateAction<TInfo>>;
  nextStep: () => void;
}> = ({ info, setInfo, nextStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInfo>({ resolver: zodResolver(formSchema), defaultValues: info });

  const onSubmit: SubmitHandler<TInfo> = (data) => {
    setInfo(data);
    nextStep();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-col justify-between bg-magnolia lg:w-[42rem] lg:bg-transparent"
    >
      <div className="absolute left-4 right-4 top-32 flex h-fit flex-col gap-8 rounded-lg bg-white px-8 py-10 lg:static lg:h-full lg:px-24">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold text-marine-blue">Personal Info</h1>
          <p className="font-medium text-cool-gray">
            Please provide your name, email address, and phone number.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <Input
            label="Name"
            placeholder="e.g. Stephen King"
            id="name"
            error={errors.name?.message}
            {...register('name')}
          />

          <Input
            label="Email Address"
            placeholder="e.g. stephenking@lorem.com"
            id="email"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Phone Number"
            placeholder="e.g. +1 234 567 890"
            id="phone"
            error={errors.phone?.message}
            {...register('phone')}
          />
        </div>
      </div>

      <div className="mt-auto flex items-center justify-end bg-white p-4 lg:px-24">
        <button
          type="submit"
          className="rounded-lg bg-marine-blue px-6 py-3 font-medium text-white transition-colors hover:bg-purplish-blue active:bg-purplish-blue"
        >
          Next Step
        </button>
      </div>
    </form>
  );
};
