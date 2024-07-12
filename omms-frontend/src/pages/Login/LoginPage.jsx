import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
      Form,
      FormControl,
      FormField,
      FormItem,
      FormLabel,
      FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/axios/axiosInstance";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { setToLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/constants/storageKey";

const formSchema = z.object({
      email: z.string().email({
            message: "Email is required",
      }),
      password: z.string({
            message: "password is required",
      }),
})

const LoginPage = () => {
      const { toast } = useToast();
      const navigate = useNavigate();
      const form = useForm({
            resolver: zodResolver(formSchema),
            defaultValues: {
                  email: "",
                  password: "",
            },
      });

      const { mutate, error, isPending } = useMutation({
            mutationFn: (loginData) => {
                  return axiosInstance.post(`/auth/login`, loginData)
            },
            onSuccess: (response) => {
                  // form.reset();
                  setToLocalStorage(authKey, response?.data?.data?.accessToken)
                  toast({ title: "Successfully logged in" })
                  navigate("/dashboard")
            },
      })

      function onSubmit(values) {
            mutate(values);
      }

      return (
            <div className="w-full h-screen flex items-center justify-center">
                  <div className="w-[350px] border-2 border-primary px-5 py-10">
                        <Link to={"/"}>
                              <h2 className="text-5xl text-center text-primary">OMMS</h2>
                        </Link>
                        <h3 className="text-xl text-center">Login here</h3>
                        <Form {...form}>
                              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                                    <FormField
                                          control={form.control}
                                          name="email"
                                          render={({ field }) => (
                                                <FormItem>
                                                      <FormLabel>Email</FormLabel>
                                                      <FormControl>
                                                            <Input type="email" placeholder="Email" {...field} />
                                                      </FormControl>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />
                                    <FormField
                                          control={form.control}
                                          name="password"
                                          render={({ field }) => (
                                                <FormItem>
                                                      <FormLabel>Password</FormLabel>
                                                      <FormControl>
                                                            <Input type="password" placeholder="Password" {...field} />
                                                      </FormControl>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />
                                    <p className="text-red-400">{error?.response?.data?.message}</p>
                                    <p>{isPending && "logging..."}</p>
                                    <Button type="submit" disabled={isPending}>
                                          {isPending ? <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> <span>Please wait</span>
                                          </> : "Login"}
                                    </Button>
                              </form>
                        </Form>
                        {/* <form
                              className="flex flex-col gap-3 mt-4"
                              onSubmit={handleSubmit(onSubmit)}
                        >
                              <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input type="email" id="email" placeholder="Email" className="w-full" />
                              </div>
                              <div>
                                    <Label htmlFor="password">Password</Label>
                                    <Input type="password" id="password" placeholder="Password" className="w-full" />
                              </div>
                              <Button type="button" onClick={loginHandler}>Login</Button>
                        </form> */}
                  </div>
            </div>
      );
};

export default LoginPage;