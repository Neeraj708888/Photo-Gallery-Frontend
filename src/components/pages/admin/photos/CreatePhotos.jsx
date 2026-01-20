import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreatePhotos = ({ onBack }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    collection: "",
    gallery: "",
    quotes: "",
    date: "",
    time: "",
    photo: null,
  });

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.collection || !form.gallery || !form.photo) {
      alert("Please fill all required fields (Collection, Gallery, Photo).");
      return;
    }

    setSubmitting(true);
    setSuccessMsg("");

    // Simulate submit
    setTimeout(() => {
      setSubmitting(false);
      setSuccessMsg("Photo uploaded successfully! 🎉");
      setForm({
        collection: "",
        gallery: "",
        quotes: "",
        date: "",
        time: "",
        photo: null,
      });
      setPreview(null);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-white py-10 px-4 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 sm:p-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-pink-600">Create Photo</h1>
          <button
            onClick={() => navigate('/admin/photos')}
            className="flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium transition-all"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Collection Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Select Collection <span className="text-red-500">*</span>
            </label>
            <select
              name="collection"
              value={form.collection}
              onChange={handleChange}
              className="w-full border border-pink-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
            >
              <option value="">-- Select Collection --</option>
              <option value="Haridwar">Haridwar</option>
              <option value="Bhaiya Dooj">Bhaiya Dooj</option>
              <option value="Engagement">Engagement</option>
              <option value="Haldi">Haldi</option>
            </select>
          </div>

          {/* Gallery Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Select Gallery <span className="text-red-500">*</span>
            </label>
            <select
              name="gallery"
              value={form.gallery}
              onChange={handleChange}
              className="w-full border border-pink-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
            >
              <option value="">-- Select Gallery --</option>
              <option value="Wedding Rituals">Wedding Rituals</option>
              <option value="Family Moments">Family Moments</option>
              <option value="Couple Portraits">Couple Portraits</option>
              <option value="Fun & Colors">Fun & Colors</option>
            </select>
          </div>

          {/* Photo Upload with Preview Below */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Photos <span className="text-red-500">*</span>
            </label>

            {/* Upload Box */}
            <label
              htmlFor="photo"
              className="w-full flex flex-col items-center justify-center border-2 border-dashed border-pink-300 rounded-xl p-10 cursor-pointer hover:bg-pink-50 transition-all"
            >
              <UploadCloud size={36} className="text-pink-500 mb-3" />
              <p className="text-sm font-medium text-gray-600">
                Click to upload images
              </p>
              <p className="text-xs text-gray-400 mt-1">
                You can upload multiple images
              </p>

              <input
                id="photo"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {/* Preview Section */}
            {images.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
              >
                {images.map((img, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative group"
                  >
                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition-all z-10"
                    >
                      ✕
                    </button>

                    {/* Image */}
                    <img
                      src={img.preview}
                      alt="Preview"
                      className="w-full h-40 object-contain rounded-xl border border-pink-200 bg-white"
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={submitting}
              className={`px-6 py-2 rounded-full text-white font-semibold transition-all ${submitting
                ? "bg-pink-300 cursor-wait"
                : "bg-pink-500 hover:bg-pink-600"
                }`}
            >
              {submitting ? "Uploading..." : "Submit Photo"}
            </motion.button>

            {successMsg && (
              <p className="text-sm text-green-600 font-medium">{successMsg}</p>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreatePhotos;
