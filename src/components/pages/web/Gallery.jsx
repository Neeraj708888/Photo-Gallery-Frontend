import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getSingleGallery } from "../../../features/thunks/galleryThunk";
import Photos from "./Photos";

const Gallery = () => {
    const { galleryId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const { singleGallery, loading } = useSelector(
        (state) => state.galleries
    );

    useEffect(() => {
        if (galleryId) dispatch(getSingleGallery(galleryId));
    }, [dispatch, galleryId]);

    const handleOpenPhotos = () => {
        setIsOpen(prev => !prev);
    };

    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [hash]);

    if (loading) {
        return <p className="text-center py-20">Loading...</p>;
    }

    if (!singleGallery) {
        return (
            <p className="text-center py-20 text-red-500">
                Gallery not found
            </p>
        );
    }

    return (
        <section
            id="gallery"
            className="min-h-screen bg-gradient-to-b from-pink-100 via-rose-100 to-white py-16 px-4 mt-16"
        >
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="
                    max-w-7xl mx-auto
                    bg-white/80 backdrop-blur-xl
                    rounded-3xl shadow-2xl
                    border border-pink-200 overflow-hidden
                "
            >
                {/* MAIN GRID */}
                <div className="grid lg:grid-cols-2">

                    {/* 🌸 LEFT IMAGE (FULL SCREEN ON MOBILE) */}
                    <div className="
                        relative
                        h-[85vh]           /* ✅ Mobile Full Height */
                        lg:h-auto
                        lg:min-h-[520px]
                    ">
                        <motion.img
                            src={singleGallery?.images?.[0]?.url}
                            alt={singleGallery?.galleryName}
                            className="w-full h-full object-cover"
                            initial={{ scale: 1.08 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.8 }}
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-transparent" />

                        {/* Title */}
                        <div className="absolute bottom-10 left-6 right-6">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">
                                📸 {singleGallery?.galleryName}
                            </h2>
                        </div>
                    </div>

                    {/* 🌸 RIGHT CONTENT */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center space-y-6">
                        <div>
                            <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-2">
                                About This Gallery
                            </h3>
                            <p className="text-pink-700 italic leading-relaxed text-[15px]">
                                This gallery is a thoughtfully curated visual journey that
                                captures emotions, candid moments, and timeless memories.
                                Every photograph reflects elegance, love, and storytelling,
                                preserving moments that deserve to be remembered forever.
                                Crafted with care, this collection transforms fleeting moments
                                into everlasting impressions.
                            </p>
                        </div>

                        <div className="flex gap-4 flex-wrap">
                            <button
                                onClick={() => navigate(-1)}
                                className="
                                    px-6 py-2.5 rounded-lg
                                    bg-pink-600 text-white
                                    hover:bg-pink-700 transition
                                    shadow-md
                                "
                            >
                                Back
                            </button>

                            <button
                                onClick={handleOpenPhotos}
                                className="
                                    px-6 py-2.5 rounded-lg
                                    border border-pink-300 text-pink-700
                                    hover:bg-pink-50 transition
                                "
                            >
                                View Photos
                            </button>
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="bg-pink-50 border-t border-pink-200 py-4 text-center">
                    <p className="text-sm text-pink-700 font-medium">
                        💞 Preserving Moments, Creating Memories 💞
                    </p>
                </div>
            </motion.div>

            {/* PHOTOS SECTION */}
            {isOpen && <Photos images={singleGallery.images} />}
        </section>
    );
};

export default Gallery;
