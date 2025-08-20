import LeftImage from "./LeftImage/LeftImage";
import RightSection from './RightSection/RightSection';

export default function TopBanner (){
   return (
    <div className="h-[432px] flex w-full justify-between">
        <LeftImage/>
        <RightSection/>
    </div>
   ) 
}