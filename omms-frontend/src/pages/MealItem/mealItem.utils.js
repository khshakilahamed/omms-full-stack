import { axiosInstance } from "@/axios/axiosInstance";
import { z } from "zod";


export const retrieveMealItems = async ({ queryKey }) => {
      //   const [, { page, limit }] = queryKey; // Destructure to get page and limit
      const params = queryKey[queryKey.length - 1];

      const response = await axiosInstance.get(`/meal-item`, {
            params: { ...params },
      });
      return response.data;
};

export const retrieveMealItem = async ({ queryKey }) => {
      const response = await axiosInstance.get(`/meal-item/${queryKey[1]}`);
      return response.data;
    };

export const mealItemFormSchema = z.object({
      name: z.string().min(1, "Meal name is required"),
      mealCategoryId: z.string().min(1, "Meal category is required"),
});