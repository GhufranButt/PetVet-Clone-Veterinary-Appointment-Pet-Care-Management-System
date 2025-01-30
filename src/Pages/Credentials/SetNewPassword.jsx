import React, { useState, useEffect } from "react";
import Carousel from "../../Components/Carousel.jsx";
import sendMessagesImg from "../../assets/Send messages.svg";
import Button from "../../Components/Button.jsx";
import { useForm } from "react-hook-form";
import crossLogo from "../../assets/Requirement_1.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SetNewPassword = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [passShow, setPassShow] = useState(false);

  const passwordShow = () => {
    setPassShow(!passShow);
  };
  const [conPassShow, setConPassShow] = useState(false);
  const confirmedPasswordShow = () => {
    setConPassShow(!conPassShow);
  };

  useEffect(() => {
    if (errors.password || errors.setpassword) {
      const timer = setTimeout(() => {
        clearErrors(["password", "setpassword"]);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [errors.password, errors.setpassword, clearErrors]);

  const handleSave = (data) => {
    if (data.password !== data.setpassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password successfully set!");
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-10 lg:items-center">
      <Carousel />

      <div className="mx-auto mt-10 xl:mt-24">
        <div className="border flex flex-col items-center justify-center border-[rgb(218,218,218)] w-[350px] p-4 gap-7 lg:w-[500px] xl:w-[608px] xl:p-20 xl:gap-10 rounded-[50px]">
          <div className="flex flex-col justify-center items-center xl:gap-6">
            <img src={sendMessagesImg} alt="" />
            <p className="text-[24px] font-medium">Set New Password</p>
          </div>
          <form onSubmit={handleSubmit(handleSave)}>
            <div className="flex flex-col items-center gap-6">
              <div className="">
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
                        message: "Password must be at least 8 characters long",
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
              </div>
              <div className="">
                <label
                  htmlFor="setpassword"
                  className="block text-xs font-light mb-2 text-black"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="setpassword"
                    type={conPassShow ? "text" : "password"}
                    {...register("setpassword", {
                      required: "Confirm password is required",
                      minLength: {
                        value: 8,
                        message:
                          "Confirm password must be at least 8 characters long",
                      },
                    })}
                    className="ps-11 block h-[53px] w-[250px] xl:h-[55px] xl:w-[344px] rounded-[15px] border border-[rgb(218,218,218)] shadow-sm  text-sm focus:z-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="Confirm Password"
                  />
                  <div
                    className="absolute inset-y-0 end-0 flex items-center pe-4 cursor-pointer h-[50px] z-20"
                    onClick={confirmedPasswordShow}
                  >
                    {conPassShow ? (
                      <FaEyeSlash size={18} color="gray" />
                    ) : (
                      <FaEye size={18} color="gray" />
                    )}
                  </div>
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4 h-[50px]">
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
                  <div className="flex gap-2 mt-5">
                    <img src={crossLogo} alt="" />
                    <p className="text-[#737098] font-sans tracking-normal font-normal text-[11px]">
                      At least 8 characters
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <Button text="Submit" type="submit" />
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
            {errors.setpassword && (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  fontWeight: "medium",
                  marginTop: "4px",
                }}
              >
                {errors.setpassword.message}
              </p>
            )}
          </form>
        </div>
        <div className="flex justify-center mt-9 gap-1">
          <p className="text-[14px] font-light">Need Help?</p>
          <p className="text-[14px] font-light cursor-pointer hover:text-black hover:underline hover:font-medium transition duration-300">
            Contact Support
          </p>
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;
