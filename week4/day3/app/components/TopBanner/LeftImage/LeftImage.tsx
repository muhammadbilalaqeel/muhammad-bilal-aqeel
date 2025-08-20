export default function LeftImage (){
    return (
        <div className={`max-w-[797.66px] w-full h-full  flex items-end px-8 bg-[url('/images/god_of_war.jpg')] bg-no-repeat bg-cover rounded-[20px]`}>
          <div className="w-[300px] h-[248px]">
             <div className="flex flex-col gap-5">
            <span className="text-[12px] leading-[100%] text-white">
             PRE-PURCHASE AVAILABLE
           </span>
           <p className="text-base text-white">Kratos now lives as a man in the realm of Norse Gods and monsters. It is in this harsh, unforgiving world that he must fight to survive</p>
           </div>
           <button className="h-[48px] rounded-sm  py-[13px] px-4 mt-10 text-black text-base flex items-center justify-center bg-white cursor-pointer">
            PRE-PURCHASE NOW
           </button>
          </div>
        </div>
    )
}