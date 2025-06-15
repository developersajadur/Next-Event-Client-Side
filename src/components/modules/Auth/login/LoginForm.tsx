"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/context/UserContext";
import { loginUser } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  AtSign,
  Eye,
  EyeOff,
  Facebook,
  Github,
  Loader2,
  Lock,
  LogIn,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginSchema } from "./loginValidation";
import { getProfileInfo } from "@/services/ProfileService";

const LoginForm = () => {
  const { updateProfile } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const {
    formState: { isSubmitting },

    watch,
  } = form;

  const watchEmail = watch("email");
  const watchPassword = watch("password");

  useEffect(() => {
    if (loginError && (watchEmail || watchPassword)) {
      setLoginError("");
    }
  }, [watchEmail, watchPassword, loginError]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    setLoginError("");

    try {
      const res = await loginUser(data);

      if (res?.success) {
        const token = res.data?.accessToken;

        if (token) {
          localStorage.setItem("accessToken", token);

          const profileData = await getProfileInfo();
          localStorage.setItem("userProfile", JSON.stringify(profileData.data));
          updateProfile(profileData.data);
        }

        toast.success(res.message || "Login successful!");

        setTimeout(() => {
          router.push(redirect || "/");
        }, 500);
      } else {
        setLoginError(res?.message || "Invalid email or password");
      }
    } catch (error: any) {
      console.error(error);
      setLoginError(error.message || "An unexpected error occurred");
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`${provider} login coming soon!`);
  };

  return (
    <div className="flex items-center justify-center w-full max-h-full p-4 ">
      <div className="container z-50 w-full mx-auto overflow-hidden border-0 rounded-md ">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Welcome section */}

          <div className="relative bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#E3F2FD] hidden w-full p-8 overflow-hidden text-white md:w-1/2 md:flex md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative z-10 h-full"
            >
              <Image
                src="/images/login.jpg"
                width={600}
                height={600}
                alt="Forget Password"
                className="h-full rounded-md"
              />
            </motion.div>

            {/* Decorative elements */}
            {/* <div className="absolute w-64 h-64 rounded-full -bottom-16 -left-16 bg-blue-500/30 blur-xl"></div>
            <div className="absolute w-40 h-40 rounded-full top-1/4 -right-8 bg-indigo-500/20 blur-xl"></div>
            <div className="absolute w-32 h-32 rounded-full bottom-1/3 left-1/4 bg-blue-400/20 blur-lg"></div> */}
          </div>

          {/* Right side - Login form */}
          <div className="w-full rounded-md backdrop-blur bg-black/30 md:w-1/2 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto"
            >
              <div className="mb-8 ">
                {/* <Title title="Welcome Back !" /> */}
                <h1 className="my-4 text-3xl font-bold tracking-wide text-transparent text-white lg:text-5xl drop-shadow-sm">
                  Welcome Back !
                </h1>

                <p className="text-white">
                  Enter your credentials to access your account .
                </p>
              </div>

              {/* Social login options */}
              <div className="flex flex-col mb-6 space-y-4">
                <div className="flex justify-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-10 h-10 rounded-full"
                    onClick={() => handleSocialLogin("Facebook")}
                  >
                    <Facebook className="w-5 h-5 text-blue-600" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-10 h-10 rounded-full"
                    onClick={() =>
                      signIn("google", {
                        callbackUrl: "/",
                      })
                    }
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z"
                      />
                    </svg>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-10 h-10 rounded-full"
                    onClick={() =>
                      signIn("github", {
                        callbackUrl: "/",
                      })
                    }
                  >
                    <Github className="w-5 h-5" />
                  </Button>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-2 text-sm text-gray-500 bg-white">
                      or continue with email
                    </span>
                  </div>
                </div>
              </div>

              {loginError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 mb-6 text-sm text-red-600 border border-red-200 rounded-md bg-red-50"
                >
                  {loginError}
                </motion.div>
              )}

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg text-white">
                          Email
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <AtSign className="absolute w-4 h-4 text-gray-400 left-3 top-4" />
                            <Input
                              type="email"
                              className="h-12 pl-10  bg-gray-50 w-full focus:ring-2 ring-[#1E3A8A]"
                              placeholder="you@example.com"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password Field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel className="text-lg text-white">
                            Password
                          </FormLabel>
                          <Link
                            href="/forget-password"
                            className="text-xs text-white underline hover:text-black"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute w-4 h-4 text-gray-400 left-3 top-4" />
                            <Input
                              type={showPassword ? "text" : "password"}
                              className="h-12 pl-10 pr-10  bg-gray-50 w-full focus:ring-2 ring-[#1E3A8A]"
                              placeholder="••••••••"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute w-8 h-8 text-white right-2 top-2"
                            >
                              {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Remember me */}
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            className="focus-visible:bg-[#1E3A8A] data-[state=checked]:bg-[#1E3A8A] data-[state=checked]:border-none"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal text-white">
                            Remember me for 30 days
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* Sign in button */}
                  <Button
                    className="w-full h-12 font-medium text-white nextButton "
                    type="submit"
                    disabled={isSubmitting || isLoading}
                  >
                    {isSubmitting || isLoading ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center"
                      >
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Signing in...
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center"
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        Sign in
                      </motion.div>
                    )}
                  </Button>
                  <div className="mb-6 space-y-2">
                    <h3 className="text-base font-semibold text-white">
                      Demo Logins
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      <Button
                        type="button"
                        variant="default"
                        className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold px-6 py-2 rounded-lg shadow"
                        onClick={async () => {
                          const demoData = {
                            email: "admin2@gmail.com",
                            password: "Admin@123",
                            rememberMe: false,
                          };
                          form.setValue("email", demoData.email);
                          form.setValue("password", demoData.password);
                          form.setValue("rememberMe", demoData.rememberMe);
                          await form.handleSubmit(onSubmit)();
                        }}
                      >
                        Login as Admin
                      </Button>
                      <Button
                        type="button"
                        variant="default"
                        className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white font-semibold px-6 py-2 rounded-lg shadow"
                        onClick={async () => {
                          const demoData = {
                            email: "user@gmail.com",
                            password: "User@123",
                            rememberMe: false,
                          };
                          form.setValue("email", demoData.email);
                          form.setValue("password", demoData.password);
                          form.setValue("rememberMe", demoData.rememberMe);
                          await form.handleSubmit(onSubmit)();
                        }}
                      >
                        Login as User
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>

              {/* Sign up link */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-200">
                  Do not have an account?{" "}
                  <Link
                    href="/register"
                    className="font-medium text-white underline hover:text-black"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
