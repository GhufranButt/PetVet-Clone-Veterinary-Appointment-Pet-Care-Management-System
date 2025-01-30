import React, { useState, useEffect } from "react";
import Button from "../Components/Button.jsx";
import ArrowIcon from "../assets/Group.svg";
import Img from "../assets/Img.svg";
import { useForm } from "react-hook-form";

const PetInfo = ({ onContinue, petData, setPetData }) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (errors.name || errors.age) {
      const timer = setTimeout(() => {
        clearErrors(["name", "age"]);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [errors.name, errors.age, clearErrors]);

  const handleContinue = handleSubmit((data) => {
    setPetData({
      name: data.name,
      age: data.age,
    });

    // getData();

    onContinue();
  });
  useEffect(() => {
    if (petData) {
      setValue("name", petData.name);
      setValue("age", petData.age);
    }
  }, [petData]);
  console.log("petData in pet info", petData);

  return (
    <form
      onSubmit={handleContinue}
      className="flex flex-col items-center mt-3 gap-6"
    >
      <div className="border relative flex flex-col justify-center items-center py-6 gap-4 sm:py-8 sm:gap-7 md:py-12 md:gap-8 border-[rgb(218,218,218)] w-[350px] sm:w-[450px] md:w-[600px] xl:w-[608px] rounded-[50px]">
        <h1 className="text-[25px] md:text-[35px]  font-bold">
          Information About Pet
        </h1>
        <p className="text-[14px] text-[#737098] font-normal">
          This info helps PetVet be as specific as possible.
        </p>
        <img src={Img} alt="Pet Icon" />

        <div className=" flex flex-col items-center justify-center gap-5">
          <div>
            <input
              id="name"
              type="text"
              {...register("name", {
                required: "Name is required",
              })}
              placeholder="Enter Name"
              className="ps-5 block px-8 py-5 md:px-28 md:ps-3 md:placeholder:text-left rounded-[20px] placeholder:text-[16px] border border-[rgb(218,218,218)] shadow-sm  text-sm focus:z-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.name && (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  fontWeight: "medium",
                  marginTop: "4px",
                }}
              >
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <input
              id="age"
              type="text"
              {...register("age", {
                valueAsNumber: true,
                required: "Age is required",
              })}
              placeholder="Enter Age"
              className="ps-5 block px-8 py-5 md:px-28 md:ps-3 rounded-[20px] placeholder:text-[16px] border border-[rgb(218,218,218)] shadow-sm  text-sm focus:z-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.age && (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  fontWeight: "medium",
                  marginTop: "4px",
                }}
              >
                {errors.age.message}
              </p>
            )}
          </div>
        </div>

        <Button
          text="Continue"
          type="submit"
          icon={ArrowIcon}
          onClick={handleContinue}
        />
      </div>
    </form>
  );
};

export default PetInfo;
