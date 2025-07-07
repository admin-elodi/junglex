// import React, { useState } from 'react';
// import { motion as Motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { useAuth } from '@/context/AuthContext'; // Correct import: only useAuth hook

// const AuthForm = () => {
//   const { login } = useAuth(); // Use login function from context
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState('');

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!formData.email.includes('@') || !formData.email.includes('.')) {
//       setError('Please enter a valid email address (e.g., user@domain.com).');
//       return;
//     }
//     if (formData.password.length < 8) {
//       setError('Password must be at least 8 characters long.');
//       return;
//     }

//     try {
//       await login(formData.email, formData.password);
//       console.log('Login successful:', formData);
//       // Redirect or further actions after login
//     } catch (err) {
//       setError(err.message || 'Login failed. Please try again.');
//     }
//   };

//   return (
//     <Motion.div
//       className="border border-emerald-500 bg-black/50 p-8 rounded-xl shadow-2xl w-full max-w-md relative"
//       style={{
//         backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='%23FFD700' fill-opacity='0.1'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3Cpath d='M20 20l10-10M20 20L10 10M20 20l10 10M20 20L10 30'/%3E%3C/g%3E%3C/svg%3E")`,
//       }}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <Motion.h2
//         className="text-3xl font-bold text-emerald-300 mb-6 text-center font-ubuntu"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.2, duration: 0.5 }}
//       >
//         Login
//       </Motion.h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label
//             className="block text-emerald-200 font-medium mb-1 text-sm font-ubuntu"
//             htmlFor="email"
//           >
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             className="w-full px-4 py-2 bg-sand/20 border border-emerald-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:shadow-[0_0_8px_rgba(0,255,127,0.5)] transition-all duration-300 text-white text-sm"
//             placeholder="Your email address"
//             aria-required="true"
//             autoComplete="email"
//           />
//         </div>
//         <div>
//           <label
//             className="block text-emerald-200 font-medium mb-1 text-sm font-ubuntu"
//             htmlFor="password"
//           >
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             className="w-full px-4 py-2 bg-sand/20 border border-emerald-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:shadow-[0_0_8px_rgba(0,255,127,0.5)] transition-all duration-300 text-white text-sm"
//             placeholder="Your password"
//             aria-required="true"
//             autoComplete="current-password"
//           />
//         </div>
//         {error && (
//           <p
//             className="text-red-400 text-xs text-center font-ubuntu"
//             role="alert"
//             aria-live="assertive"
//           >
//             {error}
//           </p>
//         )}
//         <Motion.button
//           type="submit"
//           className="w-full cursor-pointer py-2 bg-emerald-500 text-black font-bold rounded-lg hover:bg-emerald-600 transition-all duration-300 shadow-md text-sm font-ubuntu"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           aria-label="Log in to JungleX"
//         >
//           Login
//         </Motion.button>
//       </form>
//       <Motion.div
//         className="mt-4 text-center"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.4, duration: 0.5 }}
//       >
//         <Link
//           to="/signup"
//           className="inline-block px-6 bg-sand text-emerald-500 font-bold rounded-lg hover:bg-sand/80 transition-all duration-300 text-sm font-ubuntu"
//           aria-label="Create a new JungleX account"
//         >
//           Create New Account
//         </Link>
//       </Motion.div>
//       <footer className="mt-8 pt-6 border-t border-emerald-500/30">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label
//               className="block text-emerald-200 font-medium mb-2 text-sm font-ubuntu"
//               htmlFor="language"
//             >
//               Language
//             </label>
//             <select
//               id="language"
//               disabled
//               className="w-full px-4 py-2 bg-sand/20 border border-emerald-500 rounded-lg text-emerald-200 text-sm font-ubuntu opacity-50 cursor-not-allowed"
//               aria-label="Language selection (coming soon)"
//             >
//               <option value="en">English (Coming Soon)</option>
//             </select>
//           </div>
//           <div>
//             <h3 className="text-emerald-200 font-medium mb-2 text-sm font-ubuntu">
//               Quick Links
//             </h3>
//             <ul className="space-y-2 text-sm font-ubuntu">
//               <li>
//                 <a
//                   href="/about"
//                   className="text-emerald-300 hover:text-emerald-100 transition-colors"
//                   aria-label="Learn more about JungleX"
//                 >
//                   About JungleX
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/privacy"
//                   className="text-emerald-300 hover:text-emerald-100 transition-colors"
//                   aria-label="JungleX Privacy Policy"
//                 >
//                   Privacy Policy
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/terms"
//                   className="text-emerald-300 hover:text-emerald-100 transition-colors"
//                   aria-label="JungleX Terms of Service"
//                 >
//                   Terms of Service
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/contact"
//                   className="text-emerald-300 hover:text-emerald-100 transition-colors"
//                   aria-label="Contact JungleX support"
//                 >
//                   Contact Us
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//         <small className="block text-center text-emerald-300/50 text-5xs mt-4 font-ubuntu whitespace-nowrap">
//           © {new Date().getFullYear()} Elodi Nigeria Enterprises. All rights reserved.
//         </small>
//       </footer>
//     </Motion.div>
//   );
// };

// export default React.memo(AuthForm);
