import useGameStore from "@/app/store/usegameStore";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect} from "react";
type RightSectionProps = {
    setBannerImage : Dispatch<SetStateAction<string[]>>
    bannerImg : string[]
}


export default function RightSection({setBannerImage,bannerImg} : RightSectionProps ){
    const {games} = useGameStore()
    const handleClick = (img:string,description:string)=>{
        setBannerImage([img,description])
    }
    
    useEffect(()=>{

         setBannerImage(['outlast.jpg','Forge your own path in Hollow Knight! An epic action adventure through a vast ruined kingdom of insects and heroes.'])
    },[])
    return (
        <div className="lg:w-[249px] h-full lg:flex grid grid-cols-[repeat(auto-fit,minmax(219px,1fr))] lg:flex-col gap-2 shrink-0">

            {
                games?.slice(2,6).map((game,i)=>{
                    return <div key={i} onClick={()=>handleClick(game.coverImage,game.description)} className={`w-full cursor-pointer  h-[100px] rounded-[16px] py-[13px] lg:px-4 px-3 ${bannerImg[0] === game.coverImage && 'bg-[#252525]'}  flex items-center lg:gap-4 gap-3`}>
                 <div className="w-[60px] h-20 rounded-lg relative overflow-hidden">
                       <Image src={`/images/${game.thumbnail}`} alt="" fill className="object-cover object-center"/>
                 </div>
                 <h3 className="text-base text-[#F5F5F5]">{game.title}</h3>
             </div>
                })
            }
             


              
        </div>
    )
}