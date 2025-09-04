"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiTrash2, FiUserPlus } from "react-icons/fi";
import dynamic from "next/dynamic";
const UserModal = dynamic(() => import("@/components/(dashboard)/UserModal"));
import Loader from "@/components/Loader";

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/auth/all-users");
      setData(res.data.users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/auth/delete-user/${id}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setShowModal(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedUser) {
        await axios.patch(`/api/auth/edit/${selectedUser._id}`, formData);
      } else {
        await axios.post("/api/auth/signup", formData);
      }
      fetchData();
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col h-screen justify-center items-center">
        <Loader />
      </div>
    );

  return (
    <div className="min-h-screen p-6 ">
      <div className="flex  md:flex-row flex-col  justify-between items-center max-w-6xl mx-auto mb-6">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-gray-500">Manage your users</p>
        </div>
        <button
          onClick={handleAdd}
          className="cursor-pointer flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          <FiUserPlus size={18} />
          Add User
        </button>
      </div>

      <div className="overflow-x-auto max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((user) => (
              <tr key={user._id} className="odd:bg-gray-50 hover:bg-gray-100 transition">
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 text-center space-x-3">
                  <button
                    onClick={() => handleEdit(user)}
                    className="cursor-pointer inline-flex items-center text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="cursor-pointer inline-flex items-center text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center text-gray-500 py-6">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <UserModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        initialData={selectedUser}
      />
    </div>
  );
};

export default Page;
