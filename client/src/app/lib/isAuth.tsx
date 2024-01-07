"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import useUser from "../hooks/useUser";


export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const user = useUser()
    console.log(user)
    // const auth = user.name !== "Invalid"
    const auth = true                                  // test


    useEffect(() => {
      if (!auth) {
        return redirect("/login");
      }
    }, []);


    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}