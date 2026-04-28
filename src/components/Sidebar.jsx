import { Link } from "react-router-dom";

const Sidebar = () => {
  const role = localStorage.getItem("role");

  return (
    <aside className="w-64 bg-slate-900 text-white p-6">

      <h2 className="text-xl font-bold mb-6">App Panel</h2>

      <nav className="space-y-3">

        {role === "USER" && (
          <Link to="/dashboard" className="block">
            Dashboard
          </Link>
        )}

        {/* ✅ Only Admin */}
        {role === "ADMIN" && (
          <>
            <Link to="/admin" className="block">
              Applications
            </Link>

            <Link to="/users" className="block">
              Users
            </Link>
          </>
        )}

      </nav>

    </aside>
  );
};

export default Sidebar;