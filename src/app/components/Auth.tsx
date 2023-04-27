/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { AuthenticationContext } from "../context/AuthContext";
import DotLoading from "./DotLoading";
import { useRouter } from "next/navigation";
import Image from "next/image";
import cross from "./../../../public/icons/cross_rounded.png";
import cross_dark from "./../../../public/icons/cross-dark.png";
import open from "./../../../public/icons/eyeopen.png";
import open_dark from "./../../../public/icons/open-dark.png";
import close from "./../../../public/icons/eyeclose.png";
import close_dark from "./../../../public/icons/close-dark.png";
import { useTheme } from "next-themes";

export default function Auth() {
  const { data, error, loading, setAuthState } = useContext(
    AuthenticationContext
  );
  const { theme, systemTheme } = useTheme();
  const currentTheme = systemTheme === theme ? systemTheme : theme;

  const [errorList, setErrorList] = useState(error ? error : []);
  const uniqSet = new Set(errorList);
  const errorListUniq = [...uniqSet];
  const [showPassword, setShowPassword] = useState(false);

  const [isOpSignUp, setIsOpSignUp] = useState(false);
  const [isOpSignIn, setIsOpSignIn] = useState(false);
  const { signin, signup } = useAuth();
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [disabled, setDisabled] = useState(true);
  const router = useRouter();
  const isMessage = () => {
    if (!error) {
      return false;
    }
    if (
      error[0] === "User was registered successfully! Please check your email"
    ) {
      return true;
    } else {
      false;
    }
  };
  const handleSignUp = () => {
    const { firstName, lastName, email, password } = inputs;
    signup({
      firstName,
      lastName,
      email,
      password,
      router,
      setIsOpSignUp,
    });
  };
  const handleSignIn = () => {
    const { email, password } = inputs;

    signin({ email, password, router });
  };
  const doesMatch = () => {
    if (inputs.confirm !== "") {
      if (inputs.password !== inputs.confirm) {
        setErrorList([...errorList, "Password don't match"]);
      }
    }
  };

  useEffect(() => {
    doesMatch();
    if (inputs.password === inputs.confirm) setErrorList([]);
    if (isOpSignIn) {
      if (inputs.password && inputs.email) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [inputs]);

  useEffect(() => {
    error ? setErrorList(error) : "";
  }, [error]);

  useEffect(() => {
    setErrorList([]);
    setInputs({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm: "",
    });
    setAuthState({
      data: null,
      error: null,
      loading: false,
    });
  }, [isOpSignIn, isOpSignUp]);

  useEffect(() => {
    if (isOpSignUp) {
      if (
        inputs.firstName &&
        inputs.lastName &&
        inputs.email &&
        inputs.password &&
        inputs.confirm === inputs.password
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
    <div className=" h-full w-full relative flex items-center flex-col">
      {isMessage() ? (
        <div className="absolute w-72 -top-52  p-1 mb-4 text-center text-black rounded-md bg-green-200">
          <p>User was registered successfully!</p>
          <p>Please check your email</p>
        </div>
      ) : (
        ""
      )}
      {errorListUniq && isOpSignIn === false && !isMessage()
        ? Array.isArray(errorListUniq)
          ? errorListUniq.map((e, i) => (
              <div
                key={i}
                className={`absolute w-72 -top-52  p-1 mb-4 text-center text-black rounded-md 
                 bg-red-200
                 cursor-pointer `}
              >
                {errorListUniq[i].split("\n").map((str, i) => (
                  <p key={i}>{str}</p>
                ))}
              </div>
            ))
          : ""
        : ""}
      <button
        onClick={() => {
          setIsOpSignIn(!isOpSignIn);
        }}
        className="mt-20 mb-4 w-28 h-9 font-bold bg-white rounded-md drop-shadow-[0_5px_3px_rgba(0,0,0,0.3)] hover:drop-shadow-md --dark-- dark:bg-[#3A405F]"
      >
        SignIn
      </button>
      <button
        onClick={() => {
          setIsOpSignUp(true);
        }}
        className=" w-28 h-9 font-bold bg-white rounded-md drop-shadow-[0_5px_3px_rgba(0,0,0,0.3)] hover:drop-shadow-md --dark-- dark:bg-[#3A405F]"
      >
        SignUp
      </button>
      {/* //-MODAL-SIGNIN-// */}
      <div
        hidden={isOpSignIn ? false : true}
        className="absolute h-[95%] w-[95%] mt-4 rounded-md  drop-shadow-[0_0_3px_rgba(0,0,0,0.3)]  bg-white --dark-- dark:bg-[#3A405F]  "
      >
        <div className="flex justify-end">
          <button
            className="mt-2 mr-2"
            onClick={() => {
              setIsOpSignIn(false);
            }}
          >
            <div className="h-5 w-5">
              {currentTheme === "dark" ? (
                <Image src={cross_dark} alt="error" className="w-56 mb-8" />
              ) : (
                <Image src={cross} alt="error" className="w-56 mb-8" />
              )}
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
          <p className="text-xl  uppercase font-bold border-b-2 border-black mb-10 --dark-- dark:border-[#E18B15]">
            welcome back
          </p>

          {loading ? (
            <div className="h-full w-full ">
              {currentTheme === "dark" && <DotLoading />}
              {currentTheme !== "dark" && <DotLoading />}
            </div>
          ) : (
            <>
              <input
                className="bg-gray-100 shadow-inner w-full h-9 mb-4 rounded-md pl-2 --dark-- dark:placeholder:text-[#E18B15] dark:bg-[#3A405F] "
                value={inputs.email}
                placeholder="Email"
                type="email"
                name="email"
                onChange={(e) => {
                  handleChangeInput(e);
                }}
              />
              <div className=" relative flex w-full h-9 mb-4">
                <input
                  className="  bg-gray-100 shadow-inner w-full h-9 rounded-md pl-2 --dark-- dark:placeholder:text-[#E18B15] dark:bg-[#3A405F]"
                  value={inputs.password}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={(e) => {
                    handleChangeInput(e);
                  }}
                />
                <div
                  className={`absolute ${
                    showPassword ? "top-3" : "top-4"
                  } right-2  w-1/8 flex justify-center items-center`}
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {currentTheme === "dark" ? (
                    <Image
                      className="origin-center w-4"
                      src={showPassword ? open_dark : close_dark}
                      alt=""
                    />
                  ) : (
                    <Image
                      className="origin-center w-4"
                      src={showPassword ? open : close}
                      alt=""
                    />
                  )}
                </div>
              </div>
              <button
                className={` ${
                  disabled
                    ? "bg-red-300 dark:bg-[#3A405F] dark:border-2 dark:border-red-300 dark:text-red-300"
                    : " bg-white dark:bg-[#3A405F] dark:border-2 dark:border-green-200 dark:text-green-200"
                } capitalize w-36 h-9 mb-4 font-bold rounded-md drop-shadow-[0_0_3px_rgba(0,0,0,0.3)] hover:drop-shadow-md`}
                disabled={disabled}
                type="submit"
              >
                Let's get busy !
              </button>
              {error ? (
                <div className="w-full p-3 text-center rounded-md text-black bg-red-200 ">
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
        className="absolute h-[95%] w-[95%] mt-4 rounded-md  drop-shadow-[0_0_3px_rgba(0,0,0,0.3)] bg-white --dark-- dark:bg-[#3A405F] "
      >
        <div className="flex justify-end">
          <button
            className="mt-2 mr-2"
            onClick={() => {
              setIsOpSignUp(false);
            }}
          >
            <div className="h-5 w-5">
              {currentTheme === "dark" ? (
                <Image src={cross_dark} alt="error" className="w-56 mb-8" />
              ) : (
                <Image src={cross} alt="error" className="w-56 mb-8" />
              )}
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
          <p className="text-xl  uppercase font-bold border-b-2 border-black mb-10 --dark-- dark:border-[#E18B15]">
            Create your account
          </p>
          {loading ? (
            <DotLoading />
          ) : (
            <>
              {" "}
              <div className="flex w-full justify-between">
                <input
                  className="  bg-gray-100 shadow-inner w-[49%] h-9 mb-4 rounded-md pl-2 --dark-- dark:placeholder:text-[#E18B15] dark:bg-[#3A405F]"
                  value={inputs.firstName}
                  placeholder="Firstname"
                  type="text"
                  name="firstName"
                  onChange={(e) => {
                    handleChangeInput(e);
                  }}
                />
                <input
                  className="  bg-gray-100 shadow-inner w-[49%] h-9 mb-4 rounded-md pl-2 --dark-- dark:placeholder:text-[#E18B15] dark:bg-[#3A405F]"
                  value={inputs.lastName}
                  placeholder="Lastname"
                  type="text"
                  name="lastName"
                  onChange={(e) => {
                    handleChangeInput(e);
                  }}
                />
              </div>
              <input
                className="  bg-gray-100 shadow-inner w-full h-9 mb-4 rounded-md pl-2 --dark-- dark:placeholder:text-[#E18B15] dark:bg-[#3A405F]"
                value={inputs.email}
                placeholder="Email"
                type="email"
                name="email"
                onChange={(e) => {
                  handleChangeInput(e);
                }}
              />
              <div className=" relative flex w-full h-9 mb-4 --dark-- dark:placeholder:text-[#E18B15] dark:bg-[#3A405F]">
                <input
                  className="  bg-gray-100 shadow-inner w-full h-9  rounded-md pl-2 --dark-- dark:placeholder:text-[#E18B15] dark:bg-[#3A405F]"
                  value={inputs.password}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={(e) => {
                    handleChangeInput(e);
                  }}
                />
                <div
                  className={`absolute ${
                    showPassword ? "top-3" : "top-4"
                  } right-2  w-1/8 flex justify-center items-center`}
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {currentTheme === "dark" ? (
                    <Image
                      className="origin-center w-4"
                      src={showPassword ? open_dark : close_dark}
                      alt=""
                    />
                  ) : (
                    <Image
                      className="origin-center w-4"
                      src={showPassword ? open : close}
                      alt=""
                    />
                  )}
                </div>
              </div>
              <div className=" relative flex w-full h-9 mb-4">
                <input
                  className={` bg-gray-100 shadow-inner w-full h-9 mb-4 rounded-md pl-2 ${
                    inputs.password === inputs.confirm
                      ? "focus:outline-green-200"
                      : ""
                  } --dark-- dark:placeholder:text-[#E18B15] dark:bg-[#3A405F] `}
                  value={inputs.confirm}
                  placeholder="Confirm password"
                  type={showPassword ? "text" : "password"}
                  name="confirm"
                  onChange={(e) => {
                    handleChangeInput(e);
                  }}
                />
                <div
                  className={`absolute ${
                    showPassword ? "top-3" : "top-4"
                  } right-2  w-1/8 flex justify-center items-center`}
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {currentTheme === "dark" ? (
                    <Image
                      className="origin-center w-4"
                      src={showPassword ? open_dark : close_dark}
                      alt=""
                    />
                  ) : (
                    <Image
                      className="origin-center w-4"
                      src={showPassword ? open : close}
                      alt=""
                    />
                  )}
                </div>
              </div>
              <button
                className={` ${
                  disabled
                    ? "bg-red-300 dark:bg-[#3A405F] dark:border-2 dark:border-red-300 dark:text-red-300"
                    : " bg-white dark:bg-[#3A405F] dark:border-2 dark:border-green-200 dark:text-green-200"
                } capitalize mb-4 w-full h-9 font-bold rounded-md drop-shadow-[0_0_3px_rgba(0,0,0,0.3)] hover:drop-shadow-md`}
                disabled={disabled}
                type="submit"
              >
                Start your productivy quest !
              </button>
            </>
          )}
        </form>
      </div>
      {/* //-MODAL-SIGNUP-// */}
    </div>
  );
}
