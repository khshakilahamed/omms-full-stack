import { axiosInstance } from "@/axios/axiosInstance";
import { z } from "zod";

export const daysOfWeek = [
      {
            id: 1,
            label: 'Sunday',
            value: 'sunday'
      },
      {
            id: 2,
            label: 'Monday',
            value: 'monday'
      },
      {
            id: 3,
            label: 'Tuesday',
            value: 'tuesday'
      },
      {
            id: 4,
            label: 'Wednesday',
            value: 'wednesday'
      },
      {
            id: 5,
            label: 'Thursday',
            value: 'thursday'
      },
      {
            id: 6,
            label: 'Friday',
            value: 'friday'
      },
      {
            id: 7,
            label: 'Saturday',
            value: 'saturday'
      }
];

// Define Zod schema
export const mealSchema = z.object({
      dayName: z.string().min(1, "Day is required"),
      riceId: z.string().min(1, "Starch Food is required"),
      proteinMealId: z.string().min(1, "Protein Food is required"),
      vegetableMealId: z.string().optional(),
      otherItems: z
            .array(z.string())
            .max(3, "You can select up to 3 other items")
            .optional(),
});

export const retrieveMeals = async ({ queryKey }) => {
      //   const [, { page, limit }] = queryKey; // Destructure to get page and limit
      const params = queryKey[queryKey.length - 1];

      const response = await axiosInstance.get(`/available-meal-per-day`, {
            params: { ...params },
      });
      return response.data;
};

// Function to get the day name from a date
export const getDayName = (date) => {
      const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return weekdays[date.getDay()];
};

// Function to format date as dd-mm-yyyy
export const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

