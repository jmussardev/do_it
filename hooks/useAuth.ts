"use client";
import { useContext } from "react";
import { AuthenticationContext } from "./../src/app/context/AuthContext";
import axios from "axios";
import { removeCookies } from "cookies-next";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

const useAuth = () => {
  const { setAuthState } = useContext(AuthenticationContext);
  const signin = async ({
    email,
    password,
    router,
  }: {
    email: string;
    password: string;
    router: AppRouterInstance;
  }) => {
    setAuthState({ data: null, error: null, loading: true });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        }
      );
      setAuthState({ data: response.data, error: null, loading: false });

      router.push("/user/today");
    } catch (e: any) {
      setAuthState({
        data: null,
        error: e.response.data,
        loading: false,
      });
    }
  };

  const signup = async ({
    firstName,
    lastName,
    email,
    password,
    router,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    router: AppRouterInstance;
  }) => {
    setAuthState({ data: null, error: null, loading: true });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          firstName,
          lastName,
          email,
          password,
        }
      );
      setAuthState({ data: null, error: null, loading: false });
      router.push("/user/today");
    } catch (e: any) {
      setAuthState({
        data: null,
        error: e.response.data,
        loading: false,
      });
    }
  };

  const signout = (router: AppRouterInstance) => {
    router.push("/");
    removeCookies("jwt");
    router.refresh();
    setAuthState({
      data: null,
      error: null,
      loading: false,
    });
  };

  return {
    signin,
    signup,
    signout,
  };
};

export default useAuth;