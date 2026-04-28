import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

const CreateApplicationModal = ({ isOpen, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    subject: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    
    // 🔥 VALIDATION
    if (!form.subject.trim()) {
      return toast.error("Subject is required");
    }

    if (form.description.length < 5) {
      return toast.error("Description must be at least 5 characters");
    }

    try {
      setLoading(true);

      await API.post("/applications", form);

      toast.success("Application created ✅");

      setForm({ subject: "", description: "" });

      onSuccess(); // refresh data
      onClose();

    } catch (err) {
      toast.error("Failed to create application ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white p-6 rounded-lg w-96">

        <h2 className="text-lg font-bold mb-4">Create Application</h2>

        <input
          placeholder="Subject"
          className="w-full border p-2 mb-3"
          value={form.subject}
          onChange={(e) =>
            setForm({ ...form, subject: e.target.value })
          }
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2 mb-3"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? "Creating..." : "Submit"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreateApplicationModal;