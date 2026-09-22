// // app/loading.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function Loading() {
//   const [showContent, setShowContent] = useState(false);

//   useEffect(() => {
//     // 1. Görgetés letiltása a betöltés alatt
//     document.body.style.overflow = "hidden";

//     // 2. Megvárjuk, amíg a sávok leérnek (kb. 0.8s), majd megmutatjuk a szöveget
//     const timer = setTimeout(() => {
//       setShowContent(true);
//     }, 800);

//     return () => {
//       document.body.style.overflow = "";
//       clearTimeout(timer);
//     };
//   }, []);

//   // Sávok leúszó animációja (In: -200% Y -> 0% Y)
//   const columnVariants = {
//     initial: { y: "-200%" },
//     animate: (index: number) => ({
//       y: "0%",
//       transition: {
//         duration: 0.7,
//         delay: index * 0.15,
//         ease: [0.76, 0, 0.24, 1],
//       },
//     }),
//   };

//   // Szöveg felbukkanása (Fade Up)
//   const textVariants = {
//     initial: { opacity: 0, y: 20 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, ease: "easeOut" },
//     },
//   };

//   return (
//     <div className="fixed inset-0 z-[9999] pointer-events-auto">
//       {/* 1. A 3 sáv (fentről lecsúsznak) */}
//       <div className="absolute inset-0 flex w-full h-full">
//         {[0, 1, 2].map((index) => (
//           <motion.div
//             key={index}
//             custom={index}
//             variants={columnVariants}
//             initial="initial"
//             animate="animate"
//             className="w-1/3 h-full bg-slate-950 border-r border-slate-800/40 last:border-r-0"
//           />
//         ))}
//       </div>

//       {/* 2. Szöveg a sávok tetején */}
//       <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
//         <AnimatePresence>
//           {showContent && (
//             <motion.div
//               variants={textVariants}
//               initial="initial"
//               animate="animate"
//               className="flex flex-col items-center text-center px-4"
//             >
//               <motion.h1
//                 animate={{ opacity: [0.8, 1, 0.8] }}
//                 transition={{
//                   repeat: Infinity,
//                   duration: 1.8,
//                   ease: "easeInOut",
//                 }}
//                 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase"
//               >
//                 prefer site
//               </motion.h1>

//               <motion.p
//                 animate={{ opacity: [0.5, 0.9, 0.5] }}
//                 transition={{
//                   repeat: Infinity,
//                   duration: 1.8,
//                   ease: "easeInOut",
//                   delay: 0.2,
//                 }}
//                 className="mt-3 text-sm md:text-base font-medium tracking-[0.3em] text-indigo-400 uppercase"
//               >
//                 webfejlesztés
//               </motion.p>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }
