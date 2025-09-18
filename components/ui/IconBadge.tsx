"use client";
import { ReactNode } from 'react';
import { cls } from './designSystem';

interface IconBadgeProps {
  children: ReactNode;
  tone?: 'gold' | 'teal' | 'neutral' | 'red' | 'blue' | 'green';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const toneClasses: Record<string, string> = {
  gold: 'from-[rgba(241,192,22,0.25)] to-[rgba(241,192,22,0.10)] text-[rgb(var(--edu-primary))]',
  teal: 'from-[rgba(45,171,178,0.30)] to-[rgba(45,171,178,0.12)] text-[rgb(var(--edu-accent))]',
  red: 'from-[rgba(225,29,72,0.30)] to-[rgba(225,29,72,0.12)] text-[rgb(var(--edu-red))]',
  green: 'from-[rgba(34,197,94,0.30)] to-[rgba(34,197,94,0.12)] text-emerald-600 dark:text-emerald-400',
  blue: 'from-[rgba(37,99,235,0.30)] to-[rgba(37,99,235,0.12)] text-blue-600 dark:text-blue-400',
  neutral: 'from-slate-200/70 to-slate-100/30 text-slate-600 dark:text-slate-300'
};
const sizeMap = { sm: 'h-8 w-8 text-[14px]', md: 'h-11 w-11 text-[16px]', lg: 'h-14 w-14 text-[18px]' };
const svgSizeMap = { sm: '[&>svg]:w-4 [&>svg]:h-4', md: '[&>svg]:w-5 [&>svg]:h-5', lg: '[&>svg]:w-7 [&>svg]:h-7' };

export function IconBadge({ children, tone = 'gold', size = 'md', className }: IconBadgeProps) {
  return (
    <div
      className={cls(
  'relative grid place-items-center rounded-xl ring-1 ring-slate-200/70 dark:ring-white/10 bg-gradient-to-br shadow-sm flex-shrink-0 aspect-square',
        toneClasses[tone],
        sizeMap[size],
        className
      )}
    >
      <div className="absolute inset-0 rounded-xl bg-white/10 dark:bg-white/5 mix-blend-overlay" />
      <span className={`relative flex items-center justify-center ${svgSizeMap[size]} [&>svg]:shrink-0`}>{children}</span>
    </div>
  );
}
