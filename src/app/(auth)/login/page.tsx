"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const body = { email, password, type: mode };
      const res = await axios.post("/api/login", body);
      console.log(res);
      const data = await res.data.data;
      setIsLoading(false);

      if (data.length !== 0) {
        localStorage.setItem("ACTIVE_USER", JSON.stringify(data));
        localStorage.setItem("auth_key", data?.auth_key);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-[100vh] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
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
      </form>
    </div>
  );
};
export default LoginPage;
