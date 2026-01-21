import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, X } from "lucide-react";

const DeleteModal = ({
  isOpen,
  onConfirm,
  onCancel,
  title = "Delete Confirmation",
  message = "Are you sure you want to delete this item?",
}) => {
  const modalRef = useRef(null);

  /* 🔒 HARD SCROLL LOCK (works even with layouts) */
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.height = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [isOpen]);

  /* ❌ Outside click */
  useEffect(() => {
    const handleClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onCancel();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="
          fixed inset-0 z-[2147483647]
          h-screen w-screen
          flex items-center justify-center
          bg-black/80 backdrop-blur-lg
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          ref={modalRef}
          className="
            bg-white w-[92%] max-w-sm
            rounded-2xl shadow-2xl
            p-6 text-center relative
          "
          initial={{ scale: 0.85, y: 40, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.85, y: 40, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* ❌ Close */}
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 text-gray-500 hover:text-pink-600"
          >
            <X size={20} />
          </button>

          {/* Content */}
          <div className="flex flex-col items-center">
            <Trash2 className="text-pink-600 mb-3" size={48} />

            <h2 className="text-lg font-bold text-gray-800 mb-2">
              {title}
            </h2>

            <p className="text-gray-600 mb-6">{message}</p>

            <div className="flex gap-3">
              <button
                onClick={onConfirm}
                className="bg-pink-600 text-white px-5 py-2.5 rounded-lg hover:bg-pink-700"
              >
                Yes, Delete
              </button>

              <button
                onClick={onCancel}
                className="border px-5 py-2.5 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default DeleteModal;
