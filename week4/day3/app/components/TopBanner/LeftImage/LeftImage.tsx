import Image from "next/image"

type LeftImageProps = {
  bannerImage : string[]
}

export default function LeftImage ({bannerImage} : LeftImageProps){
    return (
        <div className={`w-full relative lg:max-w-[797.66px]  lg:h-full h-[432px]  flex items-end sm:justify-start justify-center sm:px-8 px-4 rounded-[20px] overflow-hidden`}>
          <Image src={`/images/${bannerImage[0]}`} alt='' className="object-cover object-center z-10" fill/>
          <div className="md:w-[300px] h-[248px] flex flex-col md:items-start items-center relative z-20">
             <div className="flex flex-col gap-5">
            <span className="text-[12px] leading-[100%] text-white md:text-left text-center">
             PRE-PURCHASE AVAILABLE
           </span>
           <p className="text-base text-white md:text-left text-center">{bannerImage[1]}</p>
           </div>
           <button className="h-[48px] rounded-sm  py-[13px] px-4 md:mt-10 sm:mt-8 mt-4  text-black text-base flex items-center justify-center bg-white cursor-pointer">
            PRE-PURCHASE NOW
           </button>
          </div>
        </div>
    )
}