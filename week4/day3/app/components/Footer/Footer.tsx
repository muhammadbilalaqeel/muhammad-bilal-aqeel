"use client"

import { Smooch } from 'next/font/google';
import Link from 'next/link';
import React from 'react'
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { IoIosArrowForward } from 'react-icons/io';
 
const Footer: React.FC = () => {
    return (
        <section className='bg-[rgba(49,49,49,1)] py-8'>
      <footer className="max-w-[1440px] mx-auto">
        <div className="rightLogos flex justify-between  px-3 pr-5 ">
          <div className="flex gap-3 items-center">
            <Link href={'https://www.facebook.com/'}><FaFacebookSquare className='h-6 w-6 text-white'/></Link>
           <Link href={'https://twitter.com/'}><FaTwitter className='h-6 w-6 text-white'/></Link>
           <Link href={'https://www.youtube.com/'}><FaYoutube className='h-6 w-6 text-white'/></Link>
          </div>
          <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} className=" cursor-pointer flex  items-center justify-center border-[2px] border-white w-8 h-8  ">
            <IoIosArrowForward className='transform -rotate-90 text-white' />
          </button>
        </div>
        <p className=" px-3 text-[15px] text-[rgba(255,255,255,0.6)] mt-5 ">
          Resource
        </p>
        <div className="text-white text-[15px] flex flex-wrap px-3  leading-7 gap-6">
          {/*  */}
          <div className="mt-1 flex flex-col">
            <Link href={'https://www.twitch.tv'} className='inline-block'>Creator Support</Link>
            <Link href={'https://www.roblox.com'} className='inline-block'>Published on Epic</Link>
            <Link href={'https://store.steampowered.com'} className='inline-block'>Profession</Link>
            <Link href={'https://www.crazygames.com'} className='inline-block'>company</Link>
          </div>
          {/*  */}
          {/*  */}
          <div className="mt-1 flex flex-col">
            <Link href={'https://www.twitch.tv'}>Fan Works Policy</Link >
            <Link href={'https://www.roblox.com'}>User Exp Services</Link >
            <Link href={'https://store.steampowered.com'}>User License</Link >
          </div>
          {/*  */}
          {/*  */}
          <div className="mt-1 flex flex-col">
            <Link href={'https://www.twitch.tv'}>Online Services</Link >
            <Link href={'https://www.roblox.com'}>Community</Link >
            <Link href={'https://store.steampowered.com'}>Epic News-room</Link >
          </div>
          {/*  */}
          {/*  */}
          <div className="mt-1 flex flex-col">
            <Link href={'https://www.twitch.tv'}>Bottle Breakers</Link >
            <Link href={'https://www.roblox.com'}>Fortnite</Link >
            <Link href={'https://store.steampowered.com'}>Infinity Blade</Link >
          </div>
          {/*  */}
          {/*  */}
          <div className="mt-1 flex flex-col">
            <Link href={'https://www.twitch.tv'} >Robo Recall</Link >
            <Link href={'https://www.roblox.com'}>Shadow Complex</Link >
            <Link href={'https://store.steampowered.com'} >Unreal Tournament</Link >
          </div>
          {/*  */}
        </div>
        <div className=" max-w-[850px] mt-10 text-[13px] text-white px-3  ">
          <p>
            © 2022, Epic Games, Inc. All rights reserved. Epic, Epic Games, Epic
            Games logo, Fortnite, Fortnite logo, Unreal, Unreal Engine, Unreal
            Engine logo, Unreal Tournament and the Unreal
            Tournament logo are trademarks or registered trademarks of Epic
            Games, Inc. in the United States of America and elsewhere. Other
            brand or product names are trademarks of their respective owners.
            Transactions outside the United States are handled through Epic
            Games International, S.à r.l..
          </p>
        </div>
        <div className="mt-7 text-[15px] text-white flex justify-between px-3 pr-5 ">
          <div className="flex gap-3 flex-wrap">
            <Link href={'https://www.twitch.tv'} className='sm:text-base text-[12px]'>Terms Of Services</Link>
            <Link href={'https://www.roblox.com'} className='sm:text-base text-[12px]'>Privacy Policy</Link>
            <Link href={'https://store.steampowered.com'} className='sm:text-base text-[12px]'>Store Refund Policy</Link>
          </div>
          {/* <div className="flex  items-center justify-center border-[2px] border-white w-8 h-8  "> */}
          <img className=" w-5 h-7" src="/logo.png" alt="" />
          {/* </div> */}
        </div>
      </footer>
    </section>
    );
}

export default Footer
