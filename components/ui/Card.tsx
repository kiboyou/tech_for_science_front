"use client";
import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cls, DS } from './designSystem';

type CardOwnProps = {
  children: ReactNode;
  variant?: 'solid' | 'soft' | 'glass' | 'outline';
  className?: string;
  padded?: boolean;
  hover?: boolean;
};

type PolymorphicProps<C extends ElementType> = CardOwnProps & {
  as?: C;
} & Omit<ComponentPropsWithoutRef<C>, keyof CardOwnProps | 'as'>;

export function Card<C extends ElementType = 'div'>(
  { children, as, variant = 'soft', padded = true, hover = true, className, ...rest }: PolymorphicProps<C>
) {
  const Tag = (as || 'div') as ElementType;
  const base = 'relative rounded-2xl border transition-all';
  const variants: Record<string, string> = {
    solid: 'bg-white dark:bg-slate-900/90 border-slate-200/70 dark:border-white/10 shadow-sm',
    soft: 'bg-white/70 dark:bg-white/5 border-slate-200/70 dark:border-white/10 shadow-sm backdrop-blur-sm',
    glass: 'bg-white/40 dark:bg-white/5 border-white/20 shadow-sm backdrop-blur-xl',
    outline: 'bg-transparent border-slate-300/60 dark:border-white/15'
  };
  const hoverStyle = hover ? 'hover:shadow-md hover:-translate-y-0.5' : '';
  return (
    <Tag
      className={cls(
        base,
        variants[variant],
        hoverStyle,
        padded && 'p-6',
        'transition-shadow duration-200',
        className
      )}
      style={{ borderRadius: DS.radius.xl }}
      {...rest}
    >
      {children}
    </Tag>
  );
}