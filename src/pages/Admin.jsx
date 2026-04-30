import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Admin = () => {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({});
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [appsRes, statsRes] = await Promise.all([
        API.get(`/applications`), // ✅ NO filter here
        API.get(`/applications/admin/dashboard`),
      ]);
      // console.log("Admin data:", { appsRes, statsRes });
      setApplications(appsRes.data.data);
      setStats(statsRes.data.data);

    } catch (err) {
      console.error(err);
      toast.error("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FRONTEND FILTER
  const filteredApplications =
    filter === "ALL"
      ? applications
      : applications.filter((app) => app.status === filter);

  // 🔥 STATUS UPDATE
  const updateStatus = async (id, status) => {
    try {
      await API.patch(`/applications/${id}/status`, { status });

      toast.success(`Application ${status}`);

      fetchData(); // refresh

    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-grow flex flex-col">

        <Header />

        <main className="p-6 overflow-y-auto">

          {/* 🔥 KPI CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

            <div
              onClick={() => setFilter("ALL")}
              className="cursor-pointer bg-white p-4 rounded shadow border-l-4 border-blue-500"
            >
              <p>Total</p>
              <h2 className="text-xl font-bold">{stats.total || 0}</h2>
            </div>

            <div
              onClick={() => setFilter("APPROVED")}
              className="cursor-pointer bg-white p-4 rounded shadow border-l-4 border-green-500"
            >
              <p>Approved</p>
              <h2 className="text-xl font-bold">{stats.approved || 0}</h2>
            </div>

            <div
              onClick={() => setFilter("PENDING")}
              className="cursor-pointer bg-white p-4 rounded shadow border-l-4 border-yellow-500"
            >
              <p>Pending</p>
              <h2 className="text-xl font-bold">{stats.pending || 0}</h2>
            </div>

            <div
              onClick={() => setFilter("REJECTED")}
              className="cursor-pointer bg-white p-4 rounded shadow border-l-4 border-red-500"
            >
              <p>Rejected</p>
              <h2 className="text-xl font-bold">{stats.rejected || 0}</h2>
            </div>

          </div>

          {/* TABLE */}
          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : (
            <div className="bg-white rounded shadow overflow-hidden">

              <table className="w-full text-left">

                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="p-3">User</th>
                    <th className="p-3">Subject</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredApplications.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center p-6 text-gray-400">
                        No applications found
                      </td>
                    </tr>
                  ) : (
                    filteredApplications.map((app) => (
                      
                      <tr key={app.id} className="border-t">

                        <td className="p-3">
                          {app.user?.name || "N/A"}
                        </td>

                        <td className="p-3">{app.subject}</td>

                        <td className="p-3">
                          <span
                            className={`px-2 py-1 text-xs rounded ${
                              app.status === "APPROVED"
                                ? "bg-green-100 text-green-700"
                                : app.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {app.status}
                          </span>
                        </td>

                        <td className="p-3 space-x-2">

                            {/* ✅ If PENDING → show both */}
                            {app.status === "PENDING" && (
                                <>
                                <button
                                    onClick={() => updateStatus(app.id, "APPROVED")}
                                    className="bg-green-500 text-white px-2 py-1 rounded"
                                >
                                    Approve
                                </button>

                                <button
                                    onClick={() => updateStatus(app.id, "REJECTED")}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Reject
                                </button>
                                </>
                            )}

                            {/* ✅ If APPROVED → only Reject */}
                            {app.status === "APPROVED" && (
                                <button
                                onClick={() => updateStatus(app.id, "REJECTED")}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                Reject
                                </button>
                            )}

                            {/* ✅ If REJECTED → only Approve */}
                            {app.status === "REJECTED" && (
                                <button
                                onClick={() => updateStatus(app.id, "APPROVED")}
                                className="bg-green-500 text-white px-2 py-1 rounded"
                                >
                                Approve
                                </button>
                            )}

                        </td>

                      </tr>
                    ))
                  )}
                </tbody>

              </table>

            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default Admin;