import { useEffect } from "react"; // <-- Import useEffect
import { axiosInstance } from "@/axios/axiosInstance";
import { Button } from "@/components/ui/button";
import {
      Form,
      FormControl,
      FormField,
      FormItem,
      FormLabel,
      FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { retrieveMealCategories } from "../MealCategory/MealCategory.utils";
import { mealItemFormSchema, retrieveMealItem } from "./mealItem.utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const EditMealItemPage = () => {
      const { toast } = useToast();
      const { id } = useParams();

      const {
            data: mealItemData,
            isPending,
            refetch,
      } = useQuery({
            queryKey: ["meal-item", id],
            queryFn: retrieveMealItem,
      });

      const mealItem = mealItemData?.data;

      // Queries to fetch data
      const {
            data: mealCategoriesData,
            isPending: isPendingMealCategory
      } = useQuery({
            queryKey: ["meal-category", { limit: 100, sortOrder: 'asc' }],
            queryFn: retrieveMealCategories,
      });

      const { data: mealCategories } = mealCategoriesData?.data || {};

      const {
            mutate,
            error,
            isPending: updateIsLoading,
      } = useMutation({
            mutationFn: (data) => {
                  return axiosInstance.patch(`/meal-item/${id}`, data);
            },
            onSuccess: () => {
                  toast({
                        description: "Meal item updated successfully",
                  });
                  refetch();
            },
      });

      const form = useForm({
            resolver: zodResolver(mealItemFormSchema),
            defaultValues: {
                  name: "",
                  mealCategoryId: "",
            },
      });

      const { reset } = form; // <-- Extract reset function

      useEffect(() => {
            if (mealItem) {
                  reset({
                        name: mealItem.name || "",
                        mealCategoryId: mealItem.mealCategoryId || "",
                  });
            }
      }, [mealItem, reset]); // <-- Add reset to dependencies

      function onSubmit(values) {
            mutate(values);
      }

      return (
            <div className="w-3/4">
                  <h2 className="text-3xl font-bold text-primary py-5">Update Meal Category</h2>

                  {(isPending || isPendingMealCategory) ? (
                        <div className="w-full h-[150px] flex justify-center items-center">
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        </div>
                  ) : (
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
                                                      <FormLabel>Name</FormLabel>
                                                      <FormControl>
                                                            <Input type="text" placeholder="Name" {...field} />
                                                      </FormControl>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />
                                    <p className="text-red-400">{error?.response?.data?.message}</p>
                                    <p>{updateIsLoading && "Updating..."}</p>
                                    <Button type="submit" disabled={updateIsLoading}>
                                          {updateIsLoading ? (
                                                <>
                                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                                                      <span>Please wait</span>
                                                </>
                                          ) : (
                                                "Update"
                                          )}
                                    </Button>
                              </form>
                        </Form>
                  )}
            </div>
      );
};

export default EditMealItemPage;
