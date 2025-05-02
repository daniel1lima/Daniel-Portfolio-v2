import { Skill } from '@/types/skill';
import { trimLen } from '@/components/sections/skills/config';
import { cn, trimString } from '@/lib/utils';
import { MemoizedReactMarkdown } from '@/components/markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import TextReveal from '@/components/motion/text-reveal';

interface SkillCardProps extends Skill {
  index: number;
  className?: string;
}

export default function SkillCard({
  name,
  description,
  thumbnail,
  className
}: SkillCardProps) {
  return (
    <div
      style={{
        borderRadius: '12px'
      }}
      className={cn(
        'flex flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900',
        className
      )}
    >
      <div className="flex flex-grow flex-col gap-4 p-6">
        <div className="flex w-full flex-col gap-2">
          <h3 className="text-3xl font-bold leading-8 tracking-tight text-zinc-950 dark:text-zinc-50">
            <TextReveal>
              {name}
            </TextReveal>
          </h3>
          <p className="text-md text-muted-foreground text-zinc-700 dark:text-zinc-400">
            <TextReveal>
              {trimLen != -1
                ? trimString(trimLen, description || '')
                : description ?? ''}
            </TextReveal>
          </p>
        </div>
      </div>
    </div>
    
  );
}
