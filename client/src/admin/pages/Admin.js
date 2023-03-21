import Home from "../components/Home";
import Sidebar from "../components/Sidebar";

const AdminPage = () => {
  return (
    <div className="container-fluid bg-secondary min-vh-100">
      <div className="row">
        <div className="col-2 bg-white vh-100">
          <Sidebar />
        </div>
        <div className="col">
          <Home />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
