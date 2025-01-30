import Login from "./Pages/Credentials/Login.jsx";
import Register from "./Pages/Credentials/Register.jsx";
import EmailVerification from "./Pages/Credentials/EmailVerification.jsx";
import FinishRegistration from "./Pages/Credentials/FinishRegistration.jsx";
import ForgotPassword from "./Pages/Credentials/ForgotPassword.jsx";
import TremsSerives from "./Pages/Credentials/TremsSerives.jsx";
import PrivacyPolicy from "./Pages/Credentials/PrivacyPolicy.jsx";
import SetNewPassword from "./Pages/Credentials/SetNewPassword.jsx";
import HomePage from "./Pages/Home/HomePage.jsx";
import AddPet from "./Pages/AddPet/AddPet.jsx";
import EditPet from "./Pages/Home/EditPet.jsx";
import PublicRoutes from "./Routing/PublicRoutes.jsx";
import ProtectedRoutes from "./Routing/ProtectedRoutes.jsx";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Email" element={<EmailVerification />} />
        <Route path="/Finish" element={<FinishRegistration />} />
        <Route path="/Forgot" element={<ForgotPassword />} />
        <Route path="/TermsServices" element={<TremsSerives />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/SetNewPassword" element={<SetNewPassword />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/Addpet" element={<AddPet />} />
        <Route path="/EditPet" element={<EditPet />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/HomePage" element={<Navigate to="/HomePage" />} />

      <Route path="*" element={<h1>Page not found</h1>} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

// const App = () => {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/Email" element={<EmailVerification />} />
//       <Route path="/Finish" element={<FinishRegistration />} />
//       <Route path="/Forgot" element={<ForgotPassword />} />
//       <Route path="/TermsServices" element={<TremsSerives />} />
//       <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
//       <Route path="/SetNewPassword" element={<SetNewPassword />} />
//       <Route path="/SelectPet" element={<SelectPet />} />
//       <Route path="/PetBreed" element={<PetBreed />} />
//       <Route path="/PetInfo" element={<PetInfo />} />
//       <Route path="/ImageUpload" element={<ImageUpload />} />
//       <Route path="/Navbar" element={<Navbar />} />
// <Route path="/SideBar" element={<SideBar />} />
//       <Route path="/HomePage" element={<HomePage />} />
//       <Route path="/AddPet" element={<AddPet />} />
//       <Route path="/EditPet" element={<EditPet />} />
//     </Routes>
//   );
// };

export default App;
