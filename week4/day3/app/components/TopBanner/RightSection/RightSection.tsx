import Image from "next/image";

export default function RightSection(){
    return (
        <div className="w-[249px] h-full flex flex-col gap-2">
             <div className="w-full h-[100px] rounded-[16px] py-[13px] px-4 bg-[#252525] flex items-center gap-4">
                 <div className="w-[60px] h-20 rounded-lg relative overflow-hidden">
                       <Image src={'/images/god_of_war_r.jpg'} alt="" fill/>
                 </div>
                 <h3 className="text-base text-[#F5F5F5]">God Of War 4</h3>
             </div>


              <div className="w-full h-[100px] rounded-[16px] py-[13px] px-4  flex items-center gap-4">
                 <div className="w-[60px] h-20 rounded-lg relative overflow-hidden">
                       <Image src={'/images/god_of_war_r.jpg'} alt="" fill/>
                 </div>
                 <h3 className="text-base text-[#F5F5F5]">God Of War 4</h3>
             </div>


              <div className="w-full h-[100px] rounded-[16px] py-[13px] px-4  flex items-center gap-4">
                 <div className="w-[60px] h-20 rounded-lg relative overflow-hidden">
                       <Image src={'/images/god_of_war_r.jpg'} alt="" fill/>
                 </div>
                 <h3 className="text-base text-[#F5F5F5]">God Of War 4</h3>
             </div>


              <div className="w-full h-[100px] rounded-[16px] py-[13px] px-4  flex items-center gap-4">
                 <div className="w-[60px] h-20 rounded-lg relative overflow-hidden">
                       <Image src={'/images/god_of_war_r.jpg'} alt="" fill/>
                 </div>
                 <h3 className="text-base text-[#F5F5F5]">God Of War 4</h3>
             </div>
        </div>
    )
}