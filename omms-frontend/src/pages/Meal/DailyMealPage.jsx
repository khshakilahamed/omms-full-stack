import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { formatDate, getDayName, retrieveMeals } from "./meal.utils";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox"; // Importing the shadcn ui Checkbox component
import { useForm } from "react-hook-form"; // Importing react-hook-form
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { axiosInstance } from "@/axios/axiosInstance";
import { useSelector } from "react-redux";

const DailyMealPage = () => {
      const { user } = useSelector(state => state.auth)
      const [date, setDate] = useState(new Date());
      const { toast } = useToast();
      const [mealOnSelectedDay, setMealOnSelectedDay] = useState([]);

      const form = useForm({
            // resolver: zodResolver(mealSchema),
            defaultValues: {
                  mealItems: []
            },
      });

      // Queries to fetch data
      const {
            data: mealsData,
            isPending,
      } = useQuery({
            queryKey: ["available-meal-per-day", { limit: 400, sortOrder: 'asc' }],
            queryFn: retrieveMeals,
      });

      const { mutate, error, isPending: isPendingOrder } = useMutation({
            mutationFn: (data) => {
                  return axiosInstance.post(`/orders`, data);
            },
            onSuccess: () => {
                  toast({
                        description: "Order successful",
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

      const dayName = getDayName(date);
      const formattedDate = formatDate(date);

      useEffect(() => {
            const meals = mealsData?.data?.data;
            if (dayName && meals?.length) {
                  const meal = meals.find(meal => meal?.dayName?.toLowerCase() === dayName.toLowerCase());
                  form.reset()

                  const mealItems = [];
                  if (meal) {
                        mealItems.push(meal?.rice)
                        mealItems.push(meal?.proteinMeal)
                        meal?.vegetableMeal && mealItems.push(meal?.vegetableMeal)
                        meal?.otherItem1 && mealItems.push(meal?.otherItem1)
                        meal?.otherItem2 && mealItems.push(meal?.otherItem2)
                        meal?.otherItem3 && mealItems.push(meal?.otherItem3)
                  }

                  setMealOnSelectedDay(mealItems);
            }
      }, [dayName, mealsData?.data?.data]);

      function onSubmit(values) {
            const mealItems = values.mealItems;
            if (!mealItems?.length) {
                  return;
            }
            const data = {
                  dayName: dayName.toLocaleLowerCase(),
                  userId: user?.userId,
                  date: formattedDate,
            }
            const [chosenMealId1, chosenMealId2, chosenMealId3] = mealItems;
            if (chosenMealId1) {
                  data["chosenMealId1"] = chosenMealId1
            }
            if (chosenMealId2) {
                  data["chosenMealId2"] = chosenMealId2
            }
            if (chosenMealId3) {
                  data["chosenMealId2"] = chosenMealId3
            }
            console.log(data);
            mutate(data)
      }

      return (
            <div className="my-5">
                  <div className="flex gap-5">
                        <div className="w-min">
                              <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="rounded-md border"
                              />
                        </div>
                        <div>
                              <h2 className="text-3xl font-bold text-primary py-5">
                                    {dayName}
                              </h2>
                              {
                                    isPending ? (
                                          <div className="w-full h-[150px] flex justify-center items-center">
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                          </div>
                                    )
                                          :
                                          mealOnSelectedDay.length > 0 ?
                                                <Form {...form}>
                                                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                                                            {/* Other items */}
                                                            <FormField
                                                                  control={form.control}
                                                                  name="mealItems"
                                                                  render={({ field }) => (
                                                                        <FormItem>
                                                                              <FormLabel>Available Items (select up to 3)</FormLabel>
                                                                              <div>
                                                                                    {mealOnSelectedDay?.map((meal) => (
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
                                                            <p>{isPendingOrder && "Submitting..."}</p>
                                                            <Button type="submit" disabled={isPendingOrder}>
                                                                  {isPendingOrder ? (
                                                                        <>
                                                                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                                                                              <span>Please wait</span>
                                                                        </>
                                                                  ) : (
                                                                        "Submit"
                                                                  )}
                                                            </Button>
                                                      </form>
                                                </Form> : <p>No items available</p>
                              }
                        </div>
                  </div>
            </div>
      );
};

export default DailyMealPage;
