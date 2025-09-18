"use client";
import { ReactNode } from 'react';
import { cls } from './designSystem';

interface SectionContainerProps {
  id?: string;
  children: ReactNode;
  className?: string;
  paddedTop?: boolean;
  paddedBottom?: boolean;
}

export function SectionContainer({ id, children, className, paddedTop = true, paddedBottom = true }: SectionContainerProps) {
  return (
    <section id={id} className={cls('scroll-mt-24', paddedTop && 'pt-24', paddedBottom && 'pb-24')}>
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
