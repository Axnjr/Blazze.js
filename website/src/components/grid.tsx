import { motion } from 'framer-motion';
import "../App.css"

export function BackgroundGrid() {
  return (
    <div className="relative h-screen w-screen">
      <motion.div
        animate={{ 
            opacity: 1,
        }}
        className="moving-grid-background absolute h-[200%] w-full"
        initial={{ opacity: 0 }}

        transition={{ duration: 0.6, delay: 0.6 }}
      />
      <div className="absolute h-[110%] w-[100%]  shadow-black shadow-[inset_0_0_5rem_10rem]" />
    </div>
  );
}