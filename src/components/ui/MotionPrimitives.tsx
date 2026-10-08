"use client";

import { motion, HTMLMotionProps, Variants } from "framer-motion";
import { rezanFadeUp, rezanReveal, rezanEditorialStagger, rezanImageReveal, rezanMaskReveal } from "@/design-system/motion";
import React from "react";

type MotionProps = HTMLMotionProps<"div">;

export function MotionDiv({ children, variants = rezanFadeUp, className, ...props }: MotionProps & { variants?: Variants }) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionSection({ children, variants = rezanReveal, className, ...props }: HTMLMotionProps<"section"> & { variants?: Variants }) {
  return (
    <motion.section
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}

export function MotionStaggerGroup({ children, className, stagger = 0.1, delay = 0, ...props }: MotionProps & { stagger?: number, delay?: number }) {
  return (
    <motion.div
      variants={rezanEditorialStagger(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionImageReveal({ children, className, ...props }: MotionProps) {
  return (
    <motion.div
      variants={rezanMaskReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className={className}
      {...props}
    >
      <motion.div variants={rezanImageReveal} className="w-full h-full relative">
        {children}
      </motion.div>
    </motion.div>
  );
}

export function MotionItem({ children, className, variants = rezanFadeUp, ...props }: MotionProps & { variants?: Variants }) {
  return (
    <motion.div
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
