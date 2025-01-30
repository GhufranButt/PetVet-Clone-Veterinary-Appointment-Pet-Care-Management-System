import React, { useState, useEffect } from "react";
import firstImg from "../assets/Group 1.svg";
import secondImg from "../assets/Group2.svg";
import thirdImg from "../assets/Group3.svg";

const images = [firstImg, secondImg, thirdImg];

const text = [
  "I'm very pleased with the answer and appreciate the help. I'll be sure to Tell everyone about your site! Thank you.",
  "I needed a timely answer for my pup and PetVet was absolutely amazing. Thank you so much.",
  "It is incredible that this resource is free. I needed help and got it - all in less than 1 minute. Thank You So Much!!",
];

const name = ["Jan R", "Mike B", "Trisha M"];

const CarouselDefault = () => {
  const [curr, setCurr] = useState(0);

  const autoSlide = true;
  const autoSlideInterval = 2000;

  const next = () =>
    setCurr((curr) => (curr === images.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [curr, autoSlide]);

  return (
    <div className="flex flex-col justify-center items-center bg-[#F1F0F9] h-auto py-16 w-screen lg:w-[420px] lg:h-screen xl:h-screen xl:w-[544px] gap-7 overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${curr * 100}%)`,
        }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex flex-col justify-center items-center w-full"
          >
            <img
              src={img}
              className="w-[310px] h-[310px] xl:w-[327] xl:h-[317]"
            />
            <div className="text-[14px] xl:text-[15px] font-light mt-4 text-center max-w-[280px] xl:max-w-[400px]">
              {text[curr]}
            </div>
            {/* svg stars* */}
            <div className="flex justify-center gap-2 mt-3">
              <svg
                strokeWidth="0"
                viewBox="0 0 32 32"
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-yellow-600 fill-yellow-500"
              >
                <path d="M 30.335938 12.546875 L 20.164063 11.472656 L 16 2.132813 L 11.835938 11.472656 L 1.664063 12.546875 L 9.261719 19.394531 L 7.140625 29.398438 L 16 24.289063 L 24.859375 29.398438 L 22.738281 19.394531 Z"></path>
              </svg>

              {
                <svg
                  strokeWidth="0"
                  viewBox="0 0 32 32"
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-600 fill-yellow-500"
                >
                  <path d="M 30.335938 12.546875 L 20.164063 11.472656 L 16 2.132813 L 11.835938 11.472656 L 1.664063 12.546875 L 9.261719 19.394531 L 7.140625 29.398438 L 16 24.289063 L 24.859375 29.398438 L 22.738281 19.394531 Z"></path>
                </svg>
              }
              {
                <svg
                  strokeWidth="0"
                  viewBox="0 0 32 32"
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-600 fill-yellow-500"
                >
                  <path d="M 30.335938 12.546875 L 20.164063 11.472656 L 16 2.132813 L 11.835938 11.472656 L 1.664063 12.546875 L 9.261719 19.394531 L 7.140625 29.398438 L 16 24.289063 L 24.859375 29.398438 L 22.738281 19.394531 Z"></path>
                </svg>
              }
              {
                <svg
                  strokeWidth="0"
                  viewBox="0 0 32 32"
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-600 fill-yellow-500"
                >
                  <path d="M 30.335938 12.546875 L 20.164063 11.472656 L 16 2.132813 L 11.835938 11.472656 L 1.664063 12.546875 L 9.261719 19.394531 L 7.140625 29.398438 L 16 24.289063 L 24.859375 29.398438 L 22.738281 19.394531 Z"></path>
                </svg>
              }
              {
                <svg
                  strokeWidth="0"
                  viewBox="0 0 32 32"
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-600 fill-yellow-500"
                >
                  <path d="M 30.335938 12.546875 L 20.164063 11.472656 L 16 2.132813 L 11.835938 11.472656 L 1.664063 12.546875 L 9.261719 19.394531 L 7.140625 29.398438 L 16 24.289063 L 24.859375 29.398438 L 22.738281 19.394531 Z"></path>
                </svg>
              }
            </div>
            <div className="text-[17px] text-[rgb(115,112,152)] font-medium px-[60px] mt-4 text-center">
              {name[curr]}
            </div>
          </div>
        ))}
      </div>
      <div className="flex  gap-3 xl:gap-4">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full hover: cursor-pointer hover:bg-[#8F4BF6] ${
              curr === i
                ? "bg-[#8F4BF6]"
                : "bg-[#fff] shadow-md shadow-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselDefault;
