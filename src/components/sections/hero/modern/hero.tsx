'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import TextReveal from '@/components/motion/text-reveal'
import Reveal from '@/components/reveal'
import ParallaxImage from '@/components/motion/parallax-image'
import { SiGmail, SiLinkedin, SiPaperspace, SiStandardresume } from '@icons-pack/react-simple-icons'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { Button } from '@/components/ui/button';
import { ArrowUpRightIcon } from 'lucide-react';

function Hero() {
  const container = useRef<HTMLDivElement>(null)
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const [isTooltipVisible2, setIsTooltipVisible2] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({
      x: e.clientX,
      y: e.clientY
    })
  }

  return (
    <section className="relative w-full min-h-[calc(100vh-6rem)] overflow-hidden pb-2">
      {/* Background container */}
      <div 
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: 'url("/images/hero_back.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content container */}
      <div className="relative z-10">
        <div className="relative z-10 h-[42.5dvh] md:h-[51.2dvh] md:min-h-[50dvh] xl:h-[61.2dvh]">
          <div className="relative flex h-full flex-col justify-center">
            <div className="flex w-full items-center justify-center px-4 md:px-6 pt-64">
              
              <h1 className="text-center text-white text-4xl font-light sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl">
                <div className="flex flex-col items-center justify-center gap-4 cursor-default">
                  <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ 
                      opacity: 1,
                      backgroundImage: [
                        "linear-gradient(45deg, #A855F7, #C084FC, #E9D5FF)",
                        "linear-gradient(90deg, #C084FC, #E9D5FF, #A855F7)",
                        "linear-gradient(135deg, #E9D5FF, #A855F7, #C084FC)",
                        "linear-gradient(180deg, #A855F7, #C084FC, #E9D5FF)"
                      ],
                      backgroundSize: "200% 200%",
                      backgroundPosition: ["0% 0%", "100% 100%"]
                    }}
                    transition={{ 
                      duration: 4,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className="inline-block font-semibold bg-clip-text text-transparent"
                    style={{
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}
                  >
                    Hey!
                  </motion.span>
                  <span className="text-white"> I&apos;m Daniel</span>
                </div>
                <span className="flex flex-col items-center gap-3 md:gap-4">
                  <Reveal>
                    
                    <p className="mt-2 text-base font-light italic md:text-lg lg:text-xl text-center text-white">
                      (Business + Computer Science + Data Science)
                    </p>
                    <div className="flex justify-center mt-6">
                      <div className="flex gap-6">
                        <a href="https://github.com/daniel1lima" target="_blank" rel="noopener noreferrer"> 
                          <SiGithub size={36} className="cursor-pointer hover:text-purple-600 transition-all duration-300 ease-in-out hover:translate-y-[-4px]" />
                        </a>
                        <a href="https://www.linkedin.com/in/danielbalima/" target="_blank" rel="noopener noreferrer">
                          <SiLinkedin size={36} className="cursor-pointer hover:text-blue-600 transition-all duration-300 ease-in-out hover:translate-y-[-4px]" />
                        </a>
                        <a href="mailto:damorosolima@gmail.com" target="_blank" rel="noopener noreferrer">
                          <SiGmail size={36} className="cursor-pointer hover:text-red-600 transition-all duration-300 ease-in-out hover:translate-y-[-4px]" />
                        </a>
                        
                      </div>
                    </div>
                    <div className="flex justify-center mt-10">
                      <div className="flex gap-4">
                        <Button asChild variant={'outline'} className="text-foreground">
                          <a href="resume.pdf" target="_blank">
                            View Resume <ArrowUpRightIcon className="ml-2 size-5" />
                          </a>
                        </Button>
                        <Button asChild variant={'outline'} className="text-foreground">
                          <a href="/blog">
                            Read Blog <ArrowUpRightIcon className="ml-2 size-5" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </Reveal>
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero