import React, { useEffect, useState } from "react";
import api from "../../components/api";
import { useUser } from "../../Auth/UserContext";
import { toast } from "react-toastify";

const DoctorImageAccess = () => {
  const { user } = useUser();
  const [secrets, setSecrets] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [shares, setShares] = useState([]);
  const [selectedShares, setSelectedShares] = useState([]);
  const [reconstructedKey, setReconstructedKey] = useState("");
  const [threshold, setThreshold] = useState(3);

  // 1. Fetch all secret-shared images
  useEffect(() => {
    api
      .get("/api/secret/all")
      .then((res) => setSecrets(res.data))
      .catch(() => toast.error("Failed to load secrets"));
  }, []);

  // 2. Fetch shares for selected secret
  const fetchShares = async (id) => {
    setSelectedId(id);
    setSelectedShares([]);
    setReconstructedKey("");
    try {
      const res = await api.get(`/api/secret/shares/${id}`);
      setShares(res.data.shares || []);
      setThreshold(res.data.thresholdk || 3); // <-- store threshold from backend
    } catch {
      toast.error("Failed to fetch shares");
    }
  };

  // 3. Reconstruct secret key from selected shares
  const handleReconstruct = async () => {
    if (selectedShares.length < threshold) {
      toast.error(`Select at least ${threshold} shares`);
      return;
    }

    try {
      const res = await api.post("/api/secret/reconstruct", selectedShares);
      setReconstructedKey(res.data.secret);
      toast.success("Secret reconstructed!");
    } catch {
      toast.error("Failed to reconstruct secret");
    }
  };

  // 4. Download image
  const handleDownload = async () => {
  if (!reconstructedKey || selectedShares.length < threshold) {
    toast.error("Please reconstruct the secret with valid shares first");
    return;
  }

  try {
    const valid = await api.post("/api/secret/validate", {
      dataId: selectedId,
      role: user.role,
    });

    if (!valid.data) {
      toast.error("Access denied by policy");
      return;
    }

    const res = await api.get(`/api/images/${selectedId}`, {
      responseType: "blob",
      withCredentials: true,
    });

    const blob = new Blob([res.data], { type: "application/octet-stream" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `decrypted_image_${selectedId}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch {
    toast.error("Download failed");
  }
};


  return (
    <div className="flex flex-col max-w-6xl mx-auto p-8 mt-24 bg-white rounded shadow items-center">
      <h2 className="text-2xl font-bold text-center text-teal-700 mb-6">
        Doctor Secret Access
      </h2>

      {/* Step 1: Select secret/image */}
      <div className="mb-4">
        <label className="block font-semibold mb-2 text-gray-700">
          Select Image:
        </label>
        <select
          value={selectedId || ""}
          onChange={(e) => fetchShares(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Select Secret/Image --</option>
          {secrets.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title} (ID: {s.id})
            </option>
          ))}
        </select>
      </div>

      {/* Step 2: Select shares */}
      {shares.length > 0 && (
        <div className="mb-6">
          <h4 className="text-md font-semibold mb-2">
            Select Minimum {threshold} Shares:
          </h4>
          <div className="space-y-1">
            {shares.map((s, i) => (
              <label key={i} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={s.shareValue}
                  checked={selectedShares.includes(s.shareValue)}
                  disabled={s.used}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedShares((prev) => {
                      if (prev.includes(value)) {
                        return prev.filter((v) => v !== value);
                      } else if (prev.length < threshold) {
                        return [...prev, value];
                      }
                      return prev;
                    });
                  }}
                />
                <span className={s.used ? "text-gray-400 line-through" : ""}>
                  {s.shareValue} {s.used ? "(Used)" : ""}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Reconstruct secret */}
      {shares.length > 0 && (
        <div className="mb-6">
          <button
            disabled={selectedShares.length < shares[0]?.threshold}
            onClick={handleReconstruct}
            className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded disabled:opacity-50"
          >
            Reconstruct Secret
          </button>

          {reconstructedKey && (
            <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
              🔑 Reconstructed Key:{" "}
              <span className="font-mono">{reconstructedKey}</span>
            </div>
          )}
        </div>
      )}

      {/* Step 4: Download image */}
      {reconstructedKey && (
        <div className="text-center">
          <button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            Download Decrypted Image
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorImageAccess;
