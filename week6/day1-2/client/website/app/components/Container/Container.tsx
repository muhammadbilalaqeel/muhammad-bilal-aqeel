import { ReactNode } from "react"

type ContainerProps = {
  children: ReactNode
  className ?: string
}

export default function Container({ children,className }: ContainerProps) {
  return <div className={`max-w-[1440px] mx-auto 2xl:px-[100px] xl:px-[70px] lg:px-[40px] md:px-[20px] px-[10px] ${className}`}>{children}</div>
}
