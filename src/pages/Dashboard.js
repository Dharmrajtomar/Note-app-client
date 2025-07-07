import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  const fetchNotes = async () => {
    try {
      const res = await axios.get("https://note-app-server2-krxk.onrender.com/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err) {
      setError("Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get("https://note-app-server2-krxk.onrender.com/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user info");
    }
  };

  const handleCreate = async () => {
    if (!content.trim()) return;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/notes",
        { content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotes([res.data, ...notes]);
      setContent("");
    } catch {
      alert("Failed to create note");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://note-app-server2-krxk.onrender.com/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch {
      alert("Failed to delete note");
    }
  };

  useEffect(() => {
    if (!token) {
      window.location.href = "/signin";
    } else {
      fetchUser();
      fetchNotes();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md border border-gray-300 rounded-lg p-6 bg-white shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-bold flex">
            <Loader /> Dashboard
          </div>
          <button className="text-blue-600" onClick={handleLogout}>
            Sign Out
          </button>
        </div>

        <div className="bg-white shadow rounded p-4 mb-4">
          <p className="text-lg font-semibold">
            Welcome, {user?.name || "User"}!
          </p>
          <p className="text-sm text-gray-500">Email: {user?.email || "---"}</p>
        </div>

        <div className="flex mb-4">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a note..."
            className="flex-1 border-b-2 border-gray-300 focus:border-blue-500 outline-none px-2 py-1"
          />
        </div>

        <button
          onClick={handleCreate}
          className="w-full bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700"
        >
          Create Note
        </button>

        <p className="top-4 text-xl font-bold mb-1 text-blue-600 mt-4">
          My Notes
        </p>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ul className="space-y-2 mt-2">
            {notes.map((note) => (
              <li
                key={note._id}
                className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded"
              >
                <span>{note.content}</span>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
