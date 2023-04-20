/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { ChangeEvent, useContext, useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { AuthenticationContext } from "../context/AuthContext";
import DotLoading from "./DotLoading";
import { useRouter } from "next/navigation";
import Image from "next/image";
import cross from "./../../../public/icons/cross_rounded.png";

export default function Auth() {
  const { data, error, loading } = useContext(AuthenticationContext);

  const [isOpSignUp, setIsOpSignUp] = useState(false);
  const [isOpSignIn, setIsOpSignIn] = useState(false);
  const { signin, signup } = useAuth();
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [disabled, setDisabled] = useState(true);
  const router = useRouter();

  const handleSignUp = () => {
    const { firstName, lastName, email, password } = inputs;
    signup({
      firstName,
      lastName,
      email,
      password,
      router,
    });
  };
  const handleSignIn = () => {
    const { email, password } = inputs;

    signin({ email, password, router });
  };

  useEffect(() => {
    if (isOpSignIn) {
      if (inputs.password && inputs.email) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [inputs]);

  useEffect(() => {
    if (isOpSignUp) {
      if (
        inputs.firstName &&
        inputs.lastName &&
        inputs.email &&
        inputs.password
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [inputs]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="h-full w-full relative flex items-center flex-col">
      <button
        onClick={() => {
          setIsOpSignIn(!isOpSignIn);
        }}
        className="mt-20 mb-4 w-28 h-9 font-bold bg-white rounded-md drop-shadow-[0_5px_3px_rgba(0,0,0,0.3)] hover:drop-shadow-md"
      >
        SignIn
      </button>
      <button
        onClick={() => {
          setIsOpSignUp(true);
        }}
        className=" w-28 h-9 font-bold bg-white rounded-md drop-shadow-[0_5px_3px_rgba(0,0,0,0.3)] hover:drop-shadow-md"
      >
        SignUp
      </button>
      {/* //-MODAL-SIGNIN-// */}
      <div
        hidden={isOpSignIn ? false : true}
        className="absolute h-[95%] w-[95%] mt-4 rounded-md  drop-shadow-[0_0_3px_rgba(0,0,0,0.3)]  bg-white"
      >
        <div className="flex justify-end">
          <button
            className="mt-2 mr-2"
            onClick={() => {
              setIsOpSignIn(false);
            }}
          >
            <div className="h-5 w-5">
              <Image src={cross} alt="" />
            </div>
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignIn();
          }}
          className=" h-full w-full px-6 pt-4 xsm:px-12 sm:px-28  flex flex-col items-center"
        >
          <p className="text-xl  uppercase font-bold border-b-2 border-black mb-10">
            welcome back
          </p>

          {loading ? (
            <div className="h-full w-full ">
              <DotLoading />
            </div>
          ) : (
            <>
              <input
                className="bg-gray-100 shadow-inner w-full h-9 mb-4 rounded-md pl-2"
                value={inputs.email}
                placeholder="Email"
                type="email"
                name="email"
                onChange={(e) => {
                  setInputs({
                    firstName: inputs.firstName,
                    lastName: inputs.lastName,
                    email: e.currentTarget.value,
                    password: inputs.password,
                  });
                }}
              />
              <input
                className="bg-gray-100 shadow-inner w-full h-9 mb-4 rounded-md pl-2"
                value={inputs.password}
                placeholder="Password"
                type="password"
                name="password"
                onChange={(e) => {
                  setInputs({
                    firstName: inputs.firstName,
                    lastName: inputs.lastName,
                    email: inputs.email,
                    password: e.currentTarget.value,
                  });
                }}
              />
              <button
                className={` ${
                  disabled ? "bg-red-300" : " bg-white"
                } capitalize w-36 h-9 mb-4 font-bold rounded-md drop-shadow-[0_0_3px_rgba(0,0,0,0.3)] hover:drop-shadow-md`}
                disabled={disabled}
                type="submit"
              >
                Let's get busy !
              </button>
              {error ? (
                <div className="w-full p-3 text-center rounded-md bg-red-200 ">
                  {error}
                </div>
              ) : (
                ""
              )}
            </>
          )}
        </form>
      </div>
      {/* //-MODAL-SIGNIN-// */}
      {/* //-MODAL-SIGNUP-// */}
      <div
        hidden={isOpSignUp ? false : true}
        className="absolute h-[95%] w-[95%] mt-4 rounded-md  drop-shadow-[0_0_3px_rgba(0,0,0,0.3)] bg-white"
      >
        <div className="flex justify-end">
          <button
            className="mt-2 mr-2"
            onClick={() => {
              setIsOpSignUp(false);
            }}
          >
            <div className="h-5 w-5">
              <Image src={cross} alt="" />
            </div>
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp();
          }}
          className=" px-6 xsm:px-24 sm:px-28 flex flex-col items-center"
        >
          <p className="text-xl  uppercase font-bold border-b-2 border-black mb-10">
            Create your account
          </p>
          {loading ? (
            <DotLoading />
          ) : (
            <>
              {" "}
              <div className="flex w-full justify-between">
                <input
                  className="  bg-gray-100 shadow-inner w-[49%] h-9 mb-4 rounded-md pl-2"
                  value={inputs.firstName}
                  placeholder="Firstname"
                  type="text"
                  name="firstName"
                  onChange={(e) => {
                    setInputs({
                      firstName: e.currentTarget.value,
                      lastName: inputs.lastName,
                      email: inputs.email,
                      password: inputs.password,
                    });
                  }}
                />
                <input
                  className="  bg-gray-100 shadow-inner w-[49%] h-9 mb-4 rounded-md pl-2"
                  value={inputs.lastName}
                  placeholder="Lastname"
                  type="text"
                  name="lastName"
                  onChange={(e) => {
                    setInputs({
                      firstName: inputs.firstName,
                      lastName: e.currentTarget.value,
                      email: inputs.email,
                      password: inputs.password,
                    });
                  }}
                />
              </div>
              <input
                className="  bg-gray-100 shadow-inner w-full h-9 mb-4 rounded-md pl-2"
                value={inputs.email}
                placeholder="Email"
                type="email"
                name="email"
                onChange={(e) => {
                  setInputs({
                    firstName: inputs.firstName,
                    lastName: inputs.lastName,
                    email: e.currentTarget.value,
                    password: inputs.password,
                  });
                }}
              />
              <input
                className="  bg-gray-100 shadow-inner w-full h-9 mb-4 rounded-md pl-2"
                value={inputs.password}
                placeholder="Password"
                type="password"
                name="password"
                onChange={(e) => {
                  setInputs({
                    firstName: inputs.firstName,
                    lastName: inputs.lastName,
                    email: inputs.email,
                    password: e.currentTarget.value,
                  });
                }}
              />
              <button
                className={`${
                  disabled ? "bg-red-300" : "bg-white "
                } capitalize mb-4 w-full h-9 font-bold rounded-md drop-shadow-[0_0_3px_rgba(0,0,0,0.3)] hover:drop-shadow-md`}
                disabled={disabled}
                type="submit"
              >
                Start your productivy quest !
              </button>
              {error
                ? Array.isArray(error)
                  ? error.map((e, i) => (
                      <div
                        key={i}
                        className="w-full p-1 mb-4 text-center rounded-md bg-red-200 "
                      >
                        {error[i]}
                      </div>
                    ))
                  : ""
                : ""}
            </>
          )}
        </form>
      </div>
      {/* //-MODAL-SIGNUP-// */}
    </div>
  );
}
