import React from 'react';
import Marquee from 'react-fast-marquee';
import { 
  SiReact, SiTypescript, SiJavascript, 
  SiPython, SiNodedotjs, SiGit,
  SiDocker, SiMongodb, SiPostgresql, 
  SiTailwindcss, SiNextdotjs,
  SiRust, SiCplusplus, SiAmazonwebservices, SiRubyonrails, SiGo,
  SiMysql, SiFlask, SiDjango,
  SiRedis, SiTensorflow, SiPandas,
  SiDatadog, SiVercel, SiSupabase,
  SiDeno, SiSelenium, SiNeo4j
} from '@icons-pack/react-simple-icons';

import MotionWrap from '@/components/motion-wrap';
import Reveal from '@/components/reveal';

function Scroller() {
  const iconSize = 40;
  const iconStyle = "mx-8 text-gray-700 hover:text-primary transition-colors";
   
  return (
    <MotionWrap className="w-full py-4 lg:py-4" id="scroller">
      <Marquee gradient={false} speed={50} autoFill={true}>
        {/* Languages */}
        <SiPython size={iconSize} className={iconStyle} />
        <SiTypescript size={iconSize} className={iconStyle} />
        <SiJavascript size={iconSize} className={iconStyle} />
        <SiRust size={iconSize} className={iconStyle} />
        <SiCplusplus size={iconSize} className={iconStyle} />
        <SiGo size={iconSize} className={iconStyle} />
        
        {/* Frameworks & Libraries */}
        <SiReact size={iconSize} className={iconStyle} />
        <SiNextdotjs size={iconSize} className={iconStyle} />
        <SiDeno size={iconSize} className={iconStyle} />
        <SiFlask size={iconSize} className={iconStyle} />
        <SiDjango size={iconSize} className={iconStyle} />
        <SiRubyonrails size={iconSize} className={iconStyle} />
        <SiTensorflow size={iconSize} className={iconStyle} />
        <SiPandas size={iconSize} className={iconStyle} />
        
        {/* Databases & Tools */}
        <SiMysql size={iconSize} className={iconStyle} />
        <SiRedis size={iconSize} className={iconStyle} />
        <SiMongodb size={iconSize} className={iconStyle} />
        <SiPostgresql size={iconSize} className={iconStyle} />
        <SiNeo4j size={iconSize} className={iconStyle} />
        <SiSupabase size={iconSize} className={iconStyle} />

        {/* DevOps & Cloud */}
        <SiDocker size={iconSize} className={iconStyle} />
        <SiGit size={iconSize} className={iconStyle} />
        <SiAmazonwebservices size={iconSize} className={iconStyle} />
        <SiDatadog size={iconSize} className={iconStyle} />
        <SiVercel size={iconSize} className={iconStyle} />
        <SiSelenium size={iconSize} className={iconStyle} />
        <SiTailwindcss size={iconSize} className={iconStyle} />
      </Marquee>
    </MotionWrap>
  );
}

export default Scroller;
