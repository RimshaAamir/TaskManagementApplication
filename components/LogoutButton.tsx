"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for token to determine login state
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // If token exists, user is logged in
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      // Logout logic
      localStorage.removeItem("token");
      setIsLoggedIn(false); // Update state to reflect logout
      router.push("/login"); // Redirect to login page
    } else {
      // Redirect to login page
      router.push("/login");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 rounded ${
        isLoggedIn ? "bg-red-500 text-white" : "bg-blue-500 text-white"
      }`}
    >
      {isLoggedIn ? "Logout" : "Login"}
    </button>
  );
}
