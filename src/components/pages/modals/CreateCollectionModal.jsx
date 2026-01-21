import React, { useState, useRef, useEffect } from "react";

const CreateCollectionModal = ({ onClose, onSave }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const modalRef = useRef(null);

  // 🔹 Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // 🔹 Image preview handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Please enter collection name");
    if (!image) return alert("Please upload an image");

    onSave({ name, image });

    setName("");
    setImage(null);
    setPreview(null);
  };

  return (
    <div className="fixed inset-0 ml-12 bg-black/40 flex items-center justify-center z-50 pl-4">
      <div
        ref={modalRef}
        className="bg-[#FFF7F8] w-full max-w-md rounded-2xl shadow-xl p-6 relative animate-fadeIn border border-pink-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-pink-700 hover:text-pink-900 text-xl font-bold"
        >
          ✕
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-pink-800 mb-5 text-center">
          💍 Create Wedding Collection
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-pink-800 mb-1"
            >
              Collection Name
            </label>
            <input
              id="name"
              type="text"
              name="collectionName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter collection name"
              className="w-full border border-pink-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-pink-800 mb-1"
            >
              Upload Image
            </label>

            <input
              id="image"
              type="file"
              name="thumbnail"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-pink-300 rounded-lg px-3 py-2 bg-white cursor-pointer"
            />

            {/* Preview */}
            {preview && (
              <div className="mt-3 flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-xl border-2 border-pink-300 shadow-md"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-pink-300 text-pink-700 hover:bg-pink-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 shadow-md transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      {/* Smooth fade animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.2s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default CreateCollectionModal;
