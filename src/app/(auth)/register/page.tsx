"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const body = { username, password, email, phone };

    try {
      const { data } = await axios.post("/api/registerUser", body);

      if (data?.length !== 0) {
        router.push("/login");
      }
    } catch (error) {
      setError("error");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[100vh] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold">Register</h1>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            placeholder="user"
            className="ring-2 ring-gray-300 rounded-md p-4"
            onChange={(e) => setUsername(e.target.value)}
          />
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
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700">Phone</label>
          <input
            type="number"
            name="phone"
            placeholder="Enter your Phone"
            className="ring-2 ring-gray-300 rounded-md p-4"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button
          className="bg-red-500 text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
};
export default RegisterPage;
