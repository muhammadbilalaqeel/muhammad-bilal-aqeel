"use client"
import { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
  className ?: string
};

export default function Container({ children,className }: ContainerProps) {
  return <div className={`max-w-[1440px] mx-auto 2xl:px-[118px] xl:60px lg:30px md:20px 6px  ${className}`}>{children}</div>;
}
