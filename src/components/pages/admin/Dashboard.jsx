import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Heart, Camera, Image, Star, Gift } from "lucide-react";

const Dashboard = () => {
  const collections = [
    { id: 1, name: "Haldi Ceremony", count: 48, icon: <Camera className="text-yellow-500" /> },
    { id: 2, name: "Mehendi Moments", count: 36, icon: <Image className="text-green-500" /> },
    { id: 3, name: "Sangeet Night", count: 27, icon: <Star className="text-pink-500" /> },
    { id: 4, name: "Wedding Day", count: 63, icon: <Heart className="text-red-500" /> },
    { id: 5, name: "Reception", count: 22, icon: <Gift className="text-purple-500" /> },
  ];

  const total = collections.reduce((sum, c) => sum + c.count, 0);

  // 🔢 Animated Counter Setup
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    const controls = animate(count, total, { duration: 2.5, ease: "easeOut" });
    return controls.stop;
  }, [total, count]);

  return (
    <div
      className="relative min-h-screen p-6 sm:p-10 flex flex-col items-center overflow-x-hidden"
      style={{
        background: "linear-gradient(to bottom right, #fff5f8, #fde9f3, #fce2e2)",
      }}
    >
      {/* Marriage Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529634899703-4c1e6e8ef91e?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center opacity-25 blur-sm"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white/70 dark:via-black/40 dark:to-black/70"></div>

      <div className="relative z-10 w-full max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col px-14  sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h1 className="text-3xl font-extrabold text-pink-700 flex items-center gap-5 ">
              💍 Wedding Collection Dashboard
            </h1>
          </div>
          <p className="text-gray-600 mt-2 px-14 text-start">
            Celebrate every ceremony — track your wedding memories in one place.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid ml-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((col, index) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex items-center gap-4 border border-pink-100"
            >
              <div className="p-3 bg-pink-50 rounded-xl">{col.icon}</div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800">{col.name}</h2>
                <p className="text-3xl font-bold text-pink-600 mt-1">{col.count}</p>
                <p className="text-sm text-gray-400">Photos</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total Memories — Glowing Round Counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          className="flex justify-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="relative w-64 h-64 rounded-full flex flex-col items-center justify-center bg-gradient-to-tr from-pink-500 to-rose-400 text-white shadow-[0_0_30px_rgba(236,72,153,0.6)]"
          >
            {/* Border Glow */}
            <div className="absolute inset-0 rounded-full border-[6px] border-white/30 animate-pulse"></div>

            {/* Soft Glow Pulse */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute inset-0 bg-pink-400/30 blur-2xl rounded-full"
            ></motion.div>

            <h2 className="text-xl font-semibold z-10">Total Memories</h2>

            {/* 💫 Animated Count */}
            <motion.p
              className="text-6xl font-extrabold z-10 mt-2"
              style={{ color: "#fff" }}
            >
              {rounded}
            </motion.p>

            <p className="text-sm text-pink-100 z-10">Captured Moments</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
