import Image from "next/image";
import Container from "../Common/Container";
import Link from "next/link";

export default function Footer(){
    return (
        <footer className="w-full min-h-[377px] bg-[#2E3D83]">
            <Container>
                <div className="business_footer pt-14 pb-8   flex gap-14">
                    <div className="flex flex-col max-w-[408px] gap-4">
                        <div className="relative w-[165px] h-[42px]">
                            <Image src="/logo.png" alt="" fill />
                        </div>
                        <p className="text-base text-[#B9B9B9]">Lorem ipsum dolor sit amet consectetur. Mauris eu convallis proin turpis pretium donec orci semper. Sit suscipit lacus cras commodo in lectus sed egestas. Mattis egestas sit viverra pretium tincidunt libero. Suspendisse aliquam donec leo nisl purus et quam pulvinar. Odio egestas egestas tristique et lectus viverra in sed mauris. </p>
                    </div>
                    <div>
                        <ul className="pt-4 flex flex-col gap-4">
                            <li><Link className="text-xl font-bold text-[#E9E9E9]" href={'/'}>Home</Link></li>
                            <li><Link className="text-xl font-bold text-[#E9E9E9]" href={'#'}>Help Center</Link></li>
                            <li><Link className="text-xl font-bold text-[#E9E9E9]" href={'#'}>FAQ</Link></li>
                        </ul>
                    </div>
                     <div>
                        <ul className="pt-4 flex flex-col gap-4">
                            <li><Link className="text-xl font-bold text-[#E9E9E9]" href={'/aucction'}>Car Auction</Link></li>
                            <li><Link className="text-xl font-bold text-[#E9E9E9]" href={'#'}>Help Center</Link></li>
                            <li><Link className="text-xl font-bold text-[#E9E9E9]" href={'/profile'}>My Account</Link></li>
                        </ul>
                    </div>
                </div>
            </Container>
            <div className="w-full border-t border-[#656565] flex items-center h-full">
                <Container className=" flex items-center h-full">
                    <p className="font-medium text-xl text-center text-white py-4">Copyright 2022 All Rights Reserved</p>
                </Container>
            </div>
        </footer>
    )
}