import React, { useState, useEffect } from "react";
import PetIcon from "../assets/Icon.svg";
import Button from "../Components/Button.jsx";
import ArrowIcon from "../assets/Group.svg";
import circleIcon from "../assets/Done.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { petTypes } from "../Utils/Api.js";

const SelectPet = ({ selectedAnimal, setSelectedAnimal, onContinue }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  // const [selectedAnimal, setSelectedAnimal] = useState("");
  const [petTypeOptions, setPetTypeOptions] = useState([]);

  useEffect(() => {
    const fetchAllAnimals = async () => {
      try {
        const animals = await petTypes();
        const petTypesList = animals.map((animal) => animal.petType);
        setPetTypeOptions(petTypesList);
      } catch (error) {
        console.error("Error fetching animals:", error);
      }
    };
    fetchAllAnimals();
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleSelectAnimal = (animalName) => {
    // getData(animalName);
    setSelectedAnimal(animalName);
    setDropdownVisible(false);
  };

  const handleContinue = () => {
    if (!selectedAnimal) {
      toast.error("Please select a pet type before continuing.", {
        autoClose: 2000,
      });
    } else {
      toast.success("Proceeding to the next step!", {
        autoClose: 2000,
      });
      onContinue();
    }
  };

  return (
    <div className="flex flex-col mt-4 xl:mt-5">
      <div className="px-6 py-10 gap-5 rounded-[35px] sm:px-20 sm:py-14 sm:gap-3 md:px-36 md:py-20 md:gap-5 xl:py-16 xl:gap-6 xl:w-[608px] xl:rounded-[50px] border relative  flex flex-col justify-center items-center border-[rgb(218,218,218)] ">
        <h1 className="text-[29px] md:text-[35px] xl:text-[32px] font-bold">
          Select Your Pet Type
        </h1>
        <p className="text-[14px] md:text-[15px] xl:text-[14px] text-[#737098] font-normal">
          This info helps PetVet be as specific as possible.
        </p>
        <img src={PetIcon} alt="Pet Icon" />

        <div className="relative flex flex-col justify-center items-center">
          <button
            type="button"
            onClick={toggleDropdown}
            className="flex items-center justify-center text-[#737098] border border-[#F1F0F9] focus:outline-none font-normal bg-white
            py-5 px-5 gap-6 text-[16px] rounded-[20px]
            md:py-5 md:px-6 md:gap-36
            xl:py-5 xl:px-6 xl:text-[16px]"
          >
            {selectedAnimal || "Select from List"}
            <svg
              className="w-2 h-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {dropdownVisible && (
            <div
              id="dropdownDivider"
              className="bg-white absolute border border-[#F1F0F9] shadow
              p-5 w-[280px] max-h-[330px] rounded-[20px] top-[69px] gap-14 overflow-auto 
              md:w-[320px] md:p-4  
              xl:rounded-[20px] xl:top-[70px] xl:max-h-[300px] xl:overflow-auto"
            >
              {petTypeOptions.map((name, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-5 text-[14px] md:text-[16px] font-medium text-black border rounded-2xl border-[#F1F0F9] focus:z-10 hover:border-red-500 hover:text-red-500 transition-all duration-300 ease-in-out cursor-pointer mb-3"
                  onClick={() => handleSelectAnimal(name)}
                >
                  {" "}
                  <img src={circleIcon} alt="Selected" />
                  {name}
                </div>
              ))}
            </div>
          )}
        </div>

        <Button
          text="Continue"
          icon={ArrowIcon}
          onClick={() => {
            handleContinue();
          }}
        />
      </div>
    </div>
  );
};

export default SelectPet;
