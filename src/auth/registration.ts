import { z, ZodObject, ZodString, ZodBoolean, ZodEnum, ZodTypeAny, ZodEffects } from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import { schemaHelper } from 'src/components/hook-form/schema-helper';

// Basic Information Schema
export const BasicInfoSchema: ZodObject<any> = z.object({
  role: z.string().min(1, { message: 'User type is required!' }),
  firstName: z.string().min(1, { message: 'First name is required!' }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: 'Last name is required!' }),
  email: z
    .string()
    .transform(val => val === "" ? undefined : val)
    .optional()
    .refine(val => val === undefined || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: 'Invalid email format!',
    }),
  phone: schemaHelper.phoneNumber({ isValidPhoneNumber }),
  sex: z.string().min(1, { message: 'Sex is required!' }),
  address: z.string().min(1, { message: 'Address is required!' }),
});

// Company Information Schema
export const CompanyInfoSchema: ZodObject<any> = z.object({
  companyName: z.string().min(1, { message: 'Company name is required!' }),
  description: z.string().min(1, { message: 'Description is required!' }),
  companyEmail: z
    .string()
    .min(1, { message: 'Company email is required!' })
    .email({ message: 'Invalid email format!' }),
  companyPhone: schemaHelper.phoneNumber({ isValidPhoneNumber }),
  country: z.string().min(1, { message: 'Country is required!' }),
  city: z.string().min(1, { message: 'City is required!' }),
  companyAddress: z.string().min(1, { message: 'Company address is required!' }),
});

// Password Schema
export const PasswordSchema: ZodObject<any> = z
  .object({
    password: z.string().min(6, { message: 'Password must be at least 6 characters long!' }),
    confirmPassword: z.string().min(6, { message: 'Confirm Password must be at least 6 characters long!' }),
  });

// Agreement Schema
export const AgreementSchema: ZodObject<any> = z.object({
  agreement: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms!',
  }),
});

// Role Schema
export const RoleSchema: ZodObject<any> = z.object({
  role: z.enum(['supplier', 'customer', 'admin'], {
    required_error: 'Please select a role',
  }),
});

// Updated Combined Schema
export const RegistrationSchema: ZodEffects<ZodObject<any>> = z
  .object({
    ...RoleSchema.shape,
    ...BasicInfoSchema.shape,
    ...CompanyInfoSchema.partial().shape, // Making company fields optional
    ...PasswordSchema.shape,
    ...AgreementSchema.partial().shape, // Making agreement optional
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Infer the type of the Registration Schema
export type RegistrationSchemaType = z.infer<typeof RegistrationSchema>;
