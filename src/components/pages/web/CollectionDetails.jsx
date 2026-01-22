import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Image as ImageIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCollection } from "../../../features/thunks/collectionThunk";

const CollectionDetails = () => {
    const { collectionId } = useParams();
    const dispatch = useDispatch();
    const { singleCollection } = useSelector((state) => state.collections);

    useEffect(() => {
        if (collectionId) dispatch(getSingleCollection(collectionId));
    }, [dispatch, collectionId]);

    return (
        <div className="min-h-screen mt-16 bg-gradient-to-b from-pink-100 via-rose-100 to-white py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="
          max-w-6xl mx-auto
          bg-white/80 backdrop-blur-xl
          rounded-[2rem] shadow-2xl
          border border-pink-200 overflow-hidden
        "
            >
                <div className="grid lg:grid-cols-2">

                    {/* 🌸 LEFT SIDE – VISUAL (Premium Look) */}
                    <div className="relative min-h-[340px] lg:min-h-full">
                        <motion.img
                            src={singleCollection?.thumbnail?.url}
                            alt={singleCollection?.collectionName}
                            className="absolute inset-0 w-full h-full object-cover"
                            initial={{ scale: 1.08 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.8 }}
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-transparent" />

                        {/* Text Overlay */}
                        <div className="absolute bottom-8 left-8 right-8">
                            <h2 className="text-3xl font-bold text-white tracking-wide drop-shadow-xl">
                                💍 {singleCollection?.collectionName}
                            </h2>

                            <p className="mt-3 text-pink-100 italic leading-relaxed max-w-md">
                                A timeless wedding collection capturing rituals, emotions,
                                celebrations, and love stories woven into unforgettable moments.
                            </p>
                        </div>
                    </div>

                    {/* 🌸 RIGHT SIDE – CONTENT */}
                    <div className="p-8 lg:p-10 flex flex-col justify-between">

                        {/* Description */}
                        <div>
                            <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-3">
                                About This Collection
                            </h3>

                            <p className="text-pink-700 italic leading-relaxed text-[15px]">
                                This wedding collection beautifully preserves the essence of love,
                                traditions, and celebrations shared by the couple and their families.
                                From sacred rituals and emotional vows to joyful laughter and candid
                                moments, every photograph tells a heartfelt story. Carefully curated
                                with elegance, this collection transforms precious memories into
                                timeless visuals that can be cherished for generations to come.
                            </p>
                        </div>

                        {/* Info Cards */}
                        <div className="mt-8 grid sm:grid-cols-2 gap-5">
                            <div className="flex items-center gap-4 p-4 rounded-xl
                bg-pink-50 border border-pink-200">
                                <CalendarDays className="text-pink-600" size={22} />
                                <div>
                                    <p className="text-xs text-gray-500">Created At</p>
                                    <p className="font-semibold text-gray-800">
                                        {singleCollection?.createdAt
                                            ? new Date(singleCollection.createdAt).toLocaleDateString()
                                            : "—"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-xl
                bg-pink-50 border border-pink-200">
                                <CalendarDays className="text-pink-600" size={22} />
                                <div>
                                    <p className="text-xs text-gray-500">Updated At</p>
                                    <p className="font-semibold text-gray-800">
                                        {singleCollection?.updatedAt
                                            ? new Date(singleCollection.updatedAt).toLocaleDateString()
                                            : "—"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer Info */}
                        <div className="mt-8 flex items-center gap-2 text-sm font-medium text-pink-700">
                            <ImageIcon size={18} />
                            {singleCollection?.total || 0} Galleries Included
                        </div>
                    </div>
                </div>

                {/* 🌸 BOTTOM FOOTER */}
                <div className="bg-pink-50 border-t border-pink-200 py-4 text-center">
                    <p className="text-sm text-pink-700 font-medium tracking-wide">
                        💞 Capturing Love, Laughter & Forever Moments 💞
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default CollectionDetails;
