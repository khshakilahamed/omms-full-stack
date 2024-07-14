import { axiosInstance } from "@/axios/axiosInstance";
import { z } from "zod";


export const retrieveMealCategories = async ({ queryKey }) => {
      //   const [, { page, limit }] = queryKey; // Destructure to get page and limit
      const params = queryKey[queryKey.length - 1];

      const response = await axiosInstance.get(`/meal-category`, {
            params: { ...params },
      });
      return response.data;
};

export const retrieveMealCategory = async ({ queryKey }) => {
      const response = await axiosInstance.get(`/meal-category/${queryKey[1]}`);
      return response.data;
};

export const mealCategoryFormSchema = z.object({
  name: z.string().min(1, "Meal category name is required"),
});