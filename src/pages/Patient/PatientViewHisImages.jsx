import React, { useEffect, useState } from "react";
import { useUser } from "../../Auth/UserContext";
import api from "../../components/api";

const PatientViewHisImages = () => {
  const { user } = useUser();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchImages = async () => {
    try {
      const res = await api.get(`/api/images/get?owner=${user.email}`);
      setImages(res.data.images); // assuming backend returns a list of image metadata
    } catch (err) {
      console.error(err);
      setError("Failed to fetch images.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (id) => {
    try {
      const res = await api.get(`/api/images/${id}`, {
        responseType: "blob", // 🔽 needed to handle binary files
        withCredentials: true,
      });

      const blob = new Blob([res.data], { type: "application/octet-stream" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `image_${id}.jpg`; // customize based on actual name logic
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download image.");
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchImages();
    }
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto mt-24 bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-teal-700 mb-6">My Uploaded Images</h2>

      {loading && <p className="text-gray-600 text-center">Loading...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}
      {!loading && images.length === 0 && <p className="text-center">No images uploaded yet.</p>}

      <ul className="space-y-4">
        {images.map((img) => (
          <li key={img.id} className="border p-4 rounded shadow-sm flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-800">{img.filename.replace("enc_", "")}</p>
              <p className="text-sm text-gray-500">Uploaded At: {new Date(img.uploadedAt).toLocaleString()}</p>
              <p className="text-sm text-gray-500">Watermark Hash: {img.watermarkHash}</p>
            </div>
            <button
              onClick={() => handleDownload(img.id)}
              className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
            >
              Download
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientViewHisImages;
