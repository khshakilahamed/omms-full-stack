import { useEffect } from "react"; // <-- Import useEffect
import { axiosInstance } from "@/axios/axiosInstance";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { userRole } from "@/constants/userRole";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";

const userFormSchema = z.object({
  name: z.string({
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  role: z.string({
    message: "User role is required",
  }),
  isBanned: z.boolean().default(false).optional(),
});

const retrieveUser = async ({ queryKey }) => {
  const response = await axiosInstance.get(`/users/${queryKey[1]}`);
  return response.data;
};

const EditUser = () => {
  const { toast } = useToast();
  const { id } = useParams();

  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", id],
    queryFn: retrieveUser,
  });

  const user = userData?.data;

  const {
    mutate,
    error,
    isLoading: updateIsLoading,
  } = useMutation({
    mutationFn: (userData) => {
      return axiosInstance.patch(`/users/${id}`, userData);
    },
    onSuccess: () => {
      toast({
        description: "User updated successfully",
      });
      refetch();
    },
  });

  const form = useForm({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      isBanned: false,
    },
  });

  const { reset } = form; // <-- Extract reset function

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "", // <-- Set default value for role
        isBanned: user.isBanned || false,
      });
    }
  }, [user, reset]); // <-- Add reset to dependencies

  function onSubmit(values) {
    mutate(values);
  }

  return (
    <div className="w-3/4">
      <h2 className="text-3xl font-bold text-primary py-5">Update User</h2>

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
            {/* Email field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Select user role */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value} // <-- Use value instead of defaultValue
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {userRole.map((role) => (
                        <SelectItem value={role?.value} key={role.id}>
                          {role?.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Checkbox */}
            <FormField
              control={form.control}
              name="isBanned"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Is ban user?</FormLabel>
                  </div>
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

export default EditUser;
