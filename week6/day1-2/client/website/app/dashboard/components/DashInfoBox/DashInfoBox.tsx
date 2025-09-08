"use client"

type DashInfoBoxProps = {
    title : string
    amount ?: number
    quantity ?:number
    date ?: string
}

export default function DashInfoBox({title,amount,quantity,date}:DashInfoBoxProps){
    return (
        <div className="rounded-[16px] py-6 px-4 flex flex-col gap-2 bg-[#FAFAFA]">
           <div>
             <h4 className="text-sm font-semibold text-black">{title}</h4>
           </div>
           <div className="flex justify-between items-center">
             <div className="flex items-center gap-[10px]">
                <div className="bg-[#003F62] rounded-xl p-[10px] flex items-center justify-center h-10 w-10"></div>
                <p className="font-semibold text-black">{title === 'Total Completed Amount' ? `$${amount}` : `${amount}`} </p>
             </div>
             <div className="flex gap-1 items-center">
                <div></div>
                <p className="text-sm text-black font-semibold">34.7%</p>
             </div>
           </div>
           <div className="flex w-full justify-end">
            <p className="text-right font-semibold text-[#4b4b4b] text-[12px]">Compared to Oct 2023</p>
           </div>
        </div>
    )
}