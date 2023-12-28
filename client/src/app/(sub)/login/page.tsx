"use client";
import { useReducer } from "react";
import { Typography, InputBox, Button } from "../../_components";
import Link from "next/link";

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

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(state);
  };
  return (
    <main className="mx-auto h-screen w-8/12 py-16">
      <div className="flex h-full rounded-3xl bg-white shadow-lg shadow-zinc-300">
        <div className="relative w-3/5">
          <img
            src="https://hcmut.edu.vn/img/carouselItem/59840602.jpg?t=59840602"
            alt="university illustration"
            className="h-full rounded-bl-xl rounded-tl-xl object-cover object-center"
          />
        </div>
        <div className="flex w-2/5 flex-col items-center px-16 py-24">
          <img src="logo.svg" alt="software logo" className="w-64" />
          <div className="w-full">
            <form
              className="flex w-full flex-col items-start gap-2"
              onSubmit={(e) => onSubmit(e)}
            >
              <Typography variant="h2" text="Username" color="text-blue" />
              <InputBox
                autoFocus={true}
                inputName="username"
                type="text"
                placeholderText="Username"
                onChange={(e) =>
                  dispatch({
                    type: UserActionType.CHANGE_USERNAME,
                    payload: e.target.value,
                  })
                }
              />
              <Typography variant="h2" text="Password" color="text-blue" className="mt-2"/>
              <InputBox
                inputName="password"
                type="password"
                placeholderText="Password"
                onChange={(e) =>
                  dispatch({
                    type: UserActionType.CHANGE_PASSWORD,
                    payload: e.target.value,
                  })
                }
              />
              <Button isPrimary variant="normal" className="mt-8">
                <Typography variant="p" text="Login" color="text-white" />
              </Button>
              <Link href={"#"} className="underline mx-auto text-gray hover:text-black duration-200">Forgot password?</Link>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
