"use client";
import { login } from "@/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormState } from "react-dom";

const LoginForm = () => {
  const [state, formAction] = useFormState<any, FormData>(login, undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  return (
    <form className="flex flex-col gap-8" action={formAction}>
      <h1 className="text-2xl font-semibold">Login</h1>
      {/* Type */}
      <div className="flex gap-4">
        <span
          className={`ring-2 ring-red-500 rounded-md p-2 ${
            mode === "user" && "bg-red-400 text-white font-semibold"
          }`}
          onClick={() => setMode("user")}
        >
          User
        </span>
        <span
          className={`ring-2 ring-red-500 rounded-md p-2 ${
            mode === "organization" && "bg-red-400 text-white font-semibold"
          }`}
          onClick={() => setMode("organization")}
        >
          Organization
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-700">Email</label>
        <input
          type="text"
          name="email"
          placeholder="user@gmail.com"
          className="ring-2 ring-gray-300 rounded-md p-4"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="ring-2 ring-gray-300 rounded-md p-4"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="bg-red-500 text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Login"}
      </button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
};
export default LoginForm;
