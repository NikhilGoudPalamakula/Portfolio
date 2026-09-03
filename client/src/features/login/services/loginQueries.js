import { useMutation } from '@tanstack/react-query';
import { login } from './loginService';
import useAuthStore from '@/auth/authStore';

export const useLogin = (options = {}) => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: login,
    onSuccess: (data, ...rest) => {
      setAuth({ user: data.user, token: data.accessToken ?? data.token });
      options.onSuccess?.(data, ...rest);
    },
    ...options,
  });
};
