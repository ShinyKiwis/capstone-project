"use client";
import Image from "next/image";
import { useForm } from "@mantine/form";
import { Button, PasswordInput, Text, TextInput } from "@mantine/core";
import Link from "next/link";
import { useAuth } from "@/app/providers/AuthProvider";
import { useEffect } from "react";
import useNavigate from "@/app/hooks/useNavigate";

const Login = () => {
  const {error, login, user} = useAuth()
  const navigate = useNavigate()
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });

  useEffect(()=>{
    if(user) {
      navigate("/project?project=specialized")
    }
  }, [])

  const handleLogin = (values: {username: string, password: string}) => {
    const {username, password} = values
    login(username, password)
  }


  return (
    <div className="mx-auto h-screen w-8/12 py-16">
      <div className="flex h-full rounded-3xl bg-white shadow-lg shadow-zinc-300">
        <div className="relative w-3/5">
          <Image
            src="/illustration.jpg"
            alt="university illustration"
            layout="fill"
            objectFit="cover"
            className="rounded-bl-xl rounded-tl-xl"
          />
        </div>
        <div className="flex w-2/5 flex-col items-center justify-center px-16 py-24">
          <div className="relative">
            <Image
              src="/logo.svg"
              alt="software logo"
              width={256}
              height={64}
              className="mb-12"
            />
          </div>
          <Text c="red" fw={600}>{error}</Text>
          <form
            onSubmit={form.onSubmit((values) => handleLogin(values))}
            className="flex w-full flex-col gap-2"
          >
            <span className="text-lg font-medium">Username</span>
            <TextInput
              placeholder="Username"
              required
              {...form.getInputProps("username")}
            />
            <span className="text-lg font-medium">Password</span>
            <PasswordInput
              placeholder="Password"
              required
              {...form.getInputProps("password")}
            />
            
            <div className="text-red-500">{error}</div>

            <Button type="submit" fullWidth className="my-2">
              Log in
            </Button>
            <Link
              href={"#"}
              className="text-md mx-auto text-gray-400 underline duration-100 hover:text-black"
            >
              Forgot password?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
