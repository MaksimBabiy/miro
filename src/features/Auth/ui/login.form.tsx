import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginValues } from "../model/schemas";
import { Button } from "@/shared/ui/kit/button";
import { useLogin } from "../model/use-login";

export const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { login, isPending, errorMessage } = useLogin();
  const onSubmit = (values: LoginValues) => {
    login(values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email address"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter your email address</FormDescription>
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
                <Input
                  placeholder="Password"
                  type="password"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter your password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="default" disabled={isPending}>
          Login
        </Button>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
    </Form>
  );
};
