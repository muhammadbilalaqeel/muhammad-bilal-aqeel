"use client"

import Image from "next/image"
import { Dispatch, SetStateAction } from "react"
import { job } from "../types/job"
import Link from "next/link"


type JobCardProps = {
  setFilterTags: Dispatch<SetStateAction<string[]>>
  job : job
}

export default function JobCard({setFilterTags,job} : JobCardProps){
    const handleOnTagClick = (tagName : string)=>{
      
      setFilterTags((prev) => {
  if (prev.includes(tagName)) {
    return prev; 
  }
  return [...prev, tagName]; 
});
    }


    return (
        <div className="bg-[#FFFFFF] w-full sm:h-32 h-auto p-4 md:px-6 sm:px-4 px-5 flex sm:flex-row flex-col sm:items-center relative rounded-md  shadow-xl">
            {
                job.featured && <div className="w-1.5 top-0 h-full rounded-l-md bg-[#5EA5A3] absolute left-0"></div>
            }
            <div className="h-20 w-20 relative -mt-12 sm:mt-0 ">
                <Image src={job.logo} alt="" fill/>
            </div>
            <div className="ml-2 w-fit sm:mt-0 mt-3">
                    <div className="flex flex-col ">
                    <div className="flex flex-wrap gap-2 items-center">
                        <Link href={`/jobs/${job.id}`} className="text-[15px]  font-bold text-[#5EA5A3]">{job.company}</Link>
                    <div className="flex  gap-2">
                        {
                            job.new && <p className="sm:text-[12px]  text-[13px] bg-[#5EA5A3] text-white px-2  flex items-center justify-center py-0.5 rounded-3xl">NEW</p>
                        }
                      {
                        job.featured &&   <p className="sm:text-[12px]  text-[13px]  bg-[#2c3a3a] text-white px-2  flex items-center justify-center py-0.5 rounded-3xl">FEATURED</p>
                      }
                    </div>
                    </div>
                    <Link href={`/jobs/${job.id}`} className="text-lg text-[#2c3a3a] font-bold mt-0.5 active:text-[#5EA5A3] hover:text-[#5EA5A3]">{job.position}</Link>
                    <div className="flex w-full items-center justify-between sm:text-[13px] text-[14px] text-[#7b8e8e]">
                        <span>{job.postedAt}</span>
                        -
                        <span>{job.contract}</span>
                        -
                        <span>{job.location}</span>
                    </div>
                </div>
                
            </div>

            <div className="sm:grid md:grid-cols-[repeat(5,auto)] sm:grid-cols-[repeat(4,auto)] flex items-center md:gap-3 gap-2 sm:ml-auto sm:mt-0 mt-3 flex-wrap">
               
                {
                    job.languages.map((item,index)=>{
                        return  <div key={index} className="px-1.5 py-1 text-[13px] active:text-white hover:text-white transition-all duration-100 ease-linear cursor-pointer active:bg-[#5EA5A3] hover:bg-[#5EA5A3] w-fit bg-green-50 text-[#5EA5A3] font-bold rounded-sm" onClick={()=>handleOnTagClick(item)}>
                         {item}
                        </div>
                    })
                }
            </div>
        </div>
    )
}