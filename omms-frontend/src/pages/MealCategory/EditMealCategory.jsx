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
import { z } from "zod";

const mealCategoryFormSchema = z.object({
  name: z.string({
    message: "Meal category name is required",
  }),
});

const retrieveUser = async ({ queryKey }) => {
  const response = await axiosInstance.get(`/meal-category/${queryKey[1]}`);
  return response.data;
};

const EditMealCategoryPage = () => {
  const { toast } = useToast();
  const { id } = useParams();

  const {
    data: mealCategoryData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["meal-category", id],
    queryFn: retrieveUser,
  });

  const mealCategory = mealCategoryData?.data;

  const {
    mutate,
    error,
    isLoading: updateIsLoading,
  } = useMutation({
    mutationFn: (data) => {
      return axiosInstance.patch(`/meal-category/${id}`, data);
    },
    onSuccess: () => {
      toast({
        description: "Meal category updated successfully",
      });
      refetch();
    },
  });

  const form = useForm({
    resolver: zodResolver(mealCategoryFormSchema),
    defaultValues: {
      name: ""
    },
  });

  const { reset } = form; // <-- Extract reset function

  useEffect(() => {
    if (mealCategory) {
      reset({
        name: mealCategory.name || "",
      });
    }
  }, [mealCategory, reset]); // <-- Add reset to dependencies

  function onSubmit(values) {
    mutate(values);
  }

  return (
    <div className="w-3/4">
      <h2 className="text-3xl font-bold text-primary py-5">Update Meal Category</h2>

      {isLoading ? (
        <div className="w-full h-[150px] flex justify-center items-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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

export default EditMealCategoryPage;
