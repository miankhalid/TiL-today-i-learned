import instance from '@/services/instance';

import { userSchema } from './schema';

export const UserServices = {
  fetchOne: async (id: number) => {
    const axiosResponse = await instance.get(`users/${id}`);
    const response: unknown = axiosResponse.data;
    return userSchema.parse(response);
  },
};
