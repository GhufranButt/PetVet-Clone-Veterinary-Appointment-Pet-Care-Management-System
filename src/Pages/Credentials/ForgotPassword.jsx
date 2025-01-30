import React from "react";
import Carousel from "../../Components/Carousel.jsx";
import sendMessagesImg from "../../assets/Send messages.svg";
import Button from "../../Components/Button.jsx";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { ForgetPassword } from "../../Utils/Api.js";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();

  const handleSave = async (data) => {
    try {
      const result = await ForgetPassword(data.email);
      console.log("result", result);
      alert("Registration successful!");
      navigate("/Email");
    } catch (error) {
      console.error("Request Error:", error);
      alert(error.message || "Something went wrong. Please try again later.");
    } finally {
    }
  };

  useEffect(() => {
    if (errors.email) {
      const timer = setTimeout(() => {
        clearErrors("email");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [errors.email, clearErrors]);

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-10 lg:items-center">
      <Carousel />

      <div className="mx-auto mt-10 xl:mt-14">
        <div className="border flex flex-col items-center justify-center border-[rgb(218,218,218)] w-[350px] p-4 gap-7 lg:w-[500px] xl:w-[640px] xl:p-20 xl:gap-10 rounded-[50px]">
          <div className="flex flex-col justify-center items-center xl:gap-4">
            <img src={sendMessagesImg} alt="" />

            <p className="text-[24px] font-medium">Forgot Password?</p>

            <p className="text-[12px] xl:text-[14px] font-normal text-[#737098]">
              Enter email address that you enter when registering
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSave)}>
            <div className="flex flex-col items-center gap-4">
              <div>
                <label className="block text-xs font-light  mb-2 text-black">
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
                    className="py-3 px-4 ps-11 block h-[53px] w-[300px] xl:h-[55px] xl:w-[354px] rounded-[15px] border border-[rgb(218,218,218)] shadow-sm  text-sm focus:z-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
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
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
              <div>
                <Button
                  text="Recover Password"
                  type="submit"
                  onClick={handleSave}
                />
              </div>
            </div>
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

export default ForgotPassword;
