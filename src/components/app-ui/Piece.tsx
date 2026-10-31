import { motion } from "framer-motion";
import type { ReactNode } from "react";

const pieceVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

interface PieceProps {
  /** Reveal order. The block shows once `activeStep >= index`. */
  index: number;
  /** Highest step currently revealed (-1 = empty). */
  activeStep: number;
  children: ReactNode;
}

/**
 * A single buildable UI block. Springs into place when its step is reached.
 * Shared across every "buildable" phone screen so the assemble-in animation
 * stays identical everywhere.
 */
export function Piece({ index, activeStep, children }: Readonly<PieceProps>) {
  const shown = activeStep >= index;
  return (
    <motion.div
      variants={pieceVariants}
      initial="hidden"
      animate={shown ? "show" : "hidden"}
    >
      {children}
    </motion.div>
  );
}
