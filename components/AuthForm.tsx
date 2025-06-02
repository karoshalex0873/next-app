"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";


import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Form } from "./ui/form";
import FormField from "./FormField";

const AuthFormSchema = (type: FormType) =>
  z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3)
  });

const AuthForm = ({ type }: { type: FormType }) => {
  const formSchema = AuthFormSchema(type)
  const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
  });

  // 2. Define a submit handler.

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
    const endpoint = type === 'sign-up' ? `${baseUrl}/auth/register` : `${baseUrl}/auth/login`;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await res.json(); 

      console.log("Full Response Data:", data); 

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      if (type === 'sign-up') {
        toast.success('Account created successfully! Please sign in.');
        router.push('/sign-in');
      } else {
        toast.success('Signed in successfully!');
        router.push('/');
      }

    } catch (error: any) {
      console.error("🟥 Error:", error);
      toast.error(`There was an error: ${error.message || error}`);
    }
  };

  const isSignIn = type === 'sign-in'

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image
            src="/logo.svg"
            alt="logo"
            height={32}
            width={38} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>
        <h3>Practise job interview with AI</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full mt-4 form">
            {!isSignIn &&
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
              />}

            <FormField
              control={form.control}
              name="email"
              label="email"
              placeholder="youremail@gmail.com"
              type="email"
            />
            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <Button
              className="btn"
              type="submit">{isSignIn ? 'Sign In' : 'Create an Account'}</Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignIn ? 'No account yet?' : 'Have an account already'}
          <Link href={isSignIn ? "/sign-up" : "/sign-in"} className="font-bold text-user-primary ml-1">
            {!isSignIn ? "Sign in" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
