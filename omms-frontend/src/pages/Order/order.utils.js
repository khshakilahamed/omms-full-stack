import { axiosInstance } from "@/axios/axiosInstance";

export const retrieveMyOrders = async ({ queryKey }) => {
      //   const [, { page, limit }] = queryKey; // Destructure to get page and limit
      const params = queryKey[queryKey.length - 1];

      const response = await axiosInstance.get(`/orders/my-orders`, {
            params: { ...params },
      });
      return response.data;
};

export const retrieveOrders = async ({ queryKey }) => {
      //   const [, { page, limit }] = queryKey; // Destructure to get page and limit
      const params = queryKey[queryKey.length - 1];

      const response = await axiosInstance.get(`/orders`, {
            params: { ...params },
      });
      return response.data;
};