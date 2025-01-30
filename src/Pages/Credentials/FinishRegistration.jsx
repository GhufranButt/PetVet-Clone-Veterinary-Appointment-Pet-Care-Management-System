import React, { useEffect, useState } from "react";
import Carousel from "../../Components/Carousel.jsx";
import PhoneInput from "react-phone-number-input";
import Button from "../../Components/Button.jsx";
import { Link, useNavigate } from "react-router-dom";
import crossLogo from "../../assets/Requirement_1.svg";
import "react-phone-number-input/style.css";
import { useForm } from "react-hook-form";
import { Finishregistration } from "../../Utils/Api.js";

const FinishRegistration = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();

  const handleSave = (data) => {
    localStorage.setItem("email", data.email);
  };

  const navigate = useNavigate();
  const [phoneValue, setPhoneValue] = useState("");

  function handleCliclk() {
    navigate("/login");
  }

  useEffect(() => {
    if (errors.email || errors.password) {
      const timer = setTimeout(() => {
        if (errors.email) clearErrors("email");
        if (errors.password) clearErrors("password");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [errors.email, errors.password, clearErrors]);

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-10 lg:items-center">
      <Carousel />
      <div className="mx-auto mt-10 lg:p-10 xl:p-12">
        <div className="border border-[rgb(218,218,218)] w-[350px] lg:w-[400px] xl:w-[600px] xl:p-16 rounded-[50px]">
          <div className="flex flex-col justify-center items-center p-2 gap-2">
            <p className="text-[24px] font-medium">Finish Registration</p>
            <p className="text-[#737098] font-Barlow font-normal text-[13px]">
              Enter the details below to complete your registration
            </p>
            <form onSubmit={handleSubmit(handleSave)}>
              <div className="mt-4">
                <label className="block text-xs font-light mb-2 text-black">
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                        message:
                          "Invaid Email Address must needed (@gmail.com)",
                      },
                    })}
                    className="ps-11 block h-[53px] w-[270px] xl:h-[55px] xl:w-[394px] rounded-[15px] border border-[rgb(218,218,218)] shadow-sm  text-sm focus:z-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
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
              <div className="mt-3">
                <label className="block text-xs font-light mb-2 text-black">
                  Phone Number
                </label>
                <PhoneInput
                  id="phoneNumber"
                  type="phoneNumber"
                  {...register("phoneNumber", {
                    required: "Phone Number is required",
                    pattern: {
                      value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                      message: "Please enter your phone number",
                    },
                  })}
                  placeholder="(xxx)xxx-xx-xx"
                  value={phoneValue}
                  onChange={setPhoneValue}
                  className="block h-[53px] w-[270px] xl:h-[55px] xl:w-[394px] rounded-[15px] border px-3 border-[rgb(218,218,218)] shadow-sm text-sm focus:z-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
                />
              </div>
              <div className="flex flex-col items-center">
                <div className="mt-3">
                  <label className="block text-xs font-light mb-2 text-black">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message:
                            "Password must be at least 8 characters long",
                        },
                      })}
                      className="py-3 px-4 ps-11 block h-[53px] w-[270px] xl:h-[55px] xl:w-[394px] rounded-[15px] border border-[rgb(218,218,218)] shadow-sm  text-sm focus:z-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Your Password"
                    />
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
                  <div className="flex gap-2 mt-3">
                    <img src={crossLogo} alt="" />
                    <p className="text-[#737098] font-sans tracking-normal font-normal text-[11px]">
                      At least 8 characters
                    </p>
                  </div>

                  <div className="flex gap-2 mt-1">
                    <img src={crossLogo} alt="" />

                    <p className="text-[#737098] font-sans tracking-normal font-normal text-[11px]">
                      Both uppercase and lowercase letters (optional)
                    </p>
                  </div>
                  <div className="flex gap-2 mt-1 ">
                    <img src={crossLogo} alt="" />

                    <p className="text-[#737098] font-sans tracking-normal font-normal text-[11px]">
                      At least one number or symbol (optional)
                    </p>
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

                <div className="mt-2">
                  <Button text="Register" />
                </div>
              </div>
            </form>
            <div className="flex gap-1 mt-4 justify-center items-center">
              <p className="text-black font-sans tracking-normal font-light text-[14px]">
                By selection
              </p>
              <p className="text-black font-sans tracking-normal font-medium text-[16px]">
                Register
              </p>
              <p className="text-black font-sans tracking-normal font-light text-[14px]">
                you agree to our
              </p>
            </div>
            <div className="flex gap-1">
              <Link
                to="/TermsServices"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#737098] font-sans tracking-normal font-normal text-[14px] cursor-pointer hover:text-[#737098] hover:underline hover:font-medium transition duration-300"
              >
                Terms of Service
              </Link>
              <p className="font-Barlow font-normal text-[13px] font-sans ">
                and
              </p>
              <Link
                to="/PrivacyPolicy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#737098] font-sans tracking-normal font-normal text-[14px] cursor-pointer hover:text-[#737098] hover:underline hover:font-medium transition duration-300"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-14 gap-1">
          <p className="text-[14px] font-light">Already have an account?</p>
          <p
            className="text-[14px] font-light cursor-pointer hover:text-black hover:underline hover:font-medium transition duration-300"
            onClick={handleCliclk}
          >
            Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinishRegistration;
