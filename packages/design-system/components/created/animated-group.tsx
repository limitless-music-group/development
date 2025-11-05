"use client";

import { cn } from "@packages/design-system/lib/utils";
import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type AnimatedGroupProps = {
  children: ReactNode;
  className?: string;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
};

export function AnimatedGroup({
  children,
  className,
  variants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
        },
      },
    },
  },
}: AnimatedGroupProps) {
  return (
    <motion.div
      animate="visible"
      className={cn(className)}
      initial="hidden"
      variants={variants.container}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={index} variants={variants.item}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={variants.item}>{children}</motion.div>
      )}
    </motion.div>
  );
}
