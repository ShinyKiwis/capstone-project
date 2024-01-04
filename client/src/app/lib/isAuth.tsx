"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";


export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const auth = true;


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