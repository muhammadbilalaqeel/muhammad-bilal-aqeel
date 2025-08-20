import Image from "next/image";

export default function GameCard(){
    return (
        <div className="flex flex-col gap-[10px]">
            <div className="relative h-[284px] w-[200px] rounded-sm overflow-hidden">
                <Image src={'/images/valorant.jpg'} alt="" fill/>
            </div>
            <h3 className="text-[#F5F5F5] text-base">
                Valorant
            </h3>
            <div className="flex gap-2">
                <div className="sale px-2 rounded-sm text-[#F5F5F5] bg-[#0074E4]">
                    -10%
                </div>
                <div className="price flex gap-1">
                    <div className="old line-through text-[#F5F5F5]/60 text-base">
                        ₹900
                    </div>
                    <div className="new text-[#F5F5F5] text-base">
                        ₹850
                    </div>
                </div>
            </div>
        </div>
    )
}