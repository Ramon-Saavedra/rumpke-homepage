"use client";

import { motion } from "framer-motion";
import { type ProcessStep } from "./processSteps";

const NODE_DURATION = 0.4;
const NODE_STAGGER = 0.15;
const PULSE_DURATION = 2.5;
const PULSE_REPEAT_DELAY = 0.8;

export interface StepNodeProps {
  step: ProcessStep;
  index: number;
  isActive: boolean;
  onSelect: (id: number) => void;
  inView: boolean;
}

export function StepNode({ step, index, isActive, onSelect, inView }: StepNodeProps) {
  const Icon = step.icon;

  return (
    <motion.button
      type="button"
      aria-pressed={isActive}
      aria-label={step.title}
      onClick={() => onSelect(step.id)}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
      transition={{ duration: NODE_DURATION, delay: index * NODE_STAGGER + 0.4, ease: "easeOut" }}
      className="flex flex-col items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:rounded-full group"
    >
      <div className="relative">
        {isActive && (
          <motion.span
            className="absolute inset-0 rounded-full bg-primary"
            initial={{ opacity: 0.35, scale: 1 }}
            animate={{ opacity: 0, scale: 1.85 }}
            transition={{ duration: PULSE_DURATION, repeat: Infinity, repeatDelay: PULSE_REPEAT_DELAY, ease: "easeOut" }}
          />
        )}
        <div className={`relative z-10 w-10 h-10 rounded-full border-2 flex cursor-pointer items-center justify-center transition-colors duration-300 ${
          isActive
            ? "bg-primary border-primary text-white"
            : "bg-bgSecondary-l dark:bg-bgSecondary-d border-primary/40 text-primary group-hover:border-primary"
        }`}>
          <Icon size={18} strokeWidth={1.6} />
        </div>
      </div>

      <div className="text-center w-32 text-balance">
        <p className="text-[10px] font-semibold tracking-widest text-primary uppercase mb-0.5">
          {step.label}
        </p>
        <p className={`text-xs font-semibold leading-snug transition-colors duration-300 ${
          isActive ? "text-primary" : "text-foreground group-hover:text-primary"
        }`}>
          {step.title}
        </p>
      </div>
    </motion.button>
  );
}
