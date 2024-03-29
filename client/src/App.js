import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css.map";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./home/pages/Home";
import NavBar from "./shared/components/NavBar";
import SignUp from "./home/pages/SignUp";
import SignIn from "./home/pages/SignIn";
import { AuthProvider } from "./shared/components/UserContext";
import AdminPage from "./admin/pages/Admin";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <NavBar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<Navigate to='/' />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
