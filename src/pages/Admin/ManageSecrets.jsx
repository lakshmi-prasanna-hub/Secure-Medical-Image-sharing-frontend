import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import api from '../../components/api';

const ManageSecret = () => {
  const [secrets, setSecrets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const fetchSecrets = async () => {
    try {
      const res = await api.get('/api/secret/all');
      setSecrets(res.data);
    } catch (error) {
      toast.error('Failed to fetch secrets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSecrets();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 px-4 text-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-teal-400 mb-8 text-center">Manage Secrets</h2>

        {loading ? (
          <p className="text-center text-slate-400">Loading secrets...</p>
        ) : secrets.length === 0 ? (
          <p className="text-center text-slate-500">No secrets found.</p>
        ) : (
          <div className="space-y-6">
            {secrets.map(({ id, title, thresholdK, totalSharesN, originalData }) => {
              const isExpanded = expandedId === id;

              return (
                <div
                  key={id}
                  className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 shadow-md hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(id)}>
                    <h3 className="text-xl font-semibold text-teal-300">{title}</h3>
                    {isExpanded ? (
                      <FaChevronUp className="text-teal-400" />
                    ) : (
                      <FaChevronDown className="text-teal-400" />
                    )}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-6 text-slate-300">
                    <div>
                      <span className="font-semibold text-white">Threshold (k): </span>
                      {thresholdK}
                    </div>
                    <div>
                      <span className="font-semibold text-white">Total Shares (n): </span>
                      {totalSharesN}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 p-4 bg-slate-700 rounded-lg whitespace-pre-wrap font-mono text-sm text-slate-200">
                      <span className="font-semibold text-teal-400">Original Data:</span>
                      <pre>{originalData}</pre>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageSecret;
