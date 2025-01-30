import React, { useEffect, useState } from "react";
import PetIcon from "../assets/Icon.svg";
import Button from "../Components/Button.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getBreedType } from "../Utils/Api.js";

const PetBreed = ({
  selectedAnimal,
  selectedBreed,
  setSelectedBreed,
  onContinue,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  // const [selectedBreed, setSelectedBreed] = useState("");
  const [breeds, setBreeds] = useState([]);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const getBreedDetails = async () => {
    // console.log("clicked");
    try {
      const allBreeds = await getBreedType(selectedAnimal);
      // console.log("all breedsss type", allBreeds);
      const breedTypes = allBreeds.map((breed) => breed.name);
      // console.log("-------->", breedTypes);
      setBreeds(breedTypes);
    } catch (error) {
      console.error("Error fetching breed details:", error);
    }
  };

  // console.log("oppop", breeds);

  const handleSelectBreed = (animalBreed) => {
    setSelectedBreed(animalBreed);
    setDropdownVisible(false);
  };

  const handleContinue = () => {
    if (!selectedBreed) {
      toast.error("Please select a breed before continuing.");
    } else {
      toast.success(`Selected Breed: ${selectedBreed}`);
      // setBreed(selectedBreed);
      console.log("oooo", selectedBreed);
      onContinue();
    }
  };

  return (
    <div className="flex flex-col items-center mt-3 gap-6">
      <div className="border relative flex flex-col justify-center items-center py-12 gap-6 sm:py-16 sm:gap-7 md:py-16 md:gap-10 border-[rgb(218,218,218)] w-[350px] sm:w-[480px] md:w-[600px] xl:w-[608px] rounded-[50px]">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[32px]  font-medium">
            What Breed of {selectedAnimal}?
          </h1>
          <p className="text-[14px] text-center px-10 md:px-36 md:text-[15px] lg:px-28 text-[#737098] font-normal">
            Select your breed: If unknown, select 'Mixed Breed/Shelter Pet'. If
            mixed, select whatever breed is the most present.
          </p>
        </div>
        <div className="relative flex flex-col justify-center items-center">
          <button
            onClick={() => {
              getBreedDetails();
              toggleDropdown();
            }}
            className="flex items-center justify-center text-[#737098] border border-[#F1F0F9] focus:outline-none font-normal bg-white
            py-5 px-5 gap-6 text-[16px] rounded-[20px]
            md:py-5 md:px-6 md:gap-36
            xl:py-5 xl:px-6 xl:text-[16px]"
          >
            {selectedBreed || "Select from List"}
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
              onClick={getBreedDetails}
              className="bg-white absolute border border-[#F1F0F9] shadow
              p-5 w-[280px] max-h-[330px] rounded-[20px] top-[69px] gap-14 overflow-auto 
              md:w-[320px] md:p-4
              xl:rounded-[20px] xl:top-[70px] xl:max-h-[300px] xl:overflow-auto"
            >
              {Array.isArray(breeds) && breeds.length > 0 ? (
                breeds.map((name, index) => (
                  <div
                    key={index}
                    className="flex gap-3 px-4 py-6 text-[16px] font-medium text-black border rounded-2xl border-[#F1F0F9] focus:z-10 hover:border-red-500 hover:text-red-500 transition-all duration-300 ease-in-out cursor-pointer mb-3"
                    onClick={() => handleSelectBreed(name)}
                  >
                    {name}
                  </div>
                ))
              ) : (
                <p className="text-center text-[#737098]">Waiting for breeds</p>
              )}
            </div>
          )}
        </div>
        <Button text="Continue" onClick={handleContinue} />
      </div>
    </div>
  );
};

export default PetBreed;
