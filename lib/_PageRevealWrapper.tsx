// // components/PageRevealWrapper.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function PageRevealWrapper({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isRevealing, setIsRevealing] = useState(true);

//   useEffect(() => {
//     // Amint az új oldal betöltődött, a sávok kicsúsznak alulra (kb 0.8s)
//     const timer = setTimeout(() => {
//       setIsRevealing(false);
//       document.body.style.overflow = "";
//     }, 800);

//     return () => clearTimeout(timer);
//   }, []);

//   const columnExitVariants = {
//     initial: { y: "0%" },
//     animate: (index: number) => ({
//       y: "200%",
//       transition: {
//         duration: 0.7,
//         delay: index * 0.1,
//         ease: [0.76, 0, 0.24, 1],
//       },
//     }),
//   };

//   return (
//     <>
//       <AnimatePresence>
//         {isRevealing && (
//           <div className="fixed inset-0 z-[9999] pointer-events-none">
//             <div className="absolute inset-0 flex w-full h-full">
//               {[0, 1, 2].map((index) => (
//                 <motion.div
//                   key={index}
//                   custom={index}
//                   variants={columnExitVariants}
//                   initial="initial"
//                   animate="animate"
//                   className="w-1/3 h-full bg-slate-950 border-r border-slate-800/40 last:border-r-0"
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//       </AnimatePresence>

//       {/* Az oldal tényleges tartalma */}
//       {children}
//     </>
//   );
// }
