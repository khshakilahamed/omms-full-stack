import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
      Form,
      FormControl,
      FormField,
      FormItem,
      FormLabel,
      FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/axios/axiosInstance";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
} from "@/components/ui/select";
import { retrieveMealCategories } from "../MealCategory/MealCategory.utils";
import { mealItemFormSchema } from "./mealItem.utils";


const CreateMealItemPage = () => {
      const { toast } = useToast();

      const form = useForm({
            resolver: zodResolver(mealItemFormSchema),
            defaultValues: {
                  name: "",
                  mealCategoryId: ""
            },
      });

      // Queries to fetch data
      const {
            data: mealCategoriesData,
            isPending: isPendingMealCategory
      } = useQuery({
            queryKey: ["meal-category", { limit: 100, sortOrder: 'asc' }],
            queryFn: retrieveMealCategories,
      });

      const { data: mealCategories } = mealCategoriesData?.data || {};

      const { mutate, error, isPending } = useMutation({
            mutationFn: (data) => {
                  return axiosInstance.post(`/meal-item`, data);
            },
            onSuccess: () => {
                  toast({
                        description: "Meal item is created",
                  });
                  form.reset();
            },
            onError: (error) => {
              const errorMessage = error?.response?.data?.message;
              toast({
                description: <span className="text-red-500"> ❌ {errorMessage}</span>,
              });
            }
      });

      function onSubmit(values) {
            mutate(values);
      }

      return (
            <div className="w-3/4">
                  <h2 className="text-3xl font-bold text-primary py-5">Create Meal Item</h2>
                  {
                        isPendingMealCategory ? <div className="w-full h-[150px] flex justify-center items-center">
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        </div>
                              :
                              <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                                          {/* Select Meal Category */}
                                          <FormField
                                                control={form.control}
                                                name="mealCategoryId"
                                                render={({ field }) => (
                                                      <FormItem>
                                                            <FormLabel>Meal Category</FormLabel>
                                                            <Select
                                                                  onValueChange={field.onChange}
                                                                  value={field.value}
                                                            >
                                                                  <FormControl>
                                                                        <SelectTrigger>
                                                                              <SelectValue placeholder="Select Meal Category" />
                                                                        </SelectTrigger>
                                                                  </FormControl>
                                                                  <SelectContent>
                                                                        {mealCategories?.map((category) => (
                                                                              <SelectItem value={category?.id} key={category.id}>
                                                                                    {category?.name}
                                                                              </SelectItem>
                                                                        ))}
                                                                  </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                      </FormItem>
                                                )}
                                          />
                                          {/* Name field */}
                                          <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                      <FormItem>
                                                            <FormLabel>Meal Name</FormLabel>
                                                            <FormControl>
                                                                  <Input type="text" placeholder="Name" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                      </FormItem>
                                                )}
                                          />

                                          <p className="text-red-400">{error?.response?.data?.message}</p>
                                          <p>{isPending && "submitting..."}</p>
                                          <Button type="submit" disabled={isPending}>
                                                {isPending ? (
                                                      <>
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                                                            <span>Please wait</span>
                                                      </>
                                                ) : (
                                                      "Submit"
                                                )}
                                          </Button>
                                    </form>
                              </Form>
                  }

            </div>
      );
};

export default CreateMealItemPage;
