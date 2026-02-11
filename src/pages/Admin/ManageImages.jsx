import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../components/api';

const ManageImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      const res = await api.get('/api/images/get/all');
      if (res.data.success) {
        setImages(res.data.images || []);
      } else {
        toast.error('Failed to load images');
      }
    } catch (err) {
      toast.error('Server error while fetching images');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (id, filename) => {
    try {
      const response = await api.get(`/api/images/${id}`, {
        responseType: 'blob',
        withCredentials: true,
      });

      const blob = new Blob([response.data], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = filename.replace("enc_", "").replace(".txt", "");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Download failed');
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen pt-24 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-teal-400 mb-8 text-center">Manage Medical Images</h2>

        {loading ? (
          <p className="text-center text-slate-300">Loading images...</p>
        ) : images.length === 0 ? (
          <p className="text-center text-slate-400">No medical images available.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {images.map((img) => (
              <div
                key={img.id}
                className="bg-slate-800/60 border border-slate-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
              >
                <div className="p-4 space-y-2">
                  <h4 className="text-lg font-semibold text-teal-300 break-all">
                    {img.filename.replace('enc_', '').replace('.txt', '')}
                  </h4>
                  <p className="text-sm text-slate-400">Owner: {img.owner}</p>
                  <p className="text-sm text-slate-500">Hash: {img.watermarkHash.slice(0, 16)}...</p>
                  <p className="text-xs text-slate-500">Uploaded: {new Date(img.uploadedAt).toLocaleString()}</p>
                  <button
                    onClick={() => handleDownload(img.id, img.filename)}
                    className="mt-3 w-full bg-teal-600 hover:bg-teal-700 text-white py-1 rounded"
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageImages;
