"use client"
import { useEffect, useState } from "react";
import FilterCard from "./components/FilterCard";
import JobCard from "./components/JobCard";
import axios from "axios";
import { job } from "./types/job";

export default function Home() {
  const [filterTags,setFilterTags] = useState<string[]>([])
    const [jobs,setJobs] = useState<job[]>([])
const [loading, setLoading] = useState<boolean>(false);
    const fetchAllJobs = async()=>{
        setLoading(true)
        const query = filterTags.length > 0 ? `?tags=${filterTags.join(',')}`: '';
        try {
            const res = await axios.get(`/api/jobs${query}`);
        if(res){
          console.log(res.data)
            setJobs(res.data.data)
        }
        } catch (error) {
          console.error(error)
        }
        finally{
          setLoading(false)
        }
      
    }

    useEffect(()=>{
         fetchAllJobs()
    },[filterTags])
  return (
    <div className="min-h-screen bg-green-50 dark:bg-green-950 ">
      <div className="max-w-[900px] min-w-[320px] mx-auto py-10 px-4 flex flex-col sm:gap-6 gap-12 relative z-30">
        
        {
          filterTags?.length > 0 && <FilterCard filterTags={filterTags} setFilterTags={setFilterTags}/>
        }

        {
          loading ? <p className="m-auto mt-10">Loading....</p> : jobs?.map((item)=>{
            return  <JobCard key={item.id} setFilterTags={setFilterTags} job={item} />
          }) 
        }
      
      
      </div>
    </div>
  )
}
