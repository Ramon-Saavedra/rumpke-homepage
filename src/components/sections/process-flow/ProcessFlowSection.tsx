"use client";

import { useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { PROCESS_STEPS, TYPEWRITER_PHRASES } from "./processSteps";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useElementWidth } from "@/hooks/useElementWidth";
import { StepNode } from "./StepNode";
import { NeuronPath } from "./NeuronPath";

const CONTAINER_H = 190;
const ICON_HALF_H = 20;
const NODE_POSITIONS = [
  { x: 10, y: 28 }, { x: 30, y: 62 }, { x: 50, y: 28 },
  { x: 70, y: 62 }, { x: 90, y: 28 },
] as const;

export default function ProcessFlowSection() {
  const [activeId, setActiveId] = useState<number>(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { ref: desktopRef, width: containerW } = useElementWidth<HTMLDivElement>();
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const typewriterText = useTypewriter(TYPEWRITER_PHRASES);
  const activeStep = PROCESS_STEPS.find((s) => s.id === activeId) ?? PROCESS_STEPS[0];
  const lastIndex = PROCESS_STEPS.length - 1;

  const nodeCoords = useMemo(
    () => NODE_POSITIONS.map(({ x, y }) => ({
      x: (x / 100) * containerW,
      y: (y / 100) * CONTAINER_H,
    })),
    [containerW]
  );

  return (
    <section aria-label="Unser Prozess" className="w-full px-4 sm:px-6 py-12 relative mb-12">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,rgb(0_0_0/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(0_0_0/0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-size-[40px_40px] mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent),linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] mask-intersect"
      />
      <div ref={sectionRef}>

        <div className="text-center mb-10">
          <span className="text-xs font-semibold tracking-widest text-primary uppercase block mb-3">
            Wie es funktioniert
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Unser Prozess
          </h2>
          <p className="text-sm text-card-text-l dark:text-card-text-d min-h-5">
            {typewriterText}<span className="text-primary animate-pulse">|</span>
          </p>
        </div>

        <div ref={desktopRef} className="hidden lg:block relative" style={{ height: CONTAINER_H }}>
          {containerW > 0 && (
            <svg
              width={containerW}
              height={CONTAINER_H}
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
            >
              {PROCESS_STEPS.map((_, i) =>
                i < lastIndex ? (
                  <NeuronPath
                    key={i}
                    x1={nodeCoords[i].x}
                    y1={nodeCoords[i].y}
                    x2={nodeCoords[i + 1].x}
                    y2={nodeCoords[i + 1].y}
                    segIndex={i}
                    inView={inView}
                  />
                ) : null
              )}
            </svg>
          )}

          {PROCESS_STEPS.map((step, i) => (
            <div
              key={step.id}
              className="absolute"
              style={{
                left: `${NODE_POSITIONS[i].x}%`,
                top: `${NODE_POSITIONS[i].y}%`,
                transform: `translateX(-50%) translateY(-${ICON_HALF_H}px)`,
              }}
            >
              <StepNode
                step={step}
                index={i}
                isActive={activeId === step.id}
                onSelect={setActiveId}
                inView={inView}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:hidden">
          {PROCESS_STEPS.map((step, i) => (
            <div
              key={step.id}
              className="flex justify-center w-[calc(50%-0.75rem)] sm:w-[calc(33.333%-1rem)] md:w-[calc(20%-1rem)]"
            >
              <StepNode
                step={step}
                index={i}
                isActive={activeId === step.id}
                onSelect={setActiveId}
                inView={inView}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 min-h-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mx-auto max-w-xl text-center"
            >
              <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-1">
                {activeStep.label} — {activeStep.title}
              </p>
              <p className="text-sm leading-relaxed text-card-text-l dark:text-card-text-d">
                {activeStep.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
