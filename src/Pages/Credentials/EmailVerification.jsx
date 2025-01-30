import React, { useState } from "react";
import Carousel from "../../Components/Carousel.jsx";
import Img from "../../assets/Send.svg";
import Button from "../../Components/Button.jsx";
import { useNavigate } from "react-router-dom";
import { OtpVerification } from "../../Utils/Api.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmailVerification = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (value, index) => {
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      toast.error("Please enter a 6-digit OTP.");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      await OtpVerification(enteredOtp);
      alert("OTP verified successfully!");
      navigate("/register");
    } catch (error) {
      setError(
        error.message || "Something went wrong. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  function handleClick() {
    navigate("/Finish");
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-10 lg:items-center">
      <Carousel />
      <div className="mx-auto mt-10">
        <div className="border border-[rgb(218,218,218)] p-3 lg:w-[450px] xl:w-[630px] xl:py-16 rounded-[50px]">
          <div className="flex flex-col justify-center items-center gap-6">
            <img src={Img} />
            <div className="flex flex-col justify-center items-center gap-3">
              <p className="text-[23px] font-medium">Email Verification</p>
              <p className="text-[#737098] font-sans tracking-normal font-normal text-[12px] xl:text-[14px]">
                A code was sent to example@gmail.com
              </p>
              <p
                className="text-[#737098] font-sans tracking-normal font-normal text-[13px] cursor-pointer hover:text-[#737098] hover:underline hover:font-medium transition duration-300"
                onClick={handleClick}
              >
                Change Email
              </p>
            </div>
            <div className="flex gap-x-3" data-hs-pin-input="">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInputChange(e.target.value, index)}
                  className="pin-input block w-[35px] h-[35px] rounded-[16px] xl:w-[55px] xl:h-[57px] xl:rounded-2xl text-center border border-gray-200 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="○"
                />
              ))}
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <Button text="Verify" onClick={handleVerify} />
            </div>
            <div className="flex gap-1">
              <p className="font-Barlow font-light tracking-normal text-[14px] font-sans">
                Didn't receive a code?
              </p>
              <p className="font-Barlow font-light tracking-normal text-[14px] font-sans cursor-pointer hover:text-black hover:underline hover:font-medium transition duration-300">
                {" "}
                Resend
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10 gap-1">
          <p className="text-[14px] font-light">Need Help?</p>
          <p className="text-[14px] font-light cursor-pointer hover:text-black hover:underline hover:font-medium transition duration-300">
            Contact Support
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
