import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar.jsx";
import SideBar from "../../Components/SideBar.jsx";
import AppStoreImg from "../../assets/AppStore.svg";
import GoogleImg from "../../assets/GooglePlay.svg";
import HomeImg from "../../assets/home.png";
import PetLogo from "../../assets/Logo.png";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <>
      <div className="flex ">
        <div className="hidden lg:block">
          <SideBar />
        </div>
        {isOpen && (
          <div className=" fixed">
            <button
              type="button"
              onClick={handleOpen}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>

            <SideBar />
          </div>
        )}

        <div className="flex flex-col w-full p-2 xl:p-4 gap-2 ">
          <div className=" flex items-center w-full mx-auto gap-1 lg:hidden mt-2">
            <div className="text-center ">
              <button
                class="text-white bg-[#F1F0F9] hover:bg-[#B1AED3] font-medium rounded-[40px] text-sm px-6 py-6 mt-3 focus:outline-none"
                type="button"
                onClick={handleOpen}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  focusable="false"
                  class="chakra-icon css-1noa7xw w-8 h-8 text-[#8F4BF6]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                </svg>
              </button>
            </div>
            <Navbar />
          </div>

          <div className="hidden lg:block">
            <Navbar />
          </div>
          <div className=" border border-[#F1F0F9] flex flex-col gap-6 rounded-[20px] py-16 justify-center items-center">
            <div className="flex flex-col justify-center gap-5 items-center">
              <img
                src={PetLogo}
                className="w-[60px] h-auto xl:w-[60px] xl:h-auto mt-4"
              />
              <p className="text-[28px] xl:text-[32px] barlow-semibold">
                PetVet-AI
              </p>
              <p className="barlow-regular text-center text-[18px] px-5 xl:text-[20px] xl:max-w-[550px]">
                Discover Pet Vet - your pet's best friend. Our AI-backed app
                offers expert care and answers at your fingertips. Download now
                for top-tier pet health.
              </p>
            </div>

            <div className="lg:hidden flex gap-2">
              <button className="bg-[#8F4BF6] text-white p-2 rounded-[13px]">
                Chat with AI Vet
              </button>
              <button className="bg-[rgb(236,105,78)]  text-white p-2 rounded-[13px]">
                Chat with IRL Vet
              </button>
            </div>

            <img src={HomeImg} className="h-[244px] w-[254px]" />
            <p className="text-[24px] xl:text-[24px] barlow-bold-italic ">
              Download the App here!
            </p>
            <div className="flex justify-center gap-2 cursor-pointer">
              <img
                src={AppStoreImg}
                className="h-[50px] w-[160px] xl:h-[60px] xl:w-[200px]"
              />
              <img
                src={GoogleImg}
                className="h-[50px] w-[160px] xl:h-[60px] xl:w-[200px]"
              />
            </div>
          </div>
          <div className="flex xl:justify-between text-[#737098] text-[12px] barlow-regular mt-1 justify-center gap-10 items-center xl:mt-7">
            <p>© 2023 PetVet</p>
            <div className="flex gap-2 cursor-pointer">
              <p>Blog</p>
              <p>•</p>
              <p>Privacy</p>
              <p>•</p>
              <p>Terms Of Services</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
