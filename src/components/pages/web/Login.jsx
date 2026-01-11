// import React, { useState, useEffect } from "react";
// import { Heart } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { loginAdmin } from "../../../features/admin/adminSlice";
// import FullPageLoader from "../../utils/FullPageLoader";


// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { loading, error, isAuthenticated } = useSelector(
//     (state) => state.admin
//   );

//   const [formData, setFormData] = useState({
//     email: "amck.sharma@gmail.com",
//     password: "Neeraj@7088887210",
//   });

//   // Redirect if already logged in
//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate("/admin/dashboard", { replace: true });
//     }
//   }, [isAuthenticated, navigate]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const data = await dispatch(loginAdmin(formData)).unwrap();
//       console.log("Login Success:", data);
//       // Navigation handled by useEffect
//     } catch (err) {
//       console.error("Login Failed:", err);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen w-full bg-cover bg-center flex items-center justify-center relative"
//       style={{
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80')",
//       }}
//     >
//       {/* Full-page loader */}
//       {loading && <FullPageLoader />}

//       <div className="absolute inset-0 bg-black/50"></div>

//       <div className="relative z-10 w-full max-w-4xl flex flex-col md:flex-row items-center justify-end px-6 md:px-12">
//         <div className="hidden md:block md:w-1/2"></div>

//         <div
//           className="w-full md:w-1/2 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 relative"
//           style={{
//             backgroundImage:
//               "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80')",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>

//           <div className="relative z-10">
//             <h2 className="text-3xl font-semibold text-white text-center mb-6">
//               Welcome Back
//             </h2>

//             <form className="space-y-6" onSubmit={handleSubmit}>
//               <fieldset className="border border-white/20 p-4 rounded-lg relative">
//                 <legend className="flex items-center justify-center px-2 py-2 gap-10">
//                   {[...Array(5)].map((_, i) => (
//                     <Heart
//                       key={i}
//                       className={`text-pink-600 w-6 h-6 animate-pulse`}
//                     />
//                   ))}
//                 </legend>

//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-white mb-2">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     autoComplete="email"
//                     placeholder="Enter your email"
//                     className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                     required
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-white mb-2">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     autoComplete="current-password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="Enter your password"
//                     className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                     required
//                   />
//                 </div>

//                 {error && (
//                   <p className="text-red-400 text-sm font-medium mt-2 text-center">
//                     {error}
//                   </p>
//                 )}

//                 <div className="text-center mt-6">
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-md transition-all duration-300 shadow-lg hover:shadow-indigo-400/40 disabled:opacity-50"
//                   >
//                     Login
//                   </button>
//                 </div>
//               </fieldset>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FullPageLoader from "../../utils/FullPageLoader";
import { loginAdmin } from "../../../features/admin/adminSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.admin
  );

  const [formData, setFormData] = useState({
    email: "amck.sharma@gmail.com",
    password: "Neeraj@7088887210",
  });

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await dispatch(loginAdmin(formData)).unwrap();
      console.log("Login Success:", data);
    } catch (err) {
      console.error("Login Failed:", err);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Loader */}
      {loading && <FullPageLoader />}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 w-full max-w-md px-4 sm:px-6 min-h-[520px]  sm:min-h-[auto]">
        {/* Form container */}
        <div
          className="w-full bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-white/20 relative"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>

          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-3xl font-semibold text-white text-center mb-6">
              Welcome Back
            </h2>

            <form className="w-full space-y-5" onSubmit={handleSubmit}>
              <fieldset className="border border-white/20 p-4 rounded-lg relative">
                <legend className="flex items-center justify-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Heart
                      key={i}
                      className="text-pink-600 w-6 h-6 animate-pulse"
                    />
                  ))}
                </legend>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 rounded-md bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-white mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="w-full px-3 py-2 rounded-md bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    required
                  />
                </div>

                {/* Error */}
                {error && (
                  <p className="text-red-400 text-sm font-medium mt-2 text-center">
                    {error.message || error.error || "Something went wrong"}
                  </p>
                )}

                {/* Submit */}
                <div className="text-center mt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-md transition-all duration-300 shadow-lg hover:shadow-indigo-400/40 disabled:opacity-50"
                  >
                    Login
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

