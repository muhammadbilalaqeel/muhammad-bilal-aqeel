"use client"

import { useState, useEffect } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import Container from "../Components/Common/Container"
import Personal from "../Components/Profile/Personal/Personal"
import MyCars from "../Components/Profile/My Cars/MyCars"
import { useGetProfileQuery } from "@/redux/api/authApiSlice";
import MyBids from "../Components/Profile/My Bids/MyBids";
import Wishlist from "../Components/Profile/Wishlist/Wishlist";

export default function Profile() {

  const defaultTab = "personal";

  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  useEffect(() => {
    const savedTab = localStorage.getItem("profileActiveTab");
    if (savedTab) setActiveTab(savedTab);
  }, []);

  useEffect(() => {
    localStorage.setItem("profileActiveTab", activeTab);
  }, [activeTab]);

 const { data, isLoading, isError , refetch } = useGetProfileQuery();

  console.log(data, isLoading, isError);

  return (
    <div>
      <div className="h-[240px] w-full bg-[#c6d8f9] relative">
        <Container>
          <h1 className="text-[64px] pt-6 font-semibold text-[#2E3D83] text-center font-josefin">My Profile</h1>
          <p className="text-lg font-medium text-[#545677] text-center">Lorem ipsum dolor sit amet consectetur. At in pretium semper vitae eu eu mus.</p>
          <div className="w-full flex justify-center absolute bottom-0 left-0">
            <Breadcrumb className="px-3 py-2 bg-[#BBD0F6] rounded-x-[3px]">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="text-[#545677]">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-[#000000]" />
                <BreadcrumbItem>
                  <BreadcrumbLink className="text-[#2E3D83]">My Profile</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </Container>
      </div>

      <Container>
        <section className="py-10 flex gap-8 justify-between">
          <div className="max-w-[286px] w-full flex flex-col gap-3">
            <button
              className={`h-10 rounded-[5px] w-full pl-4 flex items-center justify-between text-base  ${
                activeTab === "personal"
                  ? "bg-[#F1F2FF] text-[#2E3D83] font-semibold"
                  : "border border-[#EAECF3] text-[#2E3D83] font-normal"
              }`}
              onClick={() => setActiveTab("personal")}
            >
              Personal Information
              {activeTab === "personal" && <div className="h-[30px] my-auto w-[5px] rounded-[5px] bg-[#F9C146]"></div>}
            </button>

            <button
              className={`h-10 rounded-[5px] w-full pl-4 flex items-center justify-between text-base ${
                activeTab === "mycars"
                  ? "bg-[#F1F2FF] text-[#2E3D83] font-semibold"
                  : "border border-[#EAECF3] text-[#2E3D83] font-normal"
              }`}
              onClick={() => setActiveTab("mycars")}
            >
              My Cars
              {activeTab === "mycars" && <div className="h-[30px] my-auto w-[5px] rounded-[5px] bg-[#F9C146]"></div>}
            </button>

            <button
              className={`h-10 rounded-[5px] w-full pl-4 flex items-center justify-between text-base ${
                activeTab === "mybids"
                  ? "bg-[#F1F2FF] text-[#2E3D83] font-semibold"
                  : "border border-[#EAECF3] text-[#2E3D83] font-normal"
              }`}
              onClick={() => setActiveTab("mybids")}
            >
              My Bids
              {activeTab === "mybids" && <div className="h-[30px] my-auto w-[5px] rounded-[5px] bg-[#F9C146]"></div>}
            </button>

            <button
              className={`h-10 rounded-[5px] w-full pl-4 flex items-center justify-between text-base ${
                activeTab === "wishlist"
                  ? "bg-[#F1F2FF] text-[#2E3D83] font-semibold"
                  : "border border-[#EAECF3] text-[#2E3D83] font-normal"
              }`}
              onClick={() => setActiveTab("wishlist")}
            >
              Wishlist
              {activeTab === "wishlist" && <div className="h-[30px] my-auto w-[5px] rounded-[5px] bg-[#F9C146]"></div>}
            </button>
          </div>

          <div className="w-full">
            {activeTab === "personal" && <Personal data= {data!} refetch = {refetch} />}
            {activeTab === "mycars" && <MyCars data= {data!} refetch = {refetch} />}
            {activeTab === "mybids" && <MyBids/>}
            {activeTab === "wishlist" && <Wishlist/>}
          </div>
        </section>
      </Container>
    </div>
  );
}
