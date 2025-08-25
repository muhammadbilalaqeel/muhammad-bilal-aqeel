import React, { useState } from "react";
import {
  useChangeUserRoleMutation,
  useToggleUserBlockMutation,
} from "../../redux/apiSlice";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

const AdminList = ({ users,getAdminsLoading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [changeUserRole, { error, isLoading }] = useChangeUserRoleMutation();
  const [toggleUserBlock, { error: blockError, isLoading: l }] =
    useToggleUserBlockMutation();

  const handleBlockToggle = async (userId) => {
    try {
      const result = await toggleUserBlock(userId).unwrap();
      toast.success(result?.message);
    } catch (err) {
      console.error(err);
      toast.error(blockError.data.message || "Something went wrong");
    }
  };
  const onChangeRole = async (id, role) => {
    try {
      const result = await changeUserRole({ id, role }).unwrap();
      toast.success(result?.message);
    } catch (err) {
      console.error(err);
      toast.error(error.data.message || "Something went wrong");
    }
  };
  const filteredUsers =
    users?.length > 0
      ? users?.filter((user) => {
          const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesStatus =
            statusFilter === "all" ||
            (user.isBlocked ? "blocked" : "active") === statusFilter;
          return matchesSearch && matchesStatus;
        })
      : [];

  if (l || isLoading ||getAdminsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }
  if (error || blockError) {
    return (
      <p className="text-red-500 py-8 px-3 text-center">
        Something went wrong!
      </p>
    );
  }
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Admins</h2>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[150px]"
            >
              <option value="all">All Admins</option>
              <option value="active">Active Only</option>
              <option value="blocked">Blocked Only</option>
            </select>
          </div>
        </div>

        <div className="relative overflow-x-auto max-w-full">
          <table className="min-w-[800px] w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length > 0 &&
                filteredUsers?.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-sm font-bold text-white">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Role Selector */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                      <select
                        value={user.role}
                        onChange={(e) => onChangeRole(user._id, e.target.value)}
                        className="px-3 py-1 border rounded-lg"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        {/* <option value="moderator">Moderator</option> */}
                      </select>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                          user.isBlocked
                            ? "bg-red-400 text-white"
                            : "bg-green-400 text-white"
                        }`}
                      >
                        {user.isBlocked ? "⛔ Blocked" : "✓ Active"}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleBlockToggle(user._id)}
                        className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                          user.isBlocked
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                        }`}
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-12 text-center">
            <FaUser className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No admins found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminList;
