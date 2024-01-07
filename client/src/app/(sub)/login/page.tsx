"use client";
import { useContext, useReducer, useState } from "react";
import axios from "axios";
import { Typography, InputBox, Button } from "../../_components";
import Link from "next/link";
import { AuthContext } from "@/app/providers/AuthProvider";
import DynamicInputBox from "./DynamicInputBox";

enum UserActionType {
  CHANGE_USERNAME = "CHANGE_USERNAME",
  CHANGE_PASSWORD = "CHANGE_PASSWORD",
}

interface UserAction {
  type: UserActionType;
  payload: string;
}

interface UserState {
  username: string;
  password: string;
}

const reducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionType.CHANGE_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    case UserActionType.CHANGE_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    default:
      throw "Unknown Action";
  }
};

export default function Login() {
  const [state, dispatch] = useReducer(reducer, { username: "", password: "" });
  const [error, setError] = useState("");
  const authContext = useContext(AuthContext)
  if(!authContext) {
    return <div>Loading...</div>
  }
  const {login} = authContext

  const onSubmit = async(e: React.SyntheticEvent) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:4000/api/auth/login", {
        username: state.username,
        password: state.password,
      }, {
        validateStatus: status => status >= 200 && status < 500
      })
      const { authenticated, token, cookie, user } = response.data;
      console.log(response.data)
      if (authenticated) {
        localStorage.setItem("token", token);
        localStorage.setItem("cookie", JSON.stringify(cookie));
        login(user)
      } else {
        setError(response.data.message)
      }
  };
  return (
    <main className="mx-auto h-screen w-8/12 py-16">
      <div className="shadow-zinc-300 flex h-full rounded-3xl bg-white shadow-lg">
        <div className="relative w-3/5">
          <img
            src="https://hcmut.edu.vn/img/carouselItem/59840602.jpg?t=59840602"
            alt="university illustration"
            className="h-full rounded-bl-xl rounded-tl-xl object-cover object-center"
          />
        </div>
        <div className="flex w-2/5 flex-col items-center px-16 py-24">
          <img src="logo.svg" alt="software logo" className="w-64" />
          {error && (
            <Typography
              variant="span"
              text={error}
              color="text-red"
            />
          )}
          <div className="w-full">
            <form
              className="flex w-full flex-col items-start gap-2"
              onSubmit={(e) => onSubmit(e)}
            >
              <Typography variant="h2" text="Username" color="text-blue" />
              <DynamicInputBox
                autoFocus={true}
                inputName="username"
                type="text"
                placeholderText="Username"
                className="px-4 py-2"
                onChange={(e) =>
                  dispatch({
                    type: UserActionType.CHANGE_USERNAME,
                    payload: e.target.value,
                  })
                }
              />
              <Typography
                variant="h2"
                text="Password"
                color="text-blue"
                className="mt-2"
              />
              <DynamicInputBox
                inputName="password"
                type="password"
                placeholderText="Password"
                className="px-4 py-2"
                onChange={(e) =>
                  dispatch({
                    type: UserActionType.CHANGE_PASSWORD,
                    payload: e.target.value,
                  })
                }
              />
              <Button isPrimary variant="normal" className="mt-8 w-full py-2">
                <Typography variant="p" text="Login" color="text-white" />
              </Button>
              <Link
                href={"#"}
                className="mx-auto text-gray underline duration-200 hover:text-black"
              >
                Forgot password?
              </Link>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
