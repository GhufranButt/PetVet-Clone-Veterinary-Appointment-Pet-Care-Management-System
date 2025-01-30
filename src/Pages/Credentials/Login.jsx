import React, { useEffect, useState } from "react";
import logoImg from "../../assets/Logo.png";
import Button from "../../Components/Button.jsx";
import Carousel from "../../Components/Carousel.jsx";
import { useNavigate } from "react-router-dom";
import facbookLogo from "../../assets/facebook.svg";
import googleLogo from "../../assets/google.svg";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LoginUser } from "../../Utils/Api.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [passShow, setPassShow] = useState(false);
  const [isloading, setIsloading] = useState(false);

  const passwordShow = () => {
    setPassShow(!passShow);
  };
  const navigate = useNavigate();

  const handleSave = async (data) => {
    try {
      setIsloading(true);
      const result = await LoginUser(data.email, data.password);

      localStorage.setItem("email", data.email);
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));
      localStorage.setItem("isLoggedIn", "true");
      const userId = result.data.user._id;
      localStorage.setItem("userId", userId);
      toast.success(result.message || "Login Successful!");
      setIsloading(false);
      navigate("/HomePage");
    } catch (error) {
      setIsloading(false);

      console.error("Request Error:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (errors.email || errors.password) {
      const timer = setTimeout(() => {
        if (errors.email) clearErrors("email");
        if (errors.password) clearErrors("password");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [errors.email, errors.password, clearErrors]);

  const handleForgotPassword = () => {
    navigate("/Forgot");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row gap-10 lg:items-center">
        <Carousel />
        <div className="mx-auto mt-10">
          <div className="border border-[rgb(218,218,218)] mx-auto xl:p-12 p-5 gap-5 w-[330px] rounded-[40px] lg:w-[500px] xl:w-[608px] xl:rounded-[50px]">
            <div className="flex flex-col items-center gap-4 xl:gap-4">
              <img src={logoImg} className="w-[80px] h-[50px]" />
              <p className="text-[25px] font-normal">PetVet-AI</p>
              <p className="text-[25px] font-normal">Login/Registration</p>
            </div>
            <div className=" flex justify-center items-center xl:p-8 gap-4">
              <form onSubmit={handleSubmit(handleSave)}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-light  mb-2 text-black"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@(gmail\.com|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                          message:
                            "Invaid Email Address must needed (@gmail.com)",
                        },
                      })}
                      className="ps-11 block h-[53px] w-[250px] xl:h-[55px] xl:w-[344px] rounded-[15px] border border-[rgb(218,218,218)] shadow-sm  text-sm focus:z-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="name@example.com"
                    />
                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                      <svg
                        className="shrink-0 size-4 text-gray-400 dark:text-neutral-600"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </svg>
                    </div>
                  </div>
                  {errors.email && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontWeight: "medium",
                        marginTop: "4px",
                      }}
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="xl:mt-6 mt-3 ">
                  <label
                    htmlFor="password"
                    className="block text-xs font-light mb-2 text-black"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={passShow ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message:
                            "Password must be at least 8 characters long",
                        },
                      })}
                      className="ps-11 block h-[53px] w-[250px] xl:h-[55px] xl:w-[344px] rounded-[15px] border border-[rgb(218,218,218)] shadow-sm  text-sm focus:z-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Your Password"
                    />
                    <div
                      className="absolute inset-y-0 end-0 flex items-center pe-4 cursor-pointer z-20"
                      onClick={passwordShow}
                    >
                      {passShow ? (
                        <FaEyeSlash size={18} color="gray" />
                      ) : (
                        <FaEye size={18} color="gray" />
                      )}
                    </div>
                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                      <svg
                        className="shrink-0 size-4 text-gray-500 dark:text-neutral-500"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"></path>
                        <circle cx="16.5" cy="7.5" r=".5"></circle>
                      </svg>
                    </div>
                  </div>
                  {errors.password && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontWeight: "medium",
                        marginTop: "4px",
                      }}
                    >
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <p
                  className="text-[12px] text-[#EC694E] mt-3 font-light cursor-pointer hover:text-[#EC694E] hover:underline hover:font-medium transition duration-300"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </p>
                <div className="flex justify-center mt-4">
                  {isloading ? (
                    <button
                      className="flex justify-center items-center font-normal text-white bg-customPurple-light cursor-not-allowed
                                   px-8 h-[50px] rounded-[16px] gap-[10px
                                   md:px-28 md:h-[60px] md:rounded-[20px]
                                   xl:h-[60px] xl:w-[330px] xl:rounded-[18px] "
                    >
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-customPurple-default hover:bg-customPurple-dark font-normal 
                                   px-8 h-[50px] rounded-[16px] gap-[10px] text-white
                                   md:px-28 md:h-[60px] md:rounded-[20px]
                                   xl:h-[60px] xl:w-[330px] xl:rounded-[18px]"
                    >
                      Login
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="flex justify-center items-center mt-6">
              <hr className="border-gray-200 w-28 xl:w-36" />
              <p className="text-center text-[11px] xl:text-[11px] text-black font-medium">
                Or use social
              </p>
              <hr className="border-gray-200 w-28 xl:w-36" />
            </div>

            <div className="flex ml-20 lg:ml-44 xl:ml-48 mt-7 gap-2">
              <button className="cursor-pointer bg-[rgb(241,240,249)] rounded-full h-[57px] w-[57px] flex justify-center items-center">
                <img src={googleLogo} className="w-[24px] h-[24px]" />
              </button>
              <button className="cursor-pointer bg-[rgb(241,240,249)] rounded-full h-[57px] w-[57px] flex justify-center items-center">
                <img src={facbookLogo} className="w-[24px] h-[24px]" />
              </button>
            </div>
          </div>

          <div className="flex justify-center mt-10  gap-1 xl:gap-1">
            <p className="text-[14px] font-light">Don't have an account?</p>
            <p
              className="text-[14px] font-light cursor-pointer hover:text-black hover:underline hover:font-medium transition duration-300"
              onClick={handleRegister}
            >
              Sign Up
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
