import axios, { endpoints } from 'src/utils/axios';

import { setSession } from './utils';
import { STORAGE_KEY } from './constant';
import { paths } from 'src/routes/paths';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export type SignInParams = {
  email: string;
  password: string;
};

export type SignUpParams = {
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  sex: string;
  address: string;
  password: string;
  password_confirmation: string;
  companyName?: string;
  description?: string;
  companyEmail?: string;
  companyPhone?: string;
  country?: string;
  city?: string;
  companyAddress?: string;
  agreement?: boolean;
};


export type ResetPasswordParams = {
  email: string;
  options?: {
    redirectTo?: string;
    captchaToken?: string;
  };
};

export type UpdatePasswordParams = {
  password: string;
  options?: {
    emailRedirectTo?: string | undefined;
  };
};

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ email, password }: SignInParams): Promise<void> => {
  try {
    const params = { email, password };

    const res = await axios.post(endpoints.auth.signIn, params);

    const { accessToken } = res.data;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    setSession(accessToken);
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

/** **************************************
 * Sign up
 *************************************** */
export const signUp = async (params: SignUpParams): Promise<void> => {
  try {
    const res = await axios.post(endpoints.auth.signUp, params);

    const { accessToken } = res.data;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    sessionStorage.setItem(STORAGE_KEY, accessToken);
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<void> => {
  try {
    await setSession(null);
    window.location.href = paths.auth.jwt.signIn;
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};


/** **************************************
 * Reset password
 *************************************** */
export const resetPassword = async ({
  email,
  options,
}: ResetPasswordParams): Promise<{ data: {}; error: null } | { data: null; error: Error }> => {
  try {
    const params = { email, ...options };
    const res = await axios.post(endpoints.auth.resetPassword, params);

    const { data } = res;

    return { data, error: null };
  } catch (error) {
    console.error('Error during password reset:', error);
    return { data: null, error };
  }
};

/** **************************************
 * Update password
 *************************************** */
export const updatePassword = async ({ password, options }: UpdatePasswordParams): Promise<{ data: {}; error: null } | { data: null; error: Error }> => {
  try {
    const params = { password, ...options };
    const res = await axios.post(endpoints.auth.updatePassword, params);

    const { data } = res;

    return { data, error: null };
  } catch (error) {
    console.error('Error during password update:', error);
    return { data: null, error };
  }
};
