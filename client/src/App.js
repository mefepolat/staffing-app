import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css.map";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home/pages/Home";
import NavBar from "./shared/components/NavBar";
import SignUp from "./home/pages/SignUp";
import SignIn from "./home/pages/SignIn";
import { AuthProvider } from "./shared/components/UserContext";

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
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
