import { Button } from "@/components/ui/button";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { daysOfWeek, mealSchema } from "./meal.utils";
import { retrieveMealCategories } from "../MealCategory/MealCategory.utils";
import { retrieveMealItems } from "../MealItem/mealItem.utils";


const CreateMealPage = () => {
      const { toast } = useToast();

      const form = useForm({
            resolver: zodResolver(mealSchema),
            defaultValues: {
                  dayName: "",
                  riceId: "",
                  proteinMealId: "",
                  vegetableMealId: "",
                  otherItems: []
            },
      });

      // Queries to fetch data
      const {
            data: categoriesData,
            isPending: isPendingCategories,
      } = useQuery({
            queryKey: ["meal-category", { limit: 100 }],
            queryFn: retrieveMealCategories,
      });

      const { data: categories } = categoriesData?.data || {};

      const proteinCategory = categories?.find(category => category.name.toLowerCase() === 'protein');
      const starchCategory = categories?.find(category => category.name.toLowerCase() === 'starch');
      const vegetableCategory = categories?.find(category => category.name.toLowerCase() === 'vegetable');
      const otherCategory = categories?.find(category => category.name.toLowerCase() === 'other' || category.name.toLowerCase() === 'others');

      // Queries to fetch data
      const {
            data: mealItemsData,
            isPending: isPendingMealItems,
      } = useQuery({
            queryKey: ["meal-item", { limit: 1000 }],
            queryFn: retrieveMealItems,
      });

      const { data: mealItems } = mealItemsData?.data || {};

      const proteinMealItemList = mealItems?.filter(item => item?.mealCategoryId === proteinCategory?.id);
      const starchMealItemList = mealItems?.filter(item => item?.mealCategoryId === starchCategory?.id);
      const vegetableMealItemList = mealItems?.filter(item => item?.mealCategoryId === vegetableCategory?.id);
      const otherMealItemList = mealItems?.filter(item => item?.mealCategoryId === otherCategory?.id);

      const { mutate, error, isPending } = useMutation({
            mutationFn: (data) => {
                  return axiosInstance.post(`/available-meal-per-day`, data);
            },
            onSuccess: () => {
                  toast({
                        description: "Meal category created",
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
            const { otherItems, ...othersData } = values;
            const [otherItemId1, otherItemId2, otherItemId3] = otherItems;

            if(!othersData['vegetableMealId']){
                  delete othersData['vegetableMealId'];
            }
            if (otherItemId1) {
                  othersData["otherItemId1"] = otherItemId1
            }
            if (otherItemId2) {
                  othersData["otherItemId2"] = otherItemId2
            }
            if (otherItemId3) {
                  othersData["otherItemId3"] = otherItemId3
            }
            mutate(othersData);
      }

      return (
            <div className="w-3/4">
                  <h2 className="text-3xl font-bold text-primary py-5">Create Meal</h2>
                  {
                        (isPendingCategories || isPendingMealItems) ? (
                              <div className="w-full h-[150px] flex justify-center items-center">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              </div>
                        ) : (
                              <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                                          {/* Select day */}
                                          <FormField
                                                control={form.control}
                                                name="dayName"
                                                render={({ field }) => (
                                                      <FormItem>
                                                            <FormLabel>Day</FormLabel>
                                                            <Select
                                                                  onValueChange={field.onChange}
                                                                  value={field.value}
                                                            >
                                                                  <FormControl>
                                                                        <SelectTrigger>
                                                                              <SelectValue placeholder="Select day" />
                                                                        </SelectTrigger>
                                                                  </FormControl>
                                                                  <SelectContent>
                                                                        {daysOfWeek?.map((day) => (
                                                                              <SelectItem value={day?.value} key={day.id}>
                                                                                    {day?.label}
                                                                              </SelectItem>
                                                                        ))}
                                                                  </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                      </FormItem>
                                                )}
                                          />
                                          {/* Select starch food */}
                                          <FormField
                                                control={form.control}
                                                name="riceId"
                                                render={({ field }) => (
                                                      <FormItem>
                                                            <FormLabel>Starch Food</FormLabel>
                                                            <Select
                                                                  onValueChange={field.onChange}
                                                                  value={field.value}
                                                            >
                                                                  <FormControl>
                                                                        <SelectTrigger>
                                                                              <SelectValue placeholder="Select Starch" />
                                                                        </SelectTrigger>
                                                                  </FormControl>
                                                                  <SelectContent>
                                                                        {starchMealItemList?.map((meal) => (
                                                                              <SelectItem value={meal?.id} key={meal.id}>
                                                                                    {meal?.name}
                                                                              </SelectItem>
                                                                        ))}
                                                                  </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                      </FormItem>
                                                )}
                                          />
                                          {/* Select protein food */}
                                          <FormField
                                                control={form.control}
                                                name="proteinMealId"
                                                render={({ field }) => (
                                                      <FormItem>
                                                            <FormLabel>Protein Food</FormLabel>
                                                            <Select
                                                                  onValueChange={field.onChange}
                                                                  value={field.value}
                                                            >
                                                                  <FormControl>
                                                                        <SelectTrigger>
                                                                              <SelectValue placeholder="Select Protein" />
                                                                        </SelectTrigger>
                                                                  </FormControl>
                                                                  <SelectContent>
                                                                        {proteinMealItemList?.map((meal) => (
                                                                              <SelectItem value={meal?.id} key={meal.id}>
                                                                                    {meal?.name}
                                                                              </SelectItem>
                                                                        ))}
                                                                  </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                      </FormItem>
                                                )}
                                          />
                                          {/* Select vegetable food */}
                                          <FormField
                                                control={form.control}
                                                name="vegetableMealId"
                                                render={({ field }) => (
                                                      <FormItem>
                                                            <FormLabel>Vegetable Food</FormLabel>
                                                            <Select
                                                                  onValueChange={field.onChange}
                                                                  value={field.value}
                                                            >
                                                                  <FormControl>
                                                                        <SelectTrigger>
                                                                              <SelectValue placeholder="Select Vegetable" />
                                                                        </SelectTrigger>
                                                                  </FormControl>
                                                                  <SelectContent>
                                                                        {vegetableMealItemList?.map((meal) => (
                                                                              <SelectItem value={meal?.id} key={meal.id}>
                                                                                    {meal?.name}
                                                                              </SelectItem>
                                                                        ))}
                                                                  </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                      </FormItem>
                                                )}
                                          />
                                          {/* Other items */}
                                          <FormField
                                                control={form.control}
                                                name="otherItems"
                                                render={({ field }) => (
                                                      <FormItem>
                                                            <FormLabel>Other Items (select up to 3)</FormLabel>
                                                            <div>
                                                                  {otherMealItemList?.map((meal) => (
                                                                        <div key={meal.id} className="flex items-center space-x-2">
                                                                              <Checkbox
                                                                                    checked={field.value.includes(meal.id)}
                                                                                    onCheckedChange={(checked) => {
                                                                                          let newValue = [...field.value];
                                                                                          if (checked) {
                                                                                                if (newValue.length < 3) {
                                                                                                      newValue.push(meal.id);
                                                                                                }
                                                                                          } else {
                                                                                                newValue = newValue.filter((id) => id !== meal.id);
                                                                                          }
                                                                                          field.onChange(newValue);
                                                                                    }}
                                                                              />
                                                                              <span>{meal.name}</span>
                                                                        </div>
                                                                  ))}
                                                            </div>
                                                            <FormMessage />
                                                      </FormItem>
                                                )}
                                          />
                                          <p className="text-red-400">{error?.response?.data?.message}</p>
                                          <p>{isPending && "Submitting..."}</p>
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
                        )
                  }
            </div>
      );
};

export default CreateMealPage;
