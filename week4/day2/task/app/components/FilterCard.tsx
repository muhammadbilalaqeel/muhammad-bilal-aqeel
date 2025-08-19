import Image from "next/image";
import { Dispatch, SetStateAction } from "react";


type FilterCardProps  = {
    filterTags : string[]
    setFilterTags: Dispatch<SetStateAction<string[]>>
}


export default function FilterCard({filterTags,setFilterTags}:FilterCardProps){
    const handleDeleteTagClick = (index : number)=>{
        const newData  =  filterTags?.filter((item,i)=> i!==index)
        setFilterTags(newData)
    }

    const handleClearButton = ()=>{
        setFilterTags([])
    }
 return(
    <div className="bg-white w-full h-auto -mt-18 rounded-md shadow-xl md:px-7 sm:px-5 px-3  py-5">
        <div className="flex items-center justify-between sm:gap-4 gap-2">
            <div className="flex items-center sm:gap-3 gap-1.5 flex-wrap">

                {
                    filterTags?.length> 0 && filterTags?.map((tag,index)=>{
                        return <div key={tag} className="flex rounded-sm w-fit">
                                <div className="sm:px-2 px-1.5 py-1.5 text-[13px] active:text-white active:bg-[#5EA5A3]  bg-green-50 text-[#5EA5A3] font-bold rounded-l-sm">{tag}</div>
             <span className="relative inline-flex px-1.5 py-1.5 w-7 bg-[#5EA5A3] hover:bg-[#2c3a3a] transition-all duration-150 ease-linear items-center cursor-pointer rounded-r-sm" onClick={()=>handleDeleteTagClick(index)}><Image src={'icon-remove.svg'} alt="cross-icon" width={100} height={100}/></span>
            
            </div>
                    })
                }
                


          


          


            
            </div>
            <div>
                <button className="text-[#5EA5A3] text-[15px] font-bold hover:underline hover:underline-offset-1 cursor-pointer transition-all duration-150 ease-linear" onClick={handleClearButton}>Clear</button>
            </div>
        </div>
    </div>
 )
}