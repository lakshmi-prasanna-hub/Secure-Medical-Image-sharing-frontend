import React from 'react';
import { useUser } from '../Auth/UserContext';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUserTag,
} from 'react-icons/fa';

const Profile = () => {
  const { user } = useUser();

  const defaultImage =
    'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-20 px-4 flex justify-center items-start">
      <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-8 w-full max-w-2xl shadow-2xl">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={user?.profileImage || defaultImage}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-teal-400 shadow-md object-cover"
          />
          <h2 className="text-3xl font-bold text-teal-400 mt-4">My Profile</h2>
        </div>

        {/* Profile Info */}
        <div className="space-y-6">
          <ProfileItem icon={<FaUser />} label="Name" value={user?.fullName} />
          <ProfileItem icon={<FaEnvelope />} label="Email" value={user?.email} />
          <ProfileItem icon={<FaUserTag />} label="Role" value={user?.role} />
          {user?.mobileNumber && (
            <ProfileItem icon={<FaPhone />} label="Phone" value={user.mobileNumber} />
          )}
        </div>
      </div>
    </div>
  );
};

// ✅ Reusable Profile Field Item
const ProfileItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4 bg-slate-700/50 p-4 rounded-lg hover:bg-slate-700 transition">
    <div className="text-teal-400 text-xl mt-1">{icon}</div>
    <div>
      <p className="text-sm text-slate-300 font-medium">{label}</p>
      <p className="text-lg font-semibold text-white">
        {value || 'Not available'}
      </p>
    </div>
  </div>
);

export default Profile;
