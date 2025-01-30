import React, { useState, useEffect } from "react";
import PetLogo from "../assets/Logo.png";
import OrangeButton from "../assets/OranButton.svg";
import PurplrButton from "../assets/PurplrButton.svg";
import Arrow from "../assets/Arrow.svg";
import DownArrow from "../assets/arrow-down.svg";
import PetFoot from "../assets/Petfoot.svg";
import { listOfPets } from "../Utils/Api.js";
import UploaderImg from "../assets/Uploader.svg";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const [petList, setPetList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const userId = localStorage.getItem("userId");
  // console.log("user Id in Home page", userId);

  const fetchPetList = async () => {
    try {
      const response = await listOfPets(userId);
      setPetList(response.data);
      // console.log("Response in HomePage:", response);
    } catch (error) {
      console.error("Error fetching pet list: ", error.message);
    }
  };

  const drivetoHomePage = () => {
    navigate("/homepage");
  };

  const togglePetList = () => {
    setIsOpen((prev) => !prev);
  };

  const handlePetClick = (pet) => {
    navigate("/editpet", { state: pet });
  };

  useEffect(() => {
    fetchPetList();
  }, []);

  return (
    <div className="h-screen w-[315px] bg-[#F1F0F9] overflow-auto">
      <div className="flex flex-col px-5 py-10 gap-4 ">
        <div
          onClick={drivetoHomePage}
          className="flex gap-2 items-center cursor-pointer xl:mt-12 xl:mb-16 xl:pl-2"
        >
          <img
            src={PetLogo}
            className="w-[50px] h-[30px]"
            alt="PetVet-AI Logo"
          />
          <p className="text-[16px] barlow-semibold text-[rgb(39,38,85)]">
            PetVet-AI
          </p>
        </div>

        <div className="mb-6">
          <button className="flex justify-center gap-4 items-center cursor-pointer rounded-[56px] hover:bg-[#cbd5e0] px-3 py-4 mb-3">
            <img src={PurplrButton} alt="Purple Button" />
            <div className="flex items-center text-left">
              <div className="text-[rgb(39,38,85)]">
                <p className="barlow-semibold">Chat With AI Vet</p>
                <p className="barlow-regular text-[14px]">
                  Get helpful advice (free)
                </p>
              </div>
              <img src={Arrow} className="w-10 h-10" alt="Arrow" />
            </div>
          </button>

          <button className="flex justify-center gap-2.5 items-center cursor-pointer rounded-[56px] hover:bg-[#cbd5e0] px-3 py-4">
            <img src={OrangeButton} alt="Orange Button" />
            <div className="flex items-center text-left">
              <div className="text-[rgb(39,38,85)]">
                <p className="barlow-semibold">Chat With IRL Vet</p>
                <p className="barlow-regular text-[14px]">
                  Professional Medical advice (Paid)
                </p>
              </div>
              <img src={Arrow} className="w-10 h-10" alt="Arrow" />
            </div>
          </button>
        </div>

        <div>
          <div className="border-b border-[#E5E4F9] mb-3"></div>

          <div className="flex justify-center items-center">
            <button onClick={togglePetList} className="w-full">
              <div className="flex items-center gap-8 rounded-[56px] hover:bg-[#cbd5e0] px-4 py-4">
                <img src={PetFoot} alt="Pet Foot" />
                <p className="text-[rgb(39,38,85)]">My Pets</p>
                <img
                  src={DownArrow}
                  className={`w-4 h-4 xl:ml-10 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  alt="Toggle Arrow"
                />
              </div>
            </button>
          </div>

          {isOpen && (
            <div className="mt-3 max-h-52 flex flex-col w-full items-end overflow-auto">
              {petList.length > 0 ? (
                petList.map((pet) => (
                  <div
                    key={pet._id}
                    onClick={() => {
                      handlePetClick(pet);
                      setIsOpen(false);
                    }}
                    className="flex justify-start items-center gap-2 p-4 border  hover:bg-[#cbd5e0] w-[182px] h-[52px] hover:text-[#fff] border-[#e5e4f9] rounded-[59px] cursor-pointer bg-[#e6f0fa] shadow-md mb-2"
                  >
                    <img
                      src={pet.petImage || UploaderImg}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold text-[15px]">{pet.petName}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No pets available</p>
              )}
            </div>
          )}

          <div className="border-b border-[#E5E4F9] mt-3"></div>
        </div>

        <div className="flex flex-col items-start gap-2 xl:mt-40">
          <button className="flex flex-col items-center px-5 py-2 rounded-[28px] bg-[rgb(236,105,78)] hover:bg-[rgb(253,82,27)] cursor-pointer">
            <p className="text-[16px] text-[#e2e8f0] barlow-semibold">
              Pet RX Card
            </p>
            <p className="text-[15px] text-[#e2e8f0] barlow-regular">
              (Free-Sav up to 97% off pet meds)
            </p>
          </button>

          <button className="flex flex-col items-center px-8 py-2 rounded-[28px] barlow-semibold bg-[rgb(236,105,78)] hover:bg-[rgb(253,82,27)] cursor-pointer">
            <p className="text-[16px] text-[#e2e8f0] barlow-semibold">
              Pet Insurance Quotes
            </p>
            <p className="text-[15px] text-[#e2e8f0] barlow-regular">
              (Get competitive quotes fast)
            </p>
          </button>
          <p className="text-[#272655] text-[16px] barlow-semibold mt-2 lg:hidden cursor-pointer">
            FAQs
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
