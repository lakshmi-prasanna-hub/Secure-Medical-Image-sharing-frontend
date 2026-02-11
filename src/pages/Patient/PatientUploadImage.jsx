import React, { useState, useRef } from "react";
import api from "../../components/api";
import { useUser } from "../../Auth/UserContext";

// Functional component for uploading medical images
const PatientUploadImage = () => {
  const { user } = useUser(); // Access user context for authentication
  const [file, setFile] = useState(null); // State for selected file
  const [status, setStatus] = useState({ 
    loading: false, 
    message: "", 
    success: null 
  }); // State for upload status
  const fileInput = useRef(null); // Ref for file input element

  // Handle file selection and validation
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    const maxSizeInMB = 5;
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    
    if (!validTypes.includes(selectedFile.type)) {
      setStatus({
        loading: false,
        success: false,
        message: "Invalid file type. Please upload an image (JPEG, PNG, GIF).",
      });
      return;
    }
    
    if (selectedFile.size > maxSizeInMB * 1024 * 1024) {
      setStatus({
        loading: false,
        success: false,
        message: `File size exceeds ${maxSizeInMB}MB limit.`,
      });
      return;
    }
    
    setFile(selectedFile);
    setStatus({ loading: false, message: "", success: null });
  };

  // Handle file upload and API calls
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setStatus({ 
        loading: false, 
        message: "Please select a file first", 
        success: false 
      });
      return;
    }

    if (!user?.email) {
      setStatus({ 
        loading: false, 
        message: "User information missing", 
        success: false 
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("owner", user.email);

    setStatus({ loading: true, message: "", success: null });

    try {
      const response = await api.post("/api/images/upload", formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem("token")}` // Add if using JWT
        },
        withCredentials: true,
      });

      if (response.data?.success) {
        try {
          const k = 3;
          const n = 5;

          await api.post("/api/secret/split", {
            title: `Image Key - ${response.data.filename || file.name}`,
            secret: response.data.secret || "placeholder-secret", // You can replace this with actual encryption key if returned
            k,
            n,
            userId: user.id || user.email,
          });
          
          setStatus({
            loading: false,
            success: true,
            message: `Upload successful! File saved as ${response.data.filename || file.name}`,
          });

          setFile(null);
          if (fileInput.current) {
            fileInput.current.value = "";
          }
        } catch (error) {
          throw new Error(error.data?.error || "Secret split failed");
        }
      } else {
        throw new Error(response.data?.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      let errorMessage = "Upload failed. Please try again.";
      
      if (error.response) {
        errorMessage = error.response.data?.error || error.response.statusText;
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setStatus({ 
        loading: false, 
        success: false, 
        message: errorMessage 
      });
    }
  };

  // JSX for rendering the upload form
  return (
    <div className="max-w-xl mx-auto mt-24 bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center text-teal-700">
        Upload Medical Image
      </h2>

      <form onSubmit={handleUpload} className="space-y-6">
        <div>
          <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
            Select Image
          </label>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            accept="image/*"
            ref={fileInput}
            onChange={handleFileChange}
            aria-describedby="file-upload-help"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500"
            required
          />
          <p id="file-upload-help" className="mt-2 text-sm text-gray-500">
            Supported formats: JPEG, PNG, GIF. Max size: 5MB.
          </p>
        </div>

        <button
          type="submit"
          disabled={status.loading || !file}
          className={`w-full bg-teal-600 text-white font-semibold py-2 px-4 rounded
            ${status.loading || !file ? "opacity-50 cursor-not-allowed" : "hover:bg-teal-700"}
          `}
        >
          {status.loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Uploading...
            </span>
          ) : (
            "Upload Image"
          )}
        </button>

        {status.message && (
          <div
            className={`mt-4 p-3 rounded text-sm ${
              status.success 
                ? "bg-green-100 text-green-700" 
                : "bg-red-100 text-red-700"
            }`}
          >
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default PatientUploadImage;