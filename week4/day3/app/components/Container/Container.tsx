import { ReactNode } from "react"

type ContainerProps = {
    children : ReactNode
}

export default function Container({children}:ContainerProps){
  return(
    <div className="max-w-[1131px] mx-auto h-auto md:px-8 sm:px-6 px-4">
       {children}
    </div>
  )
}