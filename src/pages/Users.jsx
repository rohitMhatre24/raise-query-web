import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const [usersRes, countRes] = await Promise.all([
      API.get("/users"),
      API.get("/users/count"),
    ]);

    setUsers(usersRes.data.data);
    setCount(countRes.data.data.total);
  };

  const createUser = async () => {
    try {
      await API.post("/users", form);

      toast.success("User created");

      setShowModal(false);
      setForm({ name: "", email: "", password: "" });

      fetchUsers();

    } catch (err) {
      toast.error("Failed to create user");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-grow flex flex-col">

        <Header onOpenModal={() => setShowModal(true)} />

        <main className="p-6">

          {/* KPI */}
          <div className="bg-white p-4 rounded shadow mb-6">
            <h3>Total Users</h3>
            <h2 className="text-xl font-bold">{count}</h2>
          </div>

          {/* TABLE */}
          <table className="w-full bg-white shadow">
            <thead>
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </main>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">

          <div className="bg-white p-6 rounded w-96">

            <h2 className="mb-4">Create User</h2>

            <input
              placeholder="Name"
              className="w-full mb-2 p-2 border"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              placeholder="Email"
              className="w-full mb-2 p-2 border"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full mb-4 p-2 border"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button
              onClick={createUser}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Create
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Users;