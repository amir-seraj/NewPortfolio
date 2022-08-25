import { FaUniversalAccess } from "react-icons/fa";

export const Button = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="Accessibility button"
    title="Accessibility button"
    className="absolute right-0 flex  items-center justify-center rounded-full bg-yellow-500 p-2 text-white transition duration-500 ease-in-out hover:rotate-[360deg] hover:scale-110"
  >
    <FaUniversalAccess className="w-auto h-8" />
  </button>
);
