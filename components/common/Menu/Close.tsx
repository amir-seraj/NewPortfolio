import { motion } from "framer-motion";
import { VscChromeClose } from "react-icons/vsc";

export const CloseButton = ({ onClose }) => {
  return (
    <motion.button
      className="fixed flex items-center gap-2 group right-8 top-7 md:right-12"
      onClick={onClose}
      initial={{ y: -60, opacity: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <VscChromeClose className="w-auto h-6 transition duration-300 ease-in-out transform group-hover:rotate-90 group-hover:text-yellow-500" />
      <span className="text-sm tracking-widest uppercase font-heading group-hover:scale-95">
        Close
      </span>
    </motion.button>
  );
};
