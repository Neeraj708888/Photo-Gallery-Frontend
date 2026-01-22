import { X } from "lucide-react";
import React, { useEffect } from "react";

const PhotoModal = ({ photo, onClose }) => {
    if (!photo) return null;

    // 🔒 Lock background scroll
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-xl max-w-4xl w-[90%] overflow-hidden relative animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
            >
                {/* ❌ Close Button */}
                <button
                    onClick={onClose}
                    className="
                        absolute top-3 right-3 z-10
                        hover:text-black text-2xl p-3
                        rounded-full bg-gradient-to-tr
                        from-red-500 via-pink-500 to-orange-400
                        text-white hover:scale-110
                        transition-transform shadow-md
                    "
                >
                    <X className="w-5 h-5 font-bold" strokeWidth={4} />
                </button>

                {/* Image Section */}
                <div className="w-full h-[80vh] bg-black flex items-center justify-center">
                    <img
                        src={photo.url}
                        alt="Gallery"
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default PhotoModal;
