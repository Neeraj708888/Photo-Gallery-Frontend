import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleGallery } from "../../../../features/thunks/galleryThunk";

const ViewGallery = () => {

  const { galleryId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { singleGallery, loading } = useSelector(state => state.galleries);

  useEffect(() => {
    if (galleryId)
      dispatch(getSingleGallery(galleryId));
  }, [dispatch, galleryId]);
  console.log("Single Gallery Data: ", singleGallery);

  // Loading
  if (loading) return (
    <p className="text-center mt-10">Loading...</p>
  )

  if (!singleGallery && !loading) return (
    <p className="text-center mt-10 text-red-500">Gallery not found</p>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-rose-100 to-white flex items-center justify-center py-10 px-4">
      <motion.div
        className="max-w-4xl w-full bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-pink-200 overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-pink-200 bg-pink-50">
          <h2 className="text-2xl font-bold text-pink-700">💒 View Gallery Details</h2>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-all"
          >
            <ArrowLeft size={18} /> Back
          </button>
        </div>

        {/* Content */}
        <div className="p-6 grid md:grid-cols-2 gap-6 items-start">
          {/* Thumbnail */}
          <motion.div
            className="rounded-xl overflow-hidden shadow-md border border-pink-100"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={singleGallery?.thumbnail?.url}
              alt={singleGallery.galleryName}
              className="w-full h-80 object-cover"
            />
          </motion.div>

          {/* Info Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm text-gray-500 uppercase">Gallery Name</h3>
                <p className="text-lg font-semibold text-gray-800">{singleGallery.galleryName}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 uppercase">Collection Name</h3>
                <p className="text-lg font-semibold text-gray-800">{singleGallery.collection.collectionName}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm text-gray-500 uppercase">Description</h3>
              <p className="text-pink-700 italic">{singleGallery.description || "NA"}</p>
            </div>

            <div>
              <h3 className="text-sm text-gray-500 uppercase">Status</h3>
              <p className="flex items-center gap-2 font-semibold">
                {singleGallery.status ? (
                  <span className="text-green-600 flex items-center gap-1">
                    <CheckCircle size={18} /> Active
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center gap-1">
                    <XCircle size={18} /> Inactive
                  </span>
                )}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm text-gray-500 uppercase">Created At</h3>
                <p className="font-semibold text-gray-700">{new Date(singleGallery.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 uppercase">Last Updated</h3>
                <p className="font-semibold text-gray-700">{new Date(singleGallery.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-pink-200 bg-pink-50 text-center">
          <p className="text-sm text-pink-700 font-medium">
            💞 A Collection of Everlasting Memories 💞
          </p>
        </div>
      </motion.div >
    </div >
  );
};

export default ViewGallery;
