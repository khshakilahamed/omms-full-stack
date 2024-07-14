import { axiosInstance } from "@/axios/axiosInstance";
import { z } from "zod";

export const userFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  role: z.string().min(1, "User role is required"),
  isBanned: z.boolean().default(false).optional(),
});

export const retrieveUser = async ({ queryKey }) => {
  const response = await axiosInstance.get(`/users/${queryKey[1]}`);
  return response.data;
};

export const retrieveUsers = async ({ queryKey }) => {
  //   const [, { page, limit }] = queryKey; // Destructure to get page and limit
  const params = queryKey[queryKey.length - 1];

  const response = await axiosInstance.get(`/users`, {
    params: { ...params },
  });
  return response.data;
};