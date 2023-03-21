import { useState } from "react";
import Dashboard from "../components/Dashboard";
import Employees from "../components/Employees";
import Home from "../components/Home";
import Shifts from "../components/Shifts";
import Sidebar from "../components/Sidebar";

const AdminPage = () => {
    const [currentPage, setCurrentPage] = useState('home');
    
  return (
    <div className="container-fluid bg-secondary min-vh-100">
      <div className="row">
        
        <div className="col-4 col-md-2 bg-white vh-100 position-fixed">
          <Sidebar setCurrentPage={setCurrentPage} />
        </div> 
       <div className="col-4 col-md-2"></div>
        <div className="col">
         {currentPage === 'home' && <Home />} 
         {currentPage === 'dashboard' && <Dashboard />} 
         {currentPage === 'employees' && <Employees />} 
         {currentPage === 'shifts' && <Shifts />} 
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
