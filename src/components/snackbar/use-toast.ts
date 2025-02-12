import { toast as sonnerToast } from 'sonner';

export const useToast = () => {
  const toast = {
    success: (message: string, options = {}) =>
      sonnerToast.success(message, {
        duration: 5000,
        ...options,
      }),

    error: (message: string, options = {}) =>
      sonnerToast.error(message, {
        duration: 5000,
        ...options,
      }),

    warning: (message: string, options = {}) =>
      sonnerToast.warning(message, {
        duration: 5000,
        ...options,
      }),

    info: (message: string, options = {}) =>
      sonnerToast.info(message, {
        duration: 5000,
        ...options,
      }),

    promise: <T>(
      promise: Promise<T>,
      messages: {
        loading: string;
        success: string;
        error: string;
      },
      options = {}
    ) =>
      sonnerToast.promise(promise, {
        loading: messages.loading,
        success: messages.success,
        error: messages.error,
        ...options,
      }),
  };

  return toast;
}; 