"use client"

import Image from "next/image"

export default function Header (){
    return (
        <header className="h-24 relative w-full bg-[#5EA5A3]">
            <Image src='bg-header-desktop.svg' alt="header_img" fill className="object-cover" priority />
        </header>
    )
}

