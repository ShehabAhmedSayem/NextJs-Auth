import React from 'react';
import { Control, useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { identifyValidationSchema } from '@/lib/validations/identify-validation-schema';
import { SsnInput } from '../ui/ssn-input';
import STATES from '@/data/us-state';
import { postIdVerification } from '@/services/api-services';

type FormValues = z.infer<typeof identifyValidationSchema>;

type FieldFormItemProps = {
  control: Control<FormValues>;
  name: keyof FormValues;
  desc?: string;
  label?: {
    text: string;
    required: boolean;
  };
  children: JSX.Element;
};

const FieldFormItem = ({ control, name, label, desc, children }: FieldFormItemProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className={label.required ? 'required-field' : ''}>{label.text}</FormLabel>
          )}
          <FormControl>{React.cloneElement(children, { ...field })}</FormControl>
          <FormMessage />
          {desc && <FormDescription>{desc}</FormDescription>}
        </FormItem>
      )}
    />
  );
};

type IdentifyVerificationFormProps = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setHasVerificationError: React.Dispatch<React.SetStateAction<boolean>>;
  setIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
};

const IdentifyVerificationForm = ({
  setLoading,
  setHasVerificationError,
  setIsVerified
}: IdentifyVerificationFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(identifyValidationSchema),
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      ssn: '',
      confirm_ssn: '',
      day: '',
      month: '',
      year: '',
      address: '',
      city: '',
      state: '',
      zipcode: ''
    }
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    const {
      day,
      month,
      year,
      ssn,
      zipcode,
      address,
      city,
      firstName,
      lastName,
      middleName,
      state
    } = data;
    const dateOfBirth = new Date(Number(year), Number(month) - 1, Number(day)).getTime() / 1000;
    const transformedData = {
      state,
      city,
      firstName,
      lastName,
      middleName,
      address,
      dateOfBirth,
      ssn: +ssn,
      zipcode: +zipcode
    };
    try {
      const res = await postIdVerification(transformedData);
      if (res.status === 200) setIsVerified(true);
    } catch (error) {
      setHasVerificationError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-3">
          <FieldFormItem
            control={form.control}
            name="firstName"
            label={{ text: 'First Name', required: true }}
          >
            <Input type="text" placeholder="First Name" />
          </FieldFormItem>
          <FieldFormItem
            control={form.control}
            name="middleName"
            label={{ text: 'Middle Name', required: false }}
          >
            <Input type="text" placeholder="Middle Name" />
          </FieldFormItem>
          <FieldFormItem
            control={form.control}
            name="lastName"
            label={{ text: 'Last Name', required: true }}
          >
            <Input type="text" placeholder="Last name " />
          </FieldFormItem>
        </div>
        <div className="mt-8">
          <FieldFormItem
            control={form.control}
            name="ssn"
            label={{ text: 'Social Security Number (9 digits)', required: true }}
          >
            <SsnInput placeholder="SSN" />
          </FieldFormItem>
          <FieldFormItem
            control={form.control}
            name="confirm_ssn"
            desc="This information is used to verify your identity."
          >
            <SsnInput placeholder="Retype SSN" className="mt-2" />
          </FieldFormItem>
        </div>
        <div className="mt-8 ">
          <FormLabel className="required-field">Date of Birth</FormLabel>
          <div className="mt-2 grid grid-cols-3 gap-3">
            <FieldFormItem control={form.control} name="day">
              <Input type="text" placeholder="Day" />
            </FieldFormItem>
            <FieldFormItem control={form.control} name="month">
              <Input type="text" placeholder="Month" />
            </FieldFormItem>
            <FieldFormItem control={form.control} name="year">
              <Input type="text" placeholder="Year" />
            </FieldFormItem>
          </div>
        </div>
        <div className="mt-8 ">
          <FieldFormItem
            control={form.control}
            name="address"
            label={{ text: 'Address', required: true }}
          >
            <Textarea placeholder="Enter your address" className="resize-none" />
          </FieldFormItem>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-3">
          <FieldFormItem
            control={form.control}
            name="city"
            label={{ text: 'City', required: true }}
          >
            <Input type="text" placeholder="City" />
          </FieldFormItem>
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required-field">State</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="State" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {STATES.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FieldFormItem
            control={form.control}
            name="zipcode"
            label={{ text: 'ZIP code', required: true }}
          >
            <Input type="text" placeholder="ZIP code" />
          </FieldFormItem>
        </div>
        <Button type="submit" className="mt-8 min-w-52">
          Verify
        </Button>
      </form>
    </Form>
  );
};

export default IdentifyVerificationForm;
