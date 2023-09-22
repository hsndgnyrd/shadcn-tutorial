"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { useGlobalContext } from "@/app/context/store";
import Icons from "./Icons";
import { SIGNIN } from "@/app/constants";
import { getItem, setItem } from "@/lib/utils";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username must be at least 1 characters.",
  }),
  password: z.string().min(1, {
    message: "Password cannot be empty.",
  }),
});

export default function UserAuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { username, isLogin, setUsername, setIsLogin } = useGlobalContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setTimeout(() => {
      setUsername(values.username);
      setIsLogin(true);
      router.push("/home");
    }, 1000);
  }

  useLayoutEffect(() => {
    if (isLogin) {
      router.push("/home");
    }
  }, [isLogin, router]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} disabled={isLoading} />
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
                <Input placeholder="Password" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading && <Icons.spinner className="animate-spin mr-2 h-4 w-4" />}
          {SIGNIN}
        </Button>
      </form>
    </Form>
  );
}
