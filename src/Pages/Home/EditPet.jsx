import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar.jsx";
import SideBar from "../../Components/SideBar.jsx";
import DeletImg from "../../assets/delete.svg";
import UploaderImg from "../../../src/assets/Uploader.svg";
import EditPenImg from "../../../src/assets/editlast.svg";
import EditImg from "../../../src/assets/editpen.svg";
import { v4 } from "uuid";
import { storage } from "../../FirBase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { deletePet } from "../../Utils/Api.js";
import TickImg from "../../../src/assets/tick.svg";
import { useLocation } from "react-router-dom";
import { updatePetInfo } from "../../Utils/Api.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const EditPet = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [disable, setDisable] = useState(true);
  const [selectedPet, setSelectedPet] = useState(null);
  const [img, setImg] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [edit, setEdit] = useState("");

  const petDelete = async () => {
    try {
      const abc = await deletePet(selectedPet?._id);
      const message = abc?.message;
      console.log(abc);
      navigate("/homepage");
      toast.success(message);
    } catch (error) {
      // console.log("error While deleting pet", error);
    }
  };

  const userId = localStorage.getItem("userId");
  // console.log("user Id in image upload", userId);

  // console.log("edit.petName", edit.petName);
  // console.log("edit.petType", edit.petType);
  // console.log("edit.petAge", edit.petAge);
  // console.log("edit.breed", edit.breed);

  const handleUpdatedPet = async () => {
    const body = {
      userId: userId,
      petType: edit.petType,
      petName: edit.petName,
      petImage: img,
      petAge: edit.petAge,
      breed: edit.breed,
    };
    console.log("lklkl", body);
    setIsloading(true);

    try {
      const abc = await updatePetInfo(selectedPet._id, body);
      const message = abc?.message;
      setIsloading(false);
      navigate("/homepage");
      toast.success(message);
    } catch (error) {
      console.log("error While updating pet", error);
    }
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSelected = async (e) => {
    const imageUrl = e.target.files[0];
    console.log("imageUrl", imageUrl);

    if (imageUrl) {
      setIsloading(true);
      const uniqueFileName = `${imageUrl.name}-${v4()}`;
      console.log("uniqueFileName", uniqueFileName);
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
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        setIsloading(false);
      }
    } else {
      alert("Please select an image");
    }
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

  const handlenalbleInput = () => {
    setDisable(false);
  };
  useEffect(() => {
    if (state?._id) {
      setSelectedPet(state);
    }
  }, [state]);

  return (
    <>
      <div className="flex">
        <div className="hidden lg:block">
          <SideBar />
        </div>
        {isOpen && (
          <div className="fixed" style={{ zIndex: 99 }}>
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

          {disable ? (
            <div className="flex h-[45px] px-5 justify-between items-center"></div>
          ) : (
            <div className="flex px-5 justify-between items-center">
              <p className="text-[24px] barlow-semibold">Edit pet</p>
              <div className="bg-[#e2e8f0] p-3 rounded-full cursor-pointer hover:bg-[#ffffff]">
                <img
                  src={DeletImg}
                  alt=""
                  className="w-[20px] h-[20px] text-black"
                  onClick={petDelete}
                />
              </div>
            </div>
          )}

          <div className=" flex flex-col gap-6  justify-center items-center">
            <div className="relative">
              {img ? (
                <img
                  src={img}
                  alt="Uploaded Pet"
                  className="h-[158px] w-[158px] rounded-full"
                />
              ) : selectedPet?.petImage ? (
                <img
                  src={selectedPet.petImage}
                  alt="Selected Pet"
                  className="h-[158px] w-[158px] rounded-full"
                />
              ) : (
                <img
                  src={UploaderImg}
                  alt="Uploader Icon"
                  className="h-[158px] w-[158px]"
                />
              )}

              {isLoading && (
                <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 bg-gray-700 rounded-full">
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

              {!disable && (
                <div className="absolute bottom-[-20px] left-[60px] ">
                  <label htmlFor="imageUpload" className="cursor-pointer">
                    <div className="p-3 flex items-center justify-center rounded-full bg-[#EC694E]">
                      <img src={EditImg} alt="Edit Icon" className="w-5 h-5" />
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
              )}
            </div>

            <form action="">
              <div className="flex flex-col gap-2">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[14px] font-light barlow-semibold mb-2 text-[#737098]"
                  >
                    Name
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      disabled={disable}
                      type="text"
                      className={`ps-4 block h-[53px] w-[250px]
                        xl:h-[55px] xl:w-[344px]
                         text-[15px] barlow-regular rounded-[15px] border border-[#e2e8f0] 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
                         focus:outline-none disabled:opacity-100  ${
                           disable ? "cursor-not-allowed" : ""
                         } `}
                      value={!disable ? edit.petName : selectedPet?.petName}
                      onChange={(e) => {
                        setEdit((prevEdit) => ({
                          ...prevEdit,
                          petName: e.target.value,
                        }));
                      }}
                    />

                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4"></div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[14px] font-light barlow-semibold mb-2 text-[#737098]"
                  >
                    Age
                  </label>
                  <div className="relative">
                    <input
                      id="number"
                      disabled={disable}
                      type="text"
                      className={`ps-4 block h-[53px] w-[250px]
                        xl:h-[55px] xl:w-[344px]
                         text-[15px] barlow-regular rounded-[15px] border border-[#e2e8f0] 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
                         focus:outline-none disabled:opacity-100  ${
                           disable ? "cursor-not-allowed" : ""
                         } `}
                      value={!disable ? edit?.petAge : selectedPet?.petAge}
                      onChange={(e) => {
                        setEdit((prevEdit) => ({
                          ...prevEdit,
                          petAge: e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[14px] font-light barlow-semibold mb-2 text-[#737098]"
                  >
                    Pet
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      disabled={disable}
                      type="text"
                      className={`ps-4 block h-[53px] w-[250px]
                        xl:h-[55px] xl:w-[344px]
                         text-[15px] barlow-regular rounded-[15px] border border-[#e2e8f0] 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
                         focus:outline-none disabled:opacity-100 ${
                           disable ? "cursor-not-allowed" : ""
                         } `}
                      value={!disable ? edit.petType : selectedPet?.petType}
                      onChange={(e) => {
                        setEdit((prevEdit) => ({
                          ...prevEdit,
                          petType: e.target.value,
                        }));
                      }}
                    />
                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4"></div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[14px] font-light barlow-semibold mb-2 text-[#737098]"
                  >
                    Breed
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      type="text"
                      disabled={disable}
                      value={!disable ? edit.breed : selectedPet?.breed}
                      onChange={(e) => {
                        setEdit((prevEdit) => ({
                          ...prevEdit,
                          breed: e.target.value,
                        }));
                      }}
                      className={`ps-4 block h-[53px] w-[250px]
                       xl:h-[55px] xl:w-[344px]
                        text-[15px] barlow-regular rounded-[15px] border border-[#e2e8f0] 
                        focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
                        focus:outline-none disabled:opacity-100  dark:bg-neutral-900 dark:border-neutral-700
                         dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 ${
                           disable ? "cursor-not-allowed" : ""
                         } `}
                    />
                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4"></div>
                  </div>
                </div>
              </div>
            </form>

            {!disable ? (
              isLoading ? (
                <button className="flex justify-center items-center gap-1 h-[54px] w-[253px] rounded-[59px] text-white bg-[#7457a1]">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white"
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
                </button>
              ) : (
                <button
                  onClick={handleUpdatedPet}
                  className="flex justify-center items-center gap-1 h-[54px] w-[253px] rounded-[59px] text-white bg-[#8f4bf6] hover:bg-[#6b46c1]"
                >
                  <img
                    src={TickImg}
                    className="h-[30px] w-[30px] fill-white "
                  />
                  <p>SAVE</p>
                </button>
              )
            ) : (
              <button
                onClick={handlenalbleInput}
                className="border flex justify-center items-center gap-2 hover:bg-[#e2e8f0] border-[#8f4bf6] h-[54px] w-[253px] rounded-[59px]"
              >
                <img src={EditPenImg} className="h-[1em] w-[1em]" />
                <p>Edit</p>
              </button>
            )}
          </div>
          <div className="flex xl:justify-between text-[#737098] text-[12px] barlow-regular mt-1 justify-center gap-16 items-center xl:mt-32">
            <p>© 2023 PetVet</p>
            <div className="flex xl:gap-2 gap-1 cursor-pointer">
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

export default EditPet;
