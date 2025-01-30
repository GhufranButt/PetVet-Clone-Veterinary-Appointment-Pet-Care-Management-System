import React, { useState } from "react";
import leftArrow from "../../assets/leftArrow.svg";
import CrossImg from "../../assets/Crossimg.svg";
import SelectPet from "../../Components/SelectPet.jsx";
import PetBreed from "../../Components/PetBreed.jsx";
import PetInfo from "../../Components/PetInfo.jsx";
import ImageUpload from "../../Components/ImageUpload.jsx";
import { useNavigate } from "react-router-dom";

const AddPet = () => {
  const navigate = useNavigate();

  const handleMoveToHomePage = () => {
    navigate("/HomePage");
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [passAnimalName, setPassAnimalName] = useState("");
  const [petData, setPetData] = useState({ name: "", age: "" });
  const [petBreed, setPetBreed] = useState("");

  const totalSteps = 4;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(() => currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex flex-col items-center mt-4 xl:mt-3 xl:gap-3">
      <div className="flex gap-[240px] sm:gap-[350px] md:gap-[480px] xl:gap-[500px]">
        <button
          onClick={handleBack}
          className={`border py-3 px-4 rounded-[80px] xl:py-3 xl:px-4 xl:rounded-[80px] border-[rgb(218,218,218)] ${
            currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentStep === 1}
        >
          <img src={leftArrow} alt="Back" className="h-[15px] w-[15px]" />
        </button>
        <button
          onClick={handleMoveToHomePage}
          className="border py-3 px-3 rounded-[80px] xl:py-3 xl:px-3 xl:rounded-[80px] border-[rgb(218,218,218)]"
        >
          <img src={CrossImg} alt="Close" />
        </button>
      </div>

      <div className="flex flex-col items-center gap-3 xl:gap-4">
        <div className="px-6 py-2 text-[16px] rounded-[20px] xl:px-6 xl:py-2 xl:rounded-[20px] bg-green-50 xl:text-[16px] font-normal tracking-tighter text-[#2FAF62]">
          STEP {currentStep} OF {totalSteps}
        </div>
        <div className="w-[130px] h-[4px] rounded-3xl md:w-[350px] xl:w-[400px] xl:h-[4px] xl:rounded-3xl bg-[#e2e8f0]">
          <div
            className="h-[4px] xl:h-[4px] rounded-3xl xl:rounded-3xl bg-[#2FAF62]"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {currentStep === 1 && (
        <SelectPet
          selectedAnimal={passAnimalName}
          setSelectedAnimal={setPassAnimalName}
          onContinue={handleNext}
        />
      )}
      {currentStep === 2 && (
        <PetBreed
          selectedBreed={petBreed}
          setSelectedBreed={setPetBreed}
          selectedAnimal={passAnimalName}
          setSelectedAnimal={setPassAnimalName}
          onContinue={handleNext}
        />
      )}
      {currentStep === 3 && (
        <PetInfo
          petData={petData}
          setPetData={setPetData}
          onContinue={handleNext}
        />
      )}
      {currentStep === 4 && (
        <ImageUpload
          petData={petData}
          passAnimalName={passAnimalName}
          petBreed={petBreed}
        />
      )}
    </div>
  );
};

export default AddPet;
