import dayjs from 'dayjs';
import { z as zod } from 'zod';

// ----------------------------------------------------------------------

type InputProps = {
  message?: {
    required_error?: string;
    invalid_type_error?: string;
  };
  minFiles?: number;
  isValidPhoneNumber?: (text: string) => boolean;
};

export const schemaHelper = {
  /**
   * Phone number
   * defaultValue === ''
   */
  phoneNumber: (props?: InputProps) =>
    zod
      .string({
        required_error: props?.message?.required_error ?? 'Phone number is required!',
        invalid_type_error: props?.message?.invalid_type_error ?? 'Invalid phone number!',
      })
      .min(1, {
        message: props?.message?.required_error ?? 'Phone number is required!',
      })
      .refine((data) => props?.isValidPhoneNumber?.(data), {
        message: props?.message?.invalid_type_error ?? 'Invalid phone number!',
      }),
  
  // Add other schema helpers as needed
}; 