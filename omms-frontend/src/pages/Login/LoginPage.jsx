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
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/axios/axiosInstance";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { setToLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/constants/storageKey";
import { decodedToken } from "@/utils/jwt";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/slices/authSlice";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string({
    message: "Password is required",
  }),
});

const LoginPage = () => {
  const { user } = useSelector((state) => state?.auth);
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user?.email) {
      navigate("/dashboard");
    }
  }, [navigate, user?.email]);

  const { mutate, error, isLoading } = useMutation({
    mutationFn: (loginData) => {
      dispatch(setLoading(true)); // Set loading state to true
      return axiosInstance.post(`/auth/login`, loginData);
    },
    onSuccess: (response) => {
      const accessToken = response?.data?.data?.accessToken;
      setToLocalStorage(authKey, accessToken);
      const user = decodedToken(accessToken);
      toast({ title: "Successfully logged in" });
      dispatch(
        setUser({
          user: user,
          accessToken: accessToken,
        })
      );
      navigate("/dashboard"); // Ensure navigation is triggered after state is updated
    },
    onError: () => {
      dispatch(setLoading(false)); // Set loading state to false on error
    },
  });

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
            <p>{isLoading && "logging..."}</p>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  <span>Please wait</span>
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
