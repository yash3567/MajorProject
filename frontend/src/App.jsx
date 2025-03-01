import { Routes, Route, Navigate } from "react-router-dom";
// import Header from "./components/layouts/Header";
import Home from "./pages/Home.jsx";
import About from "./pages/about/About.jsx";
import ContactUs from "./pages/contact/ContactUs.jsx";
import Services from "./pages/services/Services.jsx";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import LoadingSpinner from "./components/common/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import ProjectRegister from "./pages/projectAuth/projectRegister/ProjectRegister.jsx";
import ProjectLogin from "./pages/projectAuth/projectLogin/ProjectLogin";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import Sidebar from "./components/common/Sidebar";
// import RightPanel from "./components/common/RightPanel";
import { Toaster } from "react-hot-toast";
import { createContext, useEffect, useState } from "react";
import Projects from "./pages/projects/index.jsx";
import Tutorial from "./pages/tutorial/index.jsx";
import NotificationPage from "./pages/notification/NotificationPage.jsx";

const MyContext = createContext();

const App = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    document.body.classList.toggle("light", theme !== "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const values = {
    theme,
    setTheme,
  };

  // Fetch Authenticated User
  const { data: authUser, isLoading: authLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log("authUser is here:", data);
        return data;
      } catch (error) {
        console.error("Error fetching authUser:", error);
        return null;
      }
    },
    retry: false,
  });

  if (authLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <MyContext.Provider value={values}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projectregister" element={<ProjectRegister />} />
        <Route path="/projectlogin" element={<ProjectLogin />} />
        <Route path="/project" element={<Projects />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path='/notifications' element={authUser ? <NotificationPage /> : <Navigate to='/login' />} />

        {/* Profile Page with Sidebar and Right Panel */}
        <Route 
          path="/profile/:username" 
          element={
            authUser ? (
              <div className="flex">
                <Sidebar />
                <ProfilePage />
                {/* <RightPanel /> */}
              </div>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
      </Routes>

      <Toaster />
    </MyContext.Provider>
  );
};

export default App;
export { MyContext };
