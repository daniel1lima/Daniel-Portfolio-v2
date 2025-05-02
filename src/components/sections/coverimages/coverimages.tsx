'use client'

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParallaxImage from "@/components/motion/parallax-image";


function CoverImages() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isTooltipVisible2, setIsTooltipVisible2] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const container = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({
      x: e.clientX,
      y: e.clientY
    })
  }

  return (
    <div className="relative z-10 flex flex-col md:flex-row gap-4 md:gap-6">
          <div
            className="relative flex-1"
            onMouseEnter={() => setIsTooltipVisible(true)}
            onMouseLeave={() => setIsTooltipVisible(false)}
            onMouseMove={handleMouseMove}
          >
            <ParallaxImage
              src="/images/hero.jpg"
              containerRef={container}
              alt="Hero image"
              containerClassName="aspect-[4/2] w-full"
              priority
              parallaxOptions={{
                yStart: '-5%',
                yEnd: '5%',
                scaleStart: 1,
                scaleEnd: 1.2
              }}
            />
            <AnimatePresence>
              {isTooltipVisible && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed pointer-events-none z-50 bg-black bg-opacity-75 text-white px-3 py-2 rounded-md"
                  style={{
                    left: mousePos.x + 10,
                    top: mousePos.y + 10
                  }}
                >
                  <p className="text-md">Produhacks 2023 @ UBC</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div
            className="relative flex-1"
            onMouseEnter={() => setIsTooltipVisible2(true)}
            onMouseLeave={() => setIsTooltipVisible2(false)}
            onMouseMove={handleMouseMove}
          >
            <ParallaxImage
              src="/images/INNER_059.jpg"
              containerRef={container}
              alt="Inner image"
              containerClassName="aspect-[4/2] w-full"
              priority
              parallaxOptions={{
                yStart: '-5%',
                yEnd: '5%',
                scaleStart: 1,
                scaleEnd: 1.2
              }}
            />
            <AnimatePresence>
              {isTooltipVisible2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed pointer-events-none z-50 bg-black bg-opacity-75 text-white px-3 py-2 rounded-md"
                  style={{
                    left: mousePos.x + 10,
                    top: mousePos.y + 10
                  }}
                >
                  <p className="text-sm">Inner AI 2024 Tech Fair</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
  )
}

export default CoverImages;