import React, { useEffect, useState } from "react";
import Button from "../../Components/Button.jsx";
import logoImg from "../../assets/Logo.png";
import Carousel from "../../Components/Carousel.jsx";
import { Link, useNavigate } from "react-router-dom";
import facbookLogo from "../../assets/facebook.svg";
import googleLogo from "../../assets/google.svg";
import { useForm } from "react-hook-form";
import { registerUser } from "../../Utils/Api.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => setChecked(!checked);

  const handleSave = async (data) => {
    try {
      const result = await registerUser(data.email);
      console.log("----->", result);
      localStorage.setItem("email", data.email);
      navigate("/Email");
    } catch (error) {
      console.error("Request Error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
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

  const handleCliclk = () => {
    navigate("/login");
  };

  return (
    <div className=" flex flex-col-reverse lg:flex-row gap-10 lg:items-center ">
      <Carousel />

      <div className="mx-auto xl:mt-0 mt-9">
        <div
          className="flex flex-col items-center p-3 gap-5 border mx-auto border-[rgb(218,218,218)] w-[350px] rounded-[40px]
             lg:w-[530px] xl:w-[675px] xl:mt-5 xl:rounded-[50px] xl:p-16"
        >
          <div className="flex flex-col items-center gap-4 xl:gap-4">
            <img src={logoImg} className="w-[80px] h-[50px]" alt="Logo" />
            <p className="text-[24px] font-medium">PetVet-AI</p>
            <p className="text-[24px] font-medium">Create an Account👨‍💻</p>
            <p className="text-[#737098] font-Barlow font-normal text-[13px]">
              Let's go through a few simple steps
            </p>
          </div>
          <form
            className="flex flex-col justify-center items-center gap-3"
            onSubmit={handleSubmit(handleSave)}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-light mb-2 text-black"
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
                      message: "Invalid Email Address (must be @gmail.com)",
                    },
                  })}
                  className="ps-11 text-sm block h-[53px] w-[300px] xl:h-[55px] xl:w-[394px] rounded-[15px] border border-[rgb(218,218,218)] shadow-sm focus:z-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="name@example.com"
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                  <svg
                    className="shrink-0 size-4 text-gray-400"
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

            <div className="flex justify-center gap-1 mt-4">
              <input
                type="checkbox"
                className="shrink-0 mt-0.5 border-gray-200 rounded cursor-pointer"
                id="hs-checked-checkbox"
                checked={checked}
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor="hs-checked-checkbox"
                className="text-[10px] xl:text-[14px] text-black font-light font-sans"
              >
                I Confirm I've Read and Agree to
              </label>

              <Link
                to="/TermsServices"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#737098] text-[10px] xl:text-[14px] font-sans tracking-tight items-center font-normal cursor-pointer hover:underline"
              >
                Terms of Service
              </Link>
              <p className="font-Barlow font-normal text-[10px] xl:text-[14px] items-center font-sans ">
                and
              </p>
              <Link
                to="/PrivacyPolicy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#737098] text-[10px] xl:text-[14px] font-sans items-center tracking-tight font-normal cursor-pointer hover:underline"
              >
                Privacy Policy
              </Link>
            </div>

            <Button text="Register" type="submit" disabled={!checked} />
          </form>

          <div className="flex justify-center items-center gap-1">
            <hr className="border-gray-200 w-28 xl:w-36" />
            <p className="text-center text-[11px] xl:text-[11px] text-black font-medium">
              Or use social
            </p>
            <hr className="border-gray-200 w-28 xl:w-36" />
          </div>
          <div className="flex gap-2 mt-4">
            <button className="cursor-pointer bg-[rgb(241,240,249)] rounded-full px-[17px] py-[17px] flex justify-center items-center">
              <img
                src={googleLogo}
                className="w-[24px] h-[24px]"
                alt="Google"
              />
            </button>
            <button className="cursor-pointer bg-[rgb(241,240,249)] rounded-full px-[17px] py-[17px] flex justify-center items-center">
              <img
                src={facbookLogo}
                className="w-[24px] h-[24px]"
                alt="Facebook"
              />
            </button>
          </div>
        </div>

        <div className="flex justify-center xl:mt-9 mt-9 gap-1">
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

export default Register;
