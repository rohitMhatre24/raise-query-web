import { useEffect, useState } from "react";
import API from "../services/api";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import ApplicationTable from "../components/ApplicationTable";
import CreateApplicationModal from "../components/CreateApplicationModal";

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ NEW: Loading state
  const [loading, setLoading] = useState(false);

  // 🔥 Fetch data on load
  useEffect(() => {
    fetchData();
  }, []);

  // 🔥 API CALL
  const fetchData = async () => {
    try {
      setLoading(true); // start loading

      const statsRes = await API.get("/applications/dashboard");
      const appsRes = await API.get("/applications/my");

      setStats(statsRes.data.data);
      setApplications(appsRes.data.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false); // stop loading
    }
  };

  // 🔥 FILTER LOGIC
  const filteredData =
    filter === "ALL"
      ? applications
      : applications.filter((app) => app.status === filter);

  return (
    <div className="flex h-screen bg-gray-100">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-grow flex flex-col">

        {/* HEADER */}
        <Header onOpenModal={() => setIsModalOpen(true)} />

        {/* CONTENT */}
        <main className="p-6 overflow-y-auto flex-grow">

          {/* ✅ LOADING UI */}
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500 text-lg">Loading...</p>
            </div>
          ) : (
            <>
              {/* KPI CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">

                <StatCard
                  title="Total"
                  value={stats.total || 0}
                  color="border-blue-500"
                  onClick={() => setFilter("ALL")}
                  active={filter === "ALL"}
                />

                <StatCard
                  title="Approved"
                  value={stats.approved || 0}
                  color="border-green-500"
                  onClick={() => setFilter("APPROVED")}
                  active={filter === "APPROVED"}
                />

                <StatCard
                  title="Pending"
                  value={stats.pending || 0}
                  color="border-yellow-500"
                  onClick={() => setFilter("PENDING")}
                  active={filter === "PENDING"}
                />

                <StatCard
                  title="Rejected"
                  value={stats.rejected || 0}
                  color="border-red-500"
                  onClick={() => setFilter("REJECTED")}
                  active={filter === "REJECTED"}
                />
              </div>

              {/* APPLICATION TABLE */}
              <ApplicationTable data={filteredData} />
            </>
          )}
        </main>
      </div>

      {/* CREATE APPLICATION MODAL */}
      <CreateApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchData} // ✅ NO reload
      />
    </div>
  );
};

export default Dashboard;