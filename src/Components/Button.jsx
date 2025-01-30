import React from "react";

const Button = ({ text, type, icon, disabled, onClick }) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`font-normal 
           px-8 h-[50px] rounded-[16px] gap-[10px] text-white
           md:px-28 md:h-[60px] md:rounded-[20px]
           xl:h-[60px] xl:px-10 xl:w-[330px] xl:rounded-[18px]  ${
             disabled
               ? "bg-customPurple-light cursor-not-allowed"
               : "bg-customPurple-default hover:bg-customPurple-dark"
           }`}
    >
      <div className="flex gap-1 justify-center items-center">
        <span>{text}</span>
        {icon && <img src={icon} alt="Arrow Icon" className="w-4 h-4" />}
      </div>
    </button>
  );
};

export default Button;
