import { Input } from './input';
import { FormPage } from './form-page';

export const Info: React.FC = () => {
  return (
    <FormPage
      title="Personal Info"
      subTitle="Please provide your name, email address, and phone number."
    >
      <div className="flex flex-col gap-4">
        <Input label="Name" placeholder="e.g. Stephen King" id="name" />
        <Input label="Email Address" placeholder="e.g. stephenking@lorem.com" id="email" />
        <Input label="Phone Number" placeholder="e.g. +1 234 567 890" id="name" />
      </div>
    </FormPage>
  );
};
