import React from "react";
import BlackPlusImg from "../assets/Black_Plus.svg";
import LogoutImg from "../assets/login-ogout.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const goToAddPet = () => {
    navigate("/AddPet");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-[#F1F0F9] items-center px-[15px] w-full py-4 rounded-[50px] xl:rounded-[50px] xl:py-4">
      <div className="flex justify-between gap-[80px]">
        <div>
          <button
            className="border border-[#B1AED3] flex items-center justify-center  hover:bg-[#E5E4F9] lg:hidden
          h-[60px] w-[100px] gap-2 rounded-[44px]
           md:h-[60px] md:w-[130px] md:rounded-[88px]"
          >
            <img src={BlackPlusImg} className="w-3 h-3" />
            <span
              onClick={goToAddPet}
              className="text-[13px] md:text-[16px] barlow-semibold text-[#272655]"
            >
              New pet
            </span>
          </button>

          <button className="hidden lg:flex border border-[#B1AED3] items-center justify-center rounded-[30px] text-[4px] lg:px-6 lg:py-4 lg:rounded-[45px] xl:px-6 xl:py-4 xl:rounded-[35px] xl:gap-2 hover:bg-[#E5E4F9]">
            <img src={BlackPlusImg} className="w-3 h-3" />
            <span
              onClick={goToAddPet}
              className="text-[16px] barlow-semibold text-[#272655]"
            >
              Add new Pet
            </span>
          </button>
        </div>

        <div className="flex gap-8 items-center justify-center">
          <button className="hidden  lg:flex barlow-semibold text-[24px] tracking-tight text-[#272655]">
            FAQs
          </button>
          <button className="hidden lg:flex bg-[#8F4BF6] items-center justify-center px-5 gap-2 h-[50px] rounded-[18px] hover:bg-purple-900">
            <img src={LogoutImg} className="w-6 h-6" />
            <p
              onClick={handleLogout}
              className="text-[16px] text-[#FFFFFF] barlow-semibold"
            >
              Log Out
            </p>
          </button>

          <button
            className="bg-[#6b46c1] flex items-center lg:hidden justify-center h-[48px] w-[55px] rounded-[20px] hover:bg-purple-900"
            onClick={handleLogout}
          >
            <img src={LogoutImg} className="w-[24px] h-[24px]" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
