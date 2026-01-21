import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleGallery } from "../../../../features/thunks/galleryThunk";

const IMAGES_PER_LOAD = 7;

const ViewGallery = () => {
  const { galleryId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { singleGallery, loading } = useSelector(
    (state) => state.galleries
  );

  const [activeImage, setActiveImage] = useState(null);
  const [visibleCount, setVisibleCount] = useState(IMAGES_PER_LOAD);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    if (galleryId) dispatch(getSingleGallery(galleryId));
  }, [dispatch, galleryId]);

  useEffect(() => {
    if (singleGallery?.images?.length > 0) {
      setActiveImage(singleGallery.images[0].url);
      setVisibleCount(IMAGES_PER_LOAD);
    }
  }, [singleGallery]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!singleGallery) {
    return (
      <p className="text-center mt-10 text-red-500">Gallery not found</p>
    );
  }

  const totalImages = singleGallery.images || [];
  const visibleImages = totalImages.slice(0, visibleCount);
  const hasMore = visibleCount < totalImages.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + IMAGES_PER_LOAD);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-rose-100 to-white py-10 px-4">
      <motion.div
        className="max-w-6xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-pink-200 overflow-hidden "
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-pink-200 bg-pink-50">
          <h2 className="text-2xl font-bold text-pink-700">
            💒 View Gallery Details
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
          >
            <ArrowLeft size={18} /> Back
          </button>
        </div>

        {/* Content */}
        <div className="p-6 grid md:grid-cols-2 gap-6">

          {/* Main Image */}
          <motion.div
            className="rounded-xl overflow-hidden shadow-md border border-pink-100"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {activeImage && (
              <motion.img
                key={activeImage}
                src={activeImage}
                alt="Active"
                className="w-full h-80 object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            )}
          </motion.div>

          {/* Info */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm text-gray-500 uppercase">
                  Gallery Name
                </h3>
                <p className="text-lg font-semibold">
                  {singleGallery.galleryName}
                </p>
              </div>

              <div>
                <h3 className="text-sm text-gray-500 uppercase">
                  Collection
                </h3>
                <p className="text-lg font-semibold">
                  {singleGallery.collection?.collectionName}
                </p>
              </div>
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
          </div>
        </div>

        {/* All Photos */}
        <div className="bg-white rounded-xl border border-pink-200 p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-pink-700 mb-3">
            📸 All Photos
          </h3>

          <div className="flex gap-4 overflow-x-auto pb-2 items-center">
            {visibleImages.map((img) => (
              <motion.div
                key={img._id}
                className="relative h-28 w-40 min-w-[10rem]"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: loadedImages[img._id] ? 1 : 0,
                  scale: loadedImages[img._id] ? 1 : 0.95,
                }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={img.url}
                  alt="Gallery"
                  onLoad={() =>
                    setLoadedImages((prev) => ({
                      ...prev,
                      [img._id]: true,
                    }))
                  }
                  onClick={() => setActiveImage(img.url)}
                  className={`h-full w-full object-cover rounded-lg border cursor-pointer
                    ${activeImage === img.url
                      ? "border-pink-500 ring-2 ring-pink-300"
                      : "border-pink-100"
                    }`}
                />
              </motion.div>
            ))}

            {/* Load More Card */}
            {hasMore && (
              <motion.div
                onClick={handleLoadMore}
                whileHover={{ scale: 1.05 }}
                className="h-28 w-40 min-w-[10rem] flex flex-col items-center justify-center
                           border-2 border-dashed border-pink-400 rounded-lg
                           cursor-pointer bg-pink-50 hover:bg-pink-100 transition"
              >
                <span className="text-pink-700 font-semibold text-sm">
                  + Load More
                </span>
                <span className="text-xs text-pink-500">
                  {totalImages.length - visibleCount} more
                </span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-pink-200 bg-pink-50 text-center">
          <p className="text-sm text-pink-700 font-medium">
            💞 A Collection of Everlasting Memories 💞
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ViewGallery;
