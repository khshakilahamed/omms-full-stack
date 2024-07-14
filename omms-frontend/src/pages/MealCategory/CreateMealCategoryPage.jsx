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
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/axios/axiosInstance";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { mealCategoryFormSchema } from "./MealCategory.utils";


const CreateMealCategoryPage = () => {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(mealCategoryFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate, error, isPending } = useMutation({
    mutationFn: (data) => {
      return axiosInstance.post(`/meal-category`, data);
    },
    onSuccess: () => {
      toast({
        description: "Meal category created",
      });
      form.reset();
    },onError: (error) => {
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
      <h2 className="text-3xl font-bold text-primary py-5">Create Meal Category</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          {/* Name field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meal Category Name</FormLabel>
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
    </div>
  );
};

export default CreateMealCategoryPage;