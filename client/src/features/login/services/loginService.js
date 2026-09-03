import api from '@/utils/api';
import { ENDPOINTS } from '@/config/apiConfig';

export const login = async (credentials) => {
  const { data } = await api.post(ENDPOINTS.auth.LOGIN, credentials);
  return data;
};
