"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "./processSteps";

const SNAKE_SEGMENT_DURATION = 3.5;
const TOTAL_SEGMENTS = PROCESS_STEPS.length - 1;
const SNAKE_REPEAT_DELAY = (TOTAL_SEGMENTS - 1) * SNAKE_SEGMENT_DURATION;

export interface NeuronPathProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  segIndex: number;
  inView: boolean;
}

export function NeuronPath({ x1, y1, x2, y2, segIndex, inView }: NeuronPathProps) {
  const pathLen = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const d = `M ${x1} ${y1} L ${x2} ${y2}`;
  const segLen = pathLen * 0.35;

  return (
    <g>
      <path d={d} fill="none" strokeWidth="1" className="stroke-primary/15" />
      {inView && (
        <motion.path
          d={d}
          fill="none"
          strokeWidth="1.5"
          className="stroke-primary/65"
          style={{ strokeDasharray: `${segLen} ${pathLen * 3}` }}
          initial={{ strokeDashoffset: segLen }}
          animate={{ strokeDashoffset: -pathLen }}
          transition={{
            duration: SNAKE_SEGMENT_DURATION,
            delay: segIndex * SNAKE_SEGMENT_DURATION,
            repeat: Infinity,
            repeatDelay: SNAKE_REPEAT_DELAY,
            ease: "easeInOut",
          }}
        />
      )}
    </g>
  );
}
