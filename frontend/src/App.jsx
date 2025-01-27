import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/homescreens/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import WatchPage from "./pages/WatchPage";
import SearchPage from "./pages/SearchPage";
import HistoryPage from "./pages/HistoryPage";
import NotFoundPage from "./pages/404";


function App() {
  const { user, isAuthCheck, authCheck } = useAuthStore();
  console.log("user is - ", user);

  useEffect(() => {
    authCheck();

  }, [authCheck])

  if (isAuthCheck) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center h-full bg-black">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    )
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to={"/"} />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/watch/:id" element={user ? <WatchPage /> : <Navigate to={"/login"} />} />
        <Route path="/search" element={user ? <SearchPage /> : <Navigate to={"/login"} />} />
        <Route path="/history" element={user ? <HistoryPage /> : <Navigate to={"/login"} />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </>


  )
}

export default App
