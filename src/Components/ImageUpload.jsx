import React, { useState } from "react";
import Button from "../Components/Button.jsx";
import ArrowIcon from "../assets/Group.svg";
import ImageUploaderImg from "../assets/ImageUploader.svg";
import UploaderImg from "../assets/Uploader.svg";
import PlusImg from "../assets/Plus.svg";
import DeleteImg from "../assets/deleteIcon.svg";
import { addPetsInfo } from "../Utils/Api.js";
import { v4 } from "uuid";
import { storage } from "../FirBase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Navigate } from "react-router-dom";

const ImageUpload = ({ petData, passAnimalName, petBreed }) => {
  const navigate = useNavigate();
  const [img, setImg] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  // const [a, setA] = useState();

  // console.log("pet ka nam or age in upload image", petData);
  // console.log("pet ka type in upload image", passAnimalName);
  // console.log("pet ki breed in upload image", petBreed);

  // console.log("isDisable---->", isDisable);

  const userId = localStorage.getItem("userId");
  console.log("user Id in image upload", userId);

  const submitDataToDatabase = async () => {
    try {
      const submitData = await addPetsInfo({
        _id: userId,
        breed: petBreed,
        petAge: petData?.age.toString(),
        petImage: img || "",
        petName: petData?.name,
        petType: passAnimalName,
      });
      if (submitData) {
        navigate("/HomePage");
        toast.success("Pet Added successfully");
      } else {
        return "";
      }
    } catch (error) {
      console.log("Error while submitting data from image uploader:", error);
    }
  };

  const dleteImage = () => {
    setImg(null);
    setIsDisable(false);
  };

  const handleSelected = async (e) => {
    const imageUrl = e.target.files[0];

    if (imageUrl) {
      setIsloading(true);
      const uniqueFileName = `${imageUrl.name}-${v4()}`;
      const imageRef = ref(storage, `petVetImagesUrl/${uniqueFileName}`);
      console.log("imageRef", imageRef);

      try {
        console.log("Uploading to:", imageRef.fullPath);

        const snapshot = await uploadBytes(imageRef, imageUrl);
        console.log("snapshot", snapshot);

        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log("Image URL:", downloadURL);

        if (downloadURL) {
          setIsloading(false);
          setImg(downloadURL);
          setIsDisable(true);
          // console.log("button hide ho gya h", isDisable);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        setIsloading(false);
      } finally {
        setIsloading(false);
      }
    } else {
      alert("Please select an image");
    }
  };

  console.log("image are in state now", img);

  // console.log("jsjdksjdks", petData);

  return (
    <div className="flex flex-col items-center mt-3 gap-2">
      <div className="border relative flex flex-col justify-center items-center py-10 gap-4 sm:py-14 sm:gap-6 md:py-16 md:gap-8 border-[rgb(218,218,218)] w-[350px] sm:w-[450px] md:w-[590px] xl:w-[608px] rounded-[35px]">
        <h1 className="text-[28px] text-center px-4 font-bold">
          What does your Bird look like?
        </h1>

        <img src={ImageUploaderImg} alt="Pet Icon" />

        <div className="flex flex-col items-center justify-center gap-10">
          {img ? (
            <>
              <div className="relative">
                <img
                  src={img}
                  className="h-[135px] w-[140px] rounded-[200px]"
                />
              </div>
              <div className="absolute mt-1">
                <label className="cursor-pointer">
                  <div className="p-3 flex items-center justify-center rounded-full bg-[#EC694E] mt-5">
                    <img
                      src={DeleteImg}
                      alt="Plus Icon"
                      className="w-4 h-4 "
                      onClick={dleteImage}
                    />
                  </div>
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  name="image"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleSelected(e)}
                />
              </div>
            </>
          ) : (
            <>
              <div className="relative">
                <img
                  src={UploaderImg}
                  className="h-[135px] w-[140px] rounded-[200px]"
                />
              </div>
              <div className="absolute mb-20">
                {isLoading && (
                  <div className="flex justify-between w-8 h-8">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="absolute">
                <label htmlFor="imageUpload" className="cursor-pointer">
                  <div className="p-3 flex items-center justify-center rounded-full bg-[#EC694E] mt-5">
                    <img src={PlusImg} alt="Plus Icon" className="w-4 h-4 " />
                  </div>
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  name="image"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleSelected(e)}
                />
              </div>
            </>
          )}

          <button
            onClick={submitDataToDatabase}
            disabled={isDisable}
            className="w-[300px] h-[60px] md:w-[325px] text-[rgb(115,112,152)] rounded-[20px] placeholder:text-[16px] border border-[#E5E4F9] hover:bg-[#E5E4F9] disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none"
          >
            Skip
          </button>
        </div>

        <Button
          onClick={submitDataToDatabase}
          text="Add My Pet"
          icon={ArrowIcon}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
