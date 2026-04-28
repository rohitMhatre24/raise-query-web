import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Header = ({ onOpenModal }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isUsersPage = location.pathname === "/users";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logged out");
    navigate("/");
  };

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-8">

      <h2 className="text-lg font-semibold">
        {isUsersPage ? "Users" : "Dashboard"}
      </h2>

      <div className="flex gap-3">

        <button
          onClick={onOpenModal}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          {isUsersPage ? "+ Create User" : "+ Create Application"}
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-2 rounded"
        >
          Logout
        </button>

      </div>
    </header>
  );
};

export default Header;