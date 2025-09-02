
import Link from "next/link";
import Container from "../../Common/Container";
import BidCard from "../BidCard";
import { User } from "@/types/auth/authTypes";

export default function MyCars({ data,refetch }: { data?: User,refetch :() => void; }){
    return(
        <div className="max-w-[898px] w-full">
               
                 <div className="border-b border-[#B3B3B3]">
                   <ul className="w-full flex">
                    <li className="flex flex-col"><Link href={'#'} className="font-medium text-xl  w-[142px] h-[38px] inline-block text-[#2E3D83]">My Cars</Link>
                    <div className="w-[80px] h-[5px] rounded-[5px] bg-[#FFC300]"></div>
                    </li>
                   </ul>
                 </div>


                 <div className="py-8 grid grid-cols-3">
                    {data?.myCars?.length && data?.myCars?.length > 0 ? data?.myCars?.map((item,index)=>{
                      return <BidCard car={item} key={index} refetch={refetch}/>
                    }) : <p>No Data</p> }
                 </div>
        </div>
    )
}