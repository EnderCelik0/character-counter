import { motion } from "framer-motion";

export default function Heading() {
  return (
    <motion.h1 className="text-preset-1 mx-auto max-w-[510px] text-center">
      Analyze your text in real-time.
    </motion.h1>
  );
}
