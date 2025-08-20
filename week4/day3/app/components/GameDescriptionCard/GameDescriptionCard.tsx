import Image from "next/image";

export default function GameDescriptionCard(){
    return (
        <div className="w-[348px] flex flex-col gap-2 h-[351px]">
            <div className="relative w-full h-[198px] rounded-[20px] overflow-hidden">
                <Image src={'/images/need-for-speed.jpg'} alt="" fill className="object-cover"/>
            </div>
            <div className="flex flex-col gap-1.5">
                <h3 className="text-base text-white">NFS UNBOUND</h3>
                <p className="text-sm text-white/60 leading-tight">Pre-purchase NFS Unbound and get an exclusive Driving Effect, License Plate, $150,000 Bank, and more.</p>

                <h5 className="text-base text-white">₹3,499</h5>
            </div>
        </div>
    )
}