import axios, { endpoints } from 'src/utils/axios';
import { jwtDecode } from 'jwt-decode';

import { setSession } from './utils';
import { STORAGE_KEY } from './constant';
import { paths } from 'src/routes/paths';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export type SignInParams = {
  identifier: string;
  password: string;
};

export type SignUpParams = {
  role: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone: string;
  sex: string;
  address: string;
  password: string;
  confirmPassword: string;
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
    token?: string;
    emailRedirectTo?: string | undefined;
  };
};

// Add interface for decoded JWT token
interface ResetPasswordToken {
  user_id: number;
  reset_token: string;
  exp: number;
}

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ 
  identifier, 
  password 
}: SignInParams): Promise<{ 
  data?: { 
    accessToken?: string;
    status?: 'success' | 'verification_required';
    message?: string;
  }; 
  error?: Error 
}> => {
  try {
    const params = { identifier, password };
    const res = await axios.post(endpoints.auth.signIn, params);
    const { data } = res;

    if (data.status === 'verification_required') {
      return {
        data: {
          status: 'verification_required',
          message: 'Please verify your email address'
        }
      };
    }

    if (!data.accessToken) {
      return {
        error: new Error('Access token not found in response')
      };
    }

    setSession(data.accessToken);
    return { 
      data: {
        ...data,
        status: 'success'
      }
    };
  } catch (error) {
    console.error('Error during sign in:', error);
    return {
      error: new Error(
        error.response?.data?.message || 
        error.message || 
        'Authentication failed'
      )
    };
  }
};

/** **************************************
 * Sign up
 *************************************** */
export const signUp = async (params: SignUpParams) => {
  try {
    const res = await axios.post(endpoints.auth.signUp, params);
    return res.data;
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error; // Propagate the error instead of returning it
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
}: ResetPasswordParams): Promise<{ data: {}; error: null } | { data: null; error: { message: string, response: { data: { message: string } }  } }> => {
  try {
    const params = {
      email,
      ...options,
      reset_url: `${window.location.origin}${paths.auth.jwt.updatePassword}`,
    };

    const res = await axios.post(endpoints.auth.forgotPassword, params);
    const { data } = res;
    return { data, error: null };
  } catch (error) {
    console.error('Error during password reset:', error);
    return { data: null, error: { message: error.response.data.message, response: { data: { message: error.response.data.message } } } };
  }
};

/** **************************************
 * Update password
 *************************************** */
export const updatePassword = async ({
  password,
  options = {
    token: '',
    emailRedirectTo: `${window.location.origin}${paths.auth.jwt.signIn}`,
  },

}: UpdatePasswordParams): Promise<{ data: {}; error: null } | { data: null; error: Error }> => {
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const jwtToken = searchParams.get('token');

    if (!jwtToken) {
      throw new Error('Reset token not found');
    }

    // Decode JWT to get the reset_token
    const decoded = jwtDecode<ResetPasswordToken>(jwtToken);
    const resetToken = decoded.reset_token;

    const params = {
      token: resetToken,
      password,
      password_confirmation: password,
      ...options,
    };

    const res = await axios.post(endpoints.auth.resetPassword, params);
    const { data } = res;

    return { data, error: null };
  } catch (error) {
    console.error('Error during password update:', error);
    if (error.response?.data?.errors) {
      const firstError = Object.values(error.response.data.errors)[0];
      return {
        data: null,
        error: new Error(Array.isArray(firstError) ? firstError[0] : firstError),
      };
    }
    return { data: null, error };
  }
};

export const checkResetToken = async (token: string): Promise<boolean> => {
  try {
    const decoded = jwtDecode<ResetPasswordToken>(token);

    if (decoded.exp < Date.now() / 1000) {
      throw new Error('Reset token has expired');
    }

    sessionStorage.setItem('reset_token', decoded.reset_token);
    await axios.get(endpoints.auth.checkResetToken(token));
    return true;
  } catch (error) {
    console.error('Invalid or expired reset token:', error);
    return false;
  }
};

/** **************************************
 * Email verification
 *************************************** */
export const resendVerificationEmail = async (email: string): Promise<void> => {
  try {
    await axios.post(endpoints.auth.emailVerifyResend, { email });
  } catch (error) {
    console.error('Error resending verification email:', error);
    throw error;
  }
};

export const verifyEmail = async (email: string, otp: string): Promise<void> => {
  try {
    await axios.post(endpoints.auth.emailVerify, { email, otp });
  } catch (error) {
    console.error('Error verifying email:', error);
    throw error;
  }
};
