"use client";
import { useContext } from "react";
import { AuthenticationContext } from "./../src/app/context/AuthContext";
import axios from "axios";
import { removeCookies } from "cookies-next";

const useAuth = () => {
  const { setAuthState } = useContext(AuthenticationContext);
  const signin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
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
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
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
    } catch (e: any) {
      setAuthState({
        data: null,
        error: e.response.data,
        loading: false,
      });
    }
  };

  const signout = () => {
    removeCookies("jwt");
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
