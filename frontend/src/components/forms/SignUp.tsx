import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { SignUpValidator } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useSignUpUserMutation } from "@/lib/react-query/queries-and-mutations";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SignUp = () => {
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutateAsync: registerUser } = useSignUpUserMutation();

  const form = useForm<z.infer<typeof SignUpValidator>>({
    resolver: zodResolver(SignUpValidator),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof SignUpValidator>) => {
    try {
      const regUser = await registerUser(values);

      if (!regUser) {
        setErrorMessage("User already exists");
        return;
      }

      toast("Registered successfully, please login", {
        type: "success",
      });

      navigate("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-8 mt-16">
      <svg
        width="102"
        height="42"
        viewBox="0 0 101 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[34px] w-[auto] text-primary transform-gpu"
      >
        <path
          d="M12.0288 18.2598C7.97006 17.3793 6.16191 17.0348 6.16191 15.4708C6.16191 13.9997 7.38555 13.2669 9.83283 13.2669C11.9851 13.2669 13.5584 14.2075 14.7165 16.0504C14.8039 16.1926 14.9841 16.2418 15.1316 16.1653L19.6984 13.8575C19.8623 13.7755 19.9224 13.5677 19.8295 13.4091C17.934 10.1224 14.4324 8.32324 9.82191 8.32324C3.76379 8.32324 0 11.3091 0 16.0559C0 21.098 4.58319 22.3722 8.64743 23.2527C12.7117 24.1331 14.5253 24.4776 14.5253 26.0417C14.5253 27.6057 13.2033 28.344 10.5648 28.344C8.12848 28.344 6.32033 27.2284 5.22779 25.0628C5.14585 24.9042 4.95466 24.8386 4.79624 24.9206L0.240358 27.1791C0.0819403 27.2612 0.0163881 27.4526 0.0983284 27.6166C1.90648 31.2533 5.61564 33.2986 10.5703 33.2986C16.8797 33.2986 20.6927 30.3619 20.6927 25.4675C20.6927 20.573 16.0876 19.1512 12.0288 18.2707V18.2598Z"
          fill="currentColor"
        ></path>
        <path
          d="M36.5018 8.32341C33.9125 8.32341 31.6236 9.24214 29.9794 10.8773C29.8756 10.9757 29.7062 10.9046 29.7062 10.7624V0.322772C29.7062 0.142307 29.5642 0.00012207 29.3839 0.00012207H23.67C23.4897 0.00012207 23.3477 0.142307 23.3477 0.322772V32.7245C23.3477 32.905 23.4897 33.0472 23.67 33.0472H29.3839C29.5642 33.0472 29.7062 32.905 29.7062 32.7245V18.5115C29.7062 15.7662 31.8094 13.6608 34.6445 13.6608C37.4796 13.6608 39.5336 15.7225 39.5336 18.5115V32.7245C39.5336 32.905 39.6756 33.0472 39.8559 33.0472H45.5699C45.7501 33.0472 45.8922 32.905 45.8922 32.7245V18.5115C45.8922 12.5397 41.9809 8.32887 36.5018 8.32887V8.32341Z"
          fill="currentColor"
        ></path>
        <path
          d="M57.4962 7.39915C54.3934 7.39915 51.4764 8.34522 49.3896 9.71785C49.2476 9.81082 49.1984 10.0022 49.2858 10.1499L51.8041 14.4537C51.897 14.6068 52.0937 14.6615 52.2466 14.5685C53.8308 13.6115 55.6444 13.1139 57.4962 13.1248C62.4837 13.1248 66.1491 16.6466 66.1491 21.3005C66.1491 25.2652 63.2157 28.2019 59.4956 28.2019C56.4638 28.2019 54.3607 26.4355 54.3607 23.9418C54.3607 22.5145 54.967 21.3442 56.5457 20.5184C56.7096 20.4309 56.7697 20.2286 56.6714 20.07L54.2951 16.0451C54.2186 15.9138 54.0548 15.8537 53.9073 15.9084C50.7225 17.0896 48.4883 19.9333 48.4883 23.7504C48.4883 29.5253 53.0824 33.8346 59.4901 33.8346C66.974 33.8346 72.3548 28.6448 72.3548 21.202C72.3548 13.2233 66.0945 7.39368 57.4853 7.39368L57.4962 7.39915Z"
          fill="currentColor"
        ></path>
        <path
          d="M89.0635 8.27964C86.1738 8.27964 83.5954 9.34603 81.7108 11.2272C81.607 11.3311 81.4376 11.2546 81.4376 11.1124V8.84838C81.4376 8.66791 81.2956 8.52573 81.1153 8.52573H75.5489C75.3686 8.52573 75.2266 8.66791 75.2266 8.84838V41.2009C75.2266 41.3814 75.3686 41.5236 75.5489 41.5236H81.2628C81.4431 41.5236 81.5851 41.3814 81.5851 41.2009V30.5917C81.5851 30.4495 81.7545 30.3784 81.8583 30.4714C83.7374 32.2214 86.2229 33.244 89.069 33.244C95.7717 33.244 101 27.8137 101 20.7591C101 13.7045 95.7663 8.27417 89.069 8.27417L89.0635 8.27964ZM87.9874 27.7644C84.1744 27.7644 81.2847 24.7293 81.2847 20.7153C81.2847 16.7014 84.169 13.6663 87.9874 13.6663C91.8058 13.6663 94.6846 16.6521 94.6846 20.7153C94.6846 24.7786 91.844 27.7644 87.9819 27.7644H87.9874Z"
          fill="currentColor"
        ></path>
      </svg>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-7 w-[85%] md:w-1/2 xl:w-[30%] border border-secondary/90 shadow rounded-md flex flex-col items-center gap-y-8"
        >
          <div className="flex flex-col items-center justify-center gap-y-1.5">
            <p className="text-gray-950 text-base font-medium">
              Create an account
            </p>
            <p className="text-neutral-500 text-sm font-medium">
              Already have an account?{" "}
              <Link
                to="/sign-in"
                className="text-primary font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
          <div className="w-full flex flex-col gap-y-3">
            <div className="w-full flex items-center gap-x-1.5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl className="w-full">
                      <Input
                        placeholder="Name"
                        className="w-full rounded-xl placeholder:font-medium font-semibold border-secondary outline-none focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 transition-all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl className="w-full">
                      <Input
                        placeholder="Username (optional)"
                        className="w-full rounded-xl placeholder:font-medium font-semibold border-secondary outline-none focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 transition-all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Input
                      placeholder="Email"
                      className="w-full rounded-xl placeholder:font-medium font-semibold border-secondary outline-none focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 transition-all"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Input
                      type="password"
                      placeholder="Password"
                      className="w-full rounded-xl placeholder:font-medium font-semibold border-secondary outline-none focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 transition-all"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {errorMessage && (
              <p className="text-red-500 text-sm font-medium text-center">
                {errorMessage}
              </p>
            )}
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                !form.getValues("name") ||
                !form.getValues("email") ||
                !form.getValues("password")
              }
              className="w-full font-semibold rounded-xl"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Sign up"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignUp;
