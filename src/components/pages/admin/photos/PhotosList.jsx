import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye, Edit, Trash2, ImagePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPhotos } from "../../../../features/thunks/photosThunk";

const PhotosList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, photos } = useSelector((state) => state.photos);

  const [search, setSearch] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("All");
  const [selectedGallery, setSelectedGallery] = useState("All");

  useEffect(() => {
    dispatch(getAllPhotos());
  }, [dispatch]);

  console.log("Photos Data: ", photos)
  // ✅ FILTER LOGIC
  const filteredPhotos = photos.filter((photo) => {
    const matchCollection =
      selectedCollection === "All" ||
      photo?.collection === selectedCollection;

    const matchGallery =
      selectedGallery === "All" ||
      photo?.gallery?.galleryName === selectedGallery;

    const matchSearch =
      photo?.gallery?.galleryName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      photo?.collection
        ?.toLowerCase()
        .includes(search.toLowerCase());

    return matchCollection && matchGallery && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-white py-10 px-4 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-pink-600 flex items-center gap-2">
            <ImagePlus /> Photos Management
          </h1>

          <button
            onClick={() => navigate("/admin/photos/create")}
            className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 shadow"
          >
            + Create
          </button>
        </div>

        {/* Search */}
        <div className="flex justify-end mb-4">
          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search photos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-2xl shadow border bg-white">
          <table className="min-w-full">
            <thead className="bg-pink-100 text-pink-700">
              <tr>
                <th className="p-3 text-left">SL</th>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Gallery</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-10">
                    Loading photos...
                  </td>
                </tr>
              ) : filteredPhotos.length > 0 ? (
                filteredPhotos.map((photo, index) => (
                  <motion.tr
                    key={photo._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b hover:bg-pink-50"
                  >
                    <td className="p-3">{index + 1}</td>

                    <td className="p-3">
                      <img
                        src={photo?.images?.[0]?.url}
                        alt="photo"
                        className="w-20 h-16 object-cover rounded-md"
                      />
                    </td>

                    <td className="p-3 text-gray-600">
                      {photo?.gallery?.galleryName}
                    </td>

                    <td className="p-3 flex justify-center gap-3 text-pink-600">
                      <button onClick={() => navigate(`/admin/photos/view/${photo._id}`)}>
                        <Eye size={18} />
                      </button>
                      <button onClick={() => navigate(`/admin/photos/edit/${photo._id}`)}>
                        <Edit size={18} />
                      </button>
                      <button className="text-red-500">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-gray-500">
                    No photos found ✨
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default PhotosList;
