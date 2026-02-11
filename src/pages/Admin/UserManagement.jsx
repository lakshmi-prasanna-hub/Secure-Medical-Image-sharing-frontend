import React, { useEffect, useState } from 'react';
import { FaTrash, FaUserMd, FaUsers } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../../components/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/user/get/allUsers');
      if (res.data.success) {
        setUsers(res.data.users || []);
      } else {
        toast.error('Failed to fetch users');
      }
    } catch (err) {
      toast.error('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const res = await api.delete(`/delete/${userId}`);
      if (res.data.success) {
        toast.success('User deleted successfully');
        fetchUsers();
      } else {
        toast.error('Deletion failed');
      }
    } catch (err) {
      toast.error('Error deleting user');
    }
  };

  const filteredUsers =
    roleFilter === 'ALL'
      ? users
      : users.filter((user) => user.role?.toUpperCase() === roleFilter);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 px-4 text-white">
      <div className="max-w-6xl mx-auto bg-slate-800/60 border border-slate-700 p-6 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-teal-400 mb-6 text-center">
          User Management
        </h2>

        {/* Filter buttons */}
        <div className="flex gap-4 justify-center mb-6">
          <button
            onClick={() => setRoleFilter('ALL')}
            className={`px-4 py-2 rounded-md font-semibold ${
              roleFilter === 'ALL'
                ? 'bg-teal-600'
                : 'bg-slate-700 hover:bg-slate-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setRoleFilter('DOCTOR')}
            className={`px-4 py-2 rounded-md font-semibold flex items-center gap-2 ${
              roleFilter === 'DOCTOR'
                ? 'bg-teal-600'
                : 'bg-slate-700 hover:bg-slate-600'
            }`}
          >
            <FaUserMd/> Doctors
          </button>
          <button
            onClick={() => setRoleFilter('PATIENT')}
            className={`px-4 py-2 rounded-md font-semibold flex items-center gap-2 ${
              roleFilter === 'PATIENT'
                ? 'bg-teal-600'
                : 'bg-slate-700 hover:bg-slate-600'
            }`}
          >
            <FaUsers /> Patients
          </button>
        </div>

        {/* User Table */}
        {loading ? (
          <p className="text-center text-slate-300">Loading users...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm">
              <thead>
                <tr className="bg-slate-700 text-teal-300">
                  <th className="px-4 py-2 text-left">#</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-slate-400">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user, index) => (
                    <tr
                      key={user.id || user.userId}
                      className="border-b border-slate-600 hover:bg-slate-700"
                    >
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{user.fullName || 'N/A'}</td>
                      <td className="px-4 py-2">{user.email || 'N/A'}</td>
                      <td className="px-4 py-2">{user.role}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleDelete(user.id || user.userId)}
                          className="text-red-400 hover:text-red-600"
                          title="Delete User"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
