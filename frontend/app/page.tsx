"use client";

import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import axios from "axios";

export default function Home() {
  const login = useGoogleLogin({
    async onSuccess({ code }) {
      const tokenResponse = await axios.get("http://localhost:2000/v1/auth/google/callback", {
        params: {
          code,
        },
        withCredentials: true,
      });
      console.log(tokenResponse);
    },
    onError(error) {
      console.error(error);
    },
    flow: "auth-code",
  });
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={login}>Login</button>
      <button onClick={googleLogout}>Logout</button>
    </div>
  );
}
