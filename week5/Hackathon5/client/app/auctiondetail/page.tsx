"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Container from "../Components/Common/Container";
import { FaRegStar } from "react-icons/fa6";
import Link from "next/link";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
export default function AuctionDetail(){
    return (
        <div>
            <div className="h-[240px] w-full bg-[#c6d8f9] relative">
                <Container>
                    <h1 className="text-[64px] pt-6 font-semibold text-[#2E3D83] text-center font-josefin">Audi Q3</h1>
                    <p className="text-lg font-medium text-[#545677] text-center">Lorem ipsum dolor sit amet consectetur. At in pretium semper vitae eu eu mus.</p>
                 <div className="w-full flex justify-center absolute bottom-0 left-0">
                       <Breadcrumb className="px-3 py-2 bg-[#BBD0F6] rounded-x-[3px]">
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/" className="text-[#545677]">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-[#000000]"/>
                         <BreadcrumbItem>
                          <BreadcrumbLink className="text-[#2E3D83]">Auction Detail</BreadcrumbLink>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                 </div>
                </Container>
            </div>


            <Container>
              <section className="py-10">
                          
                              <div className="w-full h-[60px] bg-[#2E3D83] flex items-center px-5 justify-between rounded-[5px]">
                                    <span className="font-semibold text-base text-white ">Audi Q3</span>
                                    <FaRegStar className="h-5 w-5 text-white"/>
                                </div>





                                
                          
              </section>

              <section className="pb-8 flex gap-8 justify-between">
                <div className="max-w-[898px]">
                  <div className="h-[58px] w-full flex items-center justify-between gap-2 bg-[#F1F2FF] px-5">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-[2px] border-[0.2px] border-[#2E3D83] flex flex-col items-center justify-center">
                            <p className="text-[10px] font-bold text-[#2E3D83] leading-[100%]">31</p>
                            <span className="text-[#939393] font-medium text-[8px] tracking-[4%] leading-[100%]">Days</span>
                        </div>
                         <div className="w-6 h-6 rounded-[2px] border-[0.2px] border-[#2E3D83] flex flex-col items-center justify-center">
                            <p className="text-[10px] font-bold text-[#2E3D83] leading-[100%]">31</p>
                            <span className="text-[#939393] font-medium text-[8px] tracking-[4%] leading-[100%]">Hours</span>
                        </div>
                         <div className="w-6 h-6 rounded-[2px] border-[0.2px] border-[#2E3D83] flex flex-col items-center justify-center">
                            <p className="text-[10px] font-bold text-[#2E3D83] leading-[100%]">31</p>
                            <span className="text-[#939393] font-medium text-[8px] tracking-[4%] leading-[100%]">mins</span>
                        </div>
                         <div className="w-6 h-6 rounded-[2px] border-[0.2px] border-[#2E3D83] flex flex-col items-center justify-center">
                            <p className="text-[10px] font-bold text-[#2E3D83] leading-[100%]">31</p>
                            <span className="text-[#939393] font-medium text-[8px] tracking-[4%] leading-[100%]">secs</span>
                        </div>
                      </div>
                      <p className="text-[10px] leading-[100%] text-[#939393]">Time Left</p>
                   </div>

                   
                    <div className="flex flex-col gap-1">
                      <h5 className="font-bold text-sm text-[#2E3D83]">$1,07899.99</h5>
                      <p className="text-[#939393] text-[12px]">Current Bid</p>
                   </div>

                    <div className="flex flex-col gap-1.5">
                        <h5 className="text-sm leading-[100%] font-bold text-[#2E3D83]">06:00pm 03 Jan 2023</h5>
                        <p className="text-[12px] leading-[100%] text-[#939393]">End Time</p>
                    </div>

                     <div className="flex flex-col gap-1.5">
                        <h5 className="text-sm leading-[100%] font-bold text-[#2E3D83]">100</h5>
                        <p className="text-[12px] leading-[100%] text-[#939393]">Min. Increment</p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <h5 className="text-sm leading-[100%] font-bold text-[#2E3D83]">130 </h5>
                        <p className="text-[12px] leading-[100%] text-[#939393]">Total Bids</p>
                    </div>


                    <div className="flex flex-col gap-1.5">
                        <h5 className="text-sm leading-[100%] font-bold text-[#2E3D83]">379831</h5>
                        <p className="text-[12px] leading-[100%] text-[#939393]">Lot No.</p>
                    </div>


                    <div className="flex flex-col gap-1.5">
                        <h5 className="text-sm leading-[100%] font-bold text-[#2E3D83]">10,878 K.M </h5>
                        <p className="text-[12px] leading-[100%] text-[#939393]">Odometer</p>
                    </div>
                  </div>

                 <div className="border-b border-[#B3B3B3]">
                   <ul className="w-full flex pt-8">
                    <li className="flex flex-col items-center"><Link href={'#'} className="font-medium text-xl text-center w-[142px] h-[38px] inline-block text-[#2E3D83]">Live Auction</Link>
                    <div className="w-[159px] h-[5px] rounded-[5px] bg-[#FFC300]"></div>
                    </li>
                   </ul>
                 </div>

                 <p className="font-medium text-base mt-8">Lorem ipsum dolor sit amet consectetur. Duis ac sodales vulputate dolor volutpat ac. Turpis ut neque eu adipiscing nibh nunc gravida. Ipsum at feugiat id dui elementum nibh nec suspendisse. Ut sapien metus elementum tincidunt euismod. 

                In est eget turpis nulla leo amet arcu. Consequat viverra erat pellentesque ut non placerat placerat amet vitae. Lobortis velit senectus blandit pellentesque viverra augue dolor orci. Odio leo in et in. Ac purus morbi ac vulputate amet. Ut maecenas leo venenatis aliquet a fringilla quam varius pellentesque. 

                </p>


                <div className="w-full min-h-[205px] h-auto rounded-[5px] overflow-hidden mt-auto">
                     <div className="bg-[#2E3D83] h-10 flex items-center px-5">
                       <h3 className="text-lg font-semibold text-white">Top Bidder</h3>
                     </div>

                     <div className="bg-[#F1F2FF] px-5 py-4 grid grid-cols-2 gap-3 ">
                         <div className="flex gap-10 items-center">
                            <h5 className="text-[#2E3D83] text-lg font-semibold flex-1">Full Name</h5>
                            <p className="text-[#939393] flex-1 text-lg ">Lionel Messi</p>
                         </div>

                         <div className="flex gap-10 items-center">
                            <h5 className="text-[#2E3D83] text-lg font-semibold flex-1">Email</h5>
                            <p className="text-[#939393] text-lg  flex-1">messi10@email.com</p>
                         </div>

                         <div className="flex gap-10 items-center">
                            <h5 className="text-[#2E3D83] text-lg font-semibold flex-1">Mobile Number</h5>
                            <p className="text-[#939393] text-lg  flex-1">1234567890</p>
                         </div>

                         <div className="flex gap-10 items-center">
                            <h5 className="text-[#2E3D83] text-lg font-semibold flex-1">Nationality</h5>
                            <p className="text-[#939393] text-lg  flex-1">Argentina</p>
                         </div>

                         <div className="flex gap-10 items-center">
                            <h5 className="text-[#2E3D83] text-lg font-semibold flex-1">ID Type</h5>
                            <p className="text-[#939393] text-lg  flex-1">Pakistani</p>
                         </div>
                     </div>
                </div>
                </div>


                 <div>
                    <div className="w-[286px] bg-[#F1F2FF] rounded-[5px] overflow-hidden p-5 flex flex-col gap-3">
                  <div className="flex justify-between">
                     <div className="flex flex-col gap-1">
                      <h5 className="font-bold text-sm text-[#2E3D83]">$1,07899.99</h5>
                      <p className="text-[#939393] text-[12px]">Bid Starts From</p>
                   </div>

                   <div className="flex flex-col gap-1">
                      <h5 className="font-bold text-sm text-[#2E3D83]">$1,07899.99</h5>
                      <p className="text-[#939393] text-[12px]">Current Bid</p>
                   </div>
                  </div>
                   <input type="range"/>
                   <div className="flex justify-between">
                     <div className="flex flex-col gap-1">
                      <h5 className="font-bold text-sm text-[#2E3D83]">130</h5>
                      <p className="text-[#939393] text-[12px]">Bid Placed</p>
                   </div>

                   <div className="flex  items-center gap-1">
                     <button className="w-6 h-6 border border-[#C6D8F9] bg-white rounded-[3px] flex items-center justify-center">
                        <FaMinus className="text-[#2E3D83] h-3 w-3"/>
                      </button>
                      <p className="flex w-[62px] h-6 border border-[#F9C146] rounded-[3px] bg-white font-medium text-[#2E3D83] text-[10px]  items-center justify-center">$10,000</p>
                      <button className="w-6 h-6 border border-[#C6D8F9] bg-white rounded-[3px] flex items-center justify-center">
                        <FaPlus className="text-[#2E3D83] h-3 w-3"/>
                      </button>
                   </div>
                  </div>
                  
                  <button className="bg-[#2E3D83] text-white w-full h-10 rounded-[5px] mt-4">Submit A Bid</button>
                    
                    </div>

                     <div className="mt-8 w-[286px] bg-[#2E3D83] rounded-[5px] overflow-hidden h-[442px]">
                    <div className="h-[75px] px-4 bg-[#4658AC] flex items-center">
                        <p className="font-medium text-base leading-[100%] text-white border-l-[3px] px-2 py-4 border-[#FDB94B]">Bidders List</p>
                    </div>


                    <div className="px-4 bg-[#F1F2FF] h-full">
                       <ul className="py-8 flex flex-col gap-3">
                         <li className="border-b-[0.5px] border-[#CBCBCB] h-[34px] flex justify-between">
                            <p className="text-sm text-[#545677]">Bidder 1</p>
                            <p className="text-[#2E3D83] text-sm">$ 18,000</p>
                         </li>
                          <li className="border-b-[0.5px] border-[#CBCBCB] h-[34px] flex justify-between">
                            <p className="text-sm text-[#545677]">Bidder 1</p>
                            <p className="text-[#2E3D83] text-sm">$ 18,000</p>
                         </li>
                          <li className="border-b-[0.5px] border-[#CBCBCB] h-[34px] flex justify-between">
                            <p className="text-sm text-[#545677]">Bidder 1</p>
                            <p className="text-[#2E3D83] text-sm">$ 18,000</p>
                         </li>
                       </ul>
                    </div>
                </div>
                   
                 </div>


              </section>
            </Container>
           
        </div>
    )
}