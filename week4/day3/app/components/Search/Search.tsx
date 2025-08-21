"use client"

import Link from "next/link";
import Container from "../Container/Container";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import useGameStore from "@/app/store/usegameStore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { Game } from "@/app/types/game";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
export default function Search(){
  const [query, setQuery] = useState<string>("");
  const [loading,setLoading] = useState<boolean>(false)
  const router = useRouter();
const handleSearch = async () => {
  setLoading(true)
  if (!query.trim()) {
    toast.warning("Please enter a game title");
    setLoading(false);
    return;
  }

  try {
    const response = await axios.get<Game[]>(`/api/games/search?title=${encodeURIComponent(query)}`);
    const results = response.data;
   
    if (results.length === 0) {
      toast.error(`No game found with "${query}"`);
      setLoading(false);
      return;
    }

    router.push(`/games/${results[0].id}`);
        setLoading(false);
  } catch (err: any) {
    toast.error(err.message || "Failed to search games");
    setLoading(false)
  }
};

  return (
   
        <div className="sm:h-[100px] sm:py-0 py-5 flex sm:flex-row flex-col items-center gap-5 mt-10">
           <div className="sm:w-[220px] w-full h-10 bg-[#202020] py-[10px] px-3 flex items-center gap-[10px] rounded-[200px] relative">
  <IoSearch className="w-[13px] h-[13px] text-[#A0A0A0]" />

  <input
    type="text"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") handleSearch();
    }}
    placeholder="Search Store"
    className="text-[12px] outline-none text-[#A0A0A0] placeholder:text-[#A0A0A0] flex-1"
  />

  {/* Spinner on the right */}
  {loading && (
    <AiOutlineLoading3Quarters className="w-4 h-4 text-[#A0A0A0] animate-spin absolute right-3" />
  )}
</div>
           <ul className="flex items-center gap-6">
            <li><Link href={'https://www.discover.com/'} className="text-[12px] text-white">Discover</Link></li>
            <li><Link href={'https://dictionary.cambridge.org/dictionary/english/browse'} className="text-[12px] text-[#666666]">Browse</Link></li>
            <li><Link href={'https://news.google.com/home?hl=en-PK&gl=PK&ceid=PK%3Aen'} className="text-[12px] text-[#666666]">News</Link></li>
           </ul>
        </div>
      
  )
}