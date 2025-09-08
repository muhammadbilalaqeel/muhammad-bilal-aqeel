"use client"

export default function DashInfoBoxSkeleton() {
    return (
        <div className="rounded-[16px] py-6 px-4 flex flex-col gap-2 bg-[#FAFAFA] animate-pulse">
           {/* Title */}
           <div className="h-4 w-32 bg-gray-300 rounded"></div>

           {/* Main content */}
           <div className="flex justify-between items-center">
             <div className="flex items-center gap-[10px]">
                <div className="bg-gray-300 rounded-xl h-10 w-10"></div>
                <div className="h-5 w-16 bg-gray-300 rounded"></div>
             </div>
             <div className="flex gap-1 items-center">
                <div className="h-4 w-8 bg-gray-300 rounded"></div>
                <div className="h-4 w-12 bg-gray-300 rounded"></div>
             </div>
           </div>

           {/* Footer */}
           <div className="flex w-full justify-end">
            <div className="h-3 w-36 bg-gray-300 rounded"></div>
           </div>
        </div>
    )
}
