"use client"

import { Auction } from "@/redux/api/auctionApiSlice";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import moment from 'moment';
import { useEffect, useState } from "react";
import { Bid } from "@/redux/api/biddingApiSlice";

type AuctionCardProps = {
    item: Auction,
    i ?: Bid
}

export default function AuctionCard({ item }: AuctionCardProps) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [countdownLabel, setCountdownLabel] = useState("Time Left");
    useEffect(() => {
        let interval: NodeJS.Timer;

        const updateTime = () => {
            const now = moment();
            const start = moment(item.startsAt);
            const end = moment(item.endsAt);

            if (item.status === 'live') {
                // Auction is live → countdown to end
                const duration = moment.duration(end.diff(now));
                setCountdownLabel("Time Left");
                setTimeLeft({
                    days: Math.max(duration.days(), 0),
                    hours: Math.max(duration.hours(), 0),
                    minutes: Math.max(duration.minutes(), 0),
                    seconds: Math.max(duration.seconds(), 0),
                });
            } else if (start.isAfter(now)) {
                // Auction not started yet → countdown to start
                const duration = moment.duration(start.diff(now));
                setCountdownLabel("Starts In");
                setTimeLeft({
                    days: Math.max(duration.days(), 0),
                    hours: Math.max(duration.hours(), 0),
                    minutes: Math.max(duration.minutes(), 0),
                    seconds: Math.max(duration.seconds(), 0),
                });
            }
        };

        updateTime();
        interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, [item.startsAt, item.endsAt, item.status]);

    const renderBox = (value: number, label: string) => (
        <div className="w-6 h-6 rounded-[2px] border-[0.2px] border-[#2E3D83] flex flex-col items-center justify-center">
            <p className="text-[10px] font-bold text-[#2E3D83] leading-[100%]">{value}</p>
            <span className="text-[#939393] font-medium text-[8px] tracking-[4%] leading-[100%]">{label}</span>
        </div>
    );

    const showCountdown = item.status === 'live' || moment(item.startsAt).isAfter(moment());

    return (
        <div className="w-full pr-3 h-[196px] border border-[#EAECF3] bg-white rounded-[5px] flex gap-3 overflow-hidden">
            <Image
                width={245}
                height={196}
                src={item.images.length > 0 ? item.images[0] : ''}
                alt="car_image"
            />
            <div className="flex w-full gap-3 justify-between">
                <div className="py-4">
                    <div className="flex flex-col gap-1.5">
                        <h4 className="font-bold text-xl text-[#2E3D83]">{item.make} {item.model}</h4>
                        <div className="w-[72px] h-[3px] rounded-sm bg-[#F4C23D]"></div>
                        <div className="flex items-center gap-2">
                            <FaStar className="h-[14px] w-[14px] text-[#F9C146]" />
                            <FaStar className="h-[14px] w-[14px] text-[#F9C146]" />
                            <FaStar className="h-[14px] w-[14px] text-[#F9C146]" />
                            <FaStar className="h-[14px] w-[14px] text-[#F9C146]" />
                            <FaStar className="h-[14px] w-[14px] text-[#F9C146]" />
                        </div>
                        <p className="text-sm text-[#939393]">
                            {item.noteworthy_features?.slice(0, 20)}
                            <Link href={'#'} className="text-[12px] font-semibold text-[#2E3D83]">View Details</Link>
                        </p>
                    </div>
                </div>

                <div className="py-4 flex flex-col justify-between">
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-1">
                                <h5 className="font-bold text-sm text-[#2E3D83]">${item.currentBidAmount}</h5>
                                <p className="text-[#939393] text-[12px]">Current Bid</p>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                {showCountdown ? (
                                    <>
                                        <div className="flex items-center gap-2">
                                            {renderBox(timeLeft.days, "Days")}
                                            {renderBox(timeLeft.hours, "Hours")}
                                            {renderBox(timeLeft.minutes, "Mins")}
                                            {renderBox(timeLeft.seconds, "Secs")}
                                        </div>
                                        <p className="text-[10px] leading-[100%] text-[#939393]">{countdownLabel}</p>
                                    </>
                                ) : (
                                    <p className="text-sm font-bold text-red-500 capitalize">Status : {item.status}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1.5">
                                <h5 className="text-sm leading-[100%] font-bold text-[#2E3D83]">{item.totalBids}</h5>
                                <p className="text-[12px] leading-[100%] text-[#939393]">Total Bids</p>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <h5 className="text-sm leading-[100%] font-bold text-[#2E3D83]">{moment(item.endsAt).format('hh:mma DD MMM YYYY')}</h5>
                                <p className="text-[12px] leading-[100%] text-[#939393]">End Time</p>
                            </div>
                        </div>
                    </div>
                    <Link href={`/auction/${item._id}`} className="w-[386px] h-10 rounded-[5px] border border-[#2E3D83] inline-flex justify-center items-center text-[#2E3D83] font-bold text-base leading-[100%]">
                        Submit A Bid
                    </Link>
                </div>
            </div>
        </div>
    )
}
