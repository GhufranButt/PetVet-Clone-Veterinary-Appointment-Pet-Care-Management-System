const BASE_URL = "https://api.petvet.ai";

const apiCall = async (url, method, body = null) => {
  const token = localStorage.getItem("token");
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : null,
  };
  try {
    const response = await fetch(`${BASE_URL}${url}`, options);
    // console.log("ijisjdijsid", response);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "API call failed.");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Something went wrong.");
  }
};

export const registerUser = (email) =>
  apiCall("/createEmail", "POST", { enterEmail: email });

export const LoginUser = (email, password) =>
  apiCall("/login", "POST", { email: email, password: password });

export const OtpVerification = (otp) =>
  apiCall("/emailVerification", "POST", { enterOtp: otp });

export const Finishregistration = (otp) =>
  apiCall("/signup", "POST", { enterOtp: otp });

export const ForgetPassword = (email) =>
  apiCall("/emailForgotPass", "POST", { email: email });

export const addPetInfo = async (data) => {
  apiCall("/addPetsInfo", "POST", data);
};

export const petTypes = async () => {
  try {
    const res = await apiCall("/petTypes", "GET");
    return res.data;
  } catch (error) {
    console.error("Error fetching pet types:", error.message);
  }
};

export const listOfPets = async (userId) => {
  try {
    const res = await apiCall(`/listOfPets/${userId}`, "GET");
    return res;
  } catch (error) {
    console.error("Error fetching pet list:", error.message);
    throw error;
  }
};

export const getBreedType = async (petName) => {
  try {
    const res = await apiCall(`/sreachBreed/${petName}/All`, "GET");
    return res.partialMatches;
  } catch (error) {
    console.log("Errro while fetching breeds data:", error);
  }
};

export const addPetsInfo = async (petDetails) => {
  try {
    const response = await apiCall("/addPetsInfo", "POST", petDetails);
    return response;
  } catch (error) {
    console.log("Error while posting data to database:", error);
    throw error;
  }
};

export const deletePet = async (id) => {
  try {
    const response = await apiCall(`/deletePet/${id}`, "DELETE");
    return response;
  } catch (error) {
    console.log("Error while deleting pet to database:", error);
    throw error;
  }
};

export const updatePetInfo = async (id, petDtails) => {
  console.log("klkl", id, petDtails);
  try {
    const response = await apiCall(`/updatePetInfo/${id}`, "PUT", petDtails);
    return response;
  } catch (error) {
    console.log("Error while updated pet to database:", error);
    throw error;
  }
};
