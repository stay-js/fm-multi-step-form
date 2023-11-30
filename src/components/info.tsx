'use client';

import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { BottomNavigation, Input, Title } from './ui';

const formSchema = z.object({
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

export const defaultValues: TInfo = {
  name: '',
  email: '',
  phone: '',
};

export const Info: React.FC<{
  info: TInfo;
  setInfo: React.Dispatch<React.SetStateAction<TInfo>>;
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
    <form onSubmit={handleSubmit(onSubmit)} className="page-container">
      <div className="page-content">
        <Title title="Personal Info">
          Please provide your name, email address, and phone number.
        </Title>

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

      <BottomNavigation nextStepType="submit" />
    </form>
  );
};
