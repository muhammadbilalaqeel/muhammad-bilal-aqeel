"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Container from "../Components/Common/Container";
import AuctionCard from "../Components/AuctionCard/AuctionCard";
import { useGetAuctionsQuery } from "@/redux/api/auctionApiSlice";
import ContentSpinner from "../Components/Spinners/ContentSpinner";

export default function Auction() {
  const { data, isLoading } = useGetAuctionsQuery();

  // Sorting & Filtering States
  const [sortOption, setSortOption] = useState<string>("new");
  const [filters, setFilters] = useState({
    carType: "",
    color: "",
    make: "",
    model: "",
    style: "",
    priceMin: "",
    priceMax: "",
  });

  const [appliedFilters, setAppliedFilters] = useState<typeof filters>({ ...filters });
 

const filteredAndSortedAuctions = useMemo(() => {
  if (!data?.data) return [];

  let auctions = [...data.data];

  // Only show unsold auctions
  auctions = auctions.filter(a => a.status !== 'sold');

  // Apply filters
  auctions = auctions.filter(a => {
    return (
      (!appliedFilters.carType || a.make?.toLowerCase().includes(appliedFilters.carType.toLowerCase())) &&
      (!appliedFilters.color || a.paint?.toLowerCase().includes(appliedFilters.color.toLowerCase())) &&
      (!appliedFilters.make || a.make?.toLowerCase().includes(appliedFilters.make.toLowerCase())) &&
      (!appliedFilters.model || a.model?.toLowerCase().includes(appliedFilters.model.toLowerCase())) &&
      (!appliedFilters.style || a.modified_status?.toLowerCase().includes(appliedFilters.style.toLowerCase())) &&
      (!appliedFilters.priceMin || (a.max_bid ?? 0) >= Number(appliedFilters.priceMin)) &&
      (!appliedFilters.priceMax || (a.max_bid ?? 0) <= Number(appliedFilters.priceMax))
    );
  });

  // Apply sorting
  auctions.sort((a, b) => {
    switch (sortOption) {
      case "name-asc":
        return (a?.make + a?.model).localeCompare(b?.make + b?.model);
      case "name-desc":
        return (b?.make + b?.model).localeCompare(a?.make + a?.model);
      case "price-low":
        return (a.max_bid || 0) - (b.max_bid || 0);
      case "price-high":
        return (b.max_bid || 0) - (a.max_bid || 0);
      case "old":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "new":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return auctions;
}, [data, appliedFilters, sortOption]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    setAppliedFilters({ ...filters });
  };



  return (
    <div>
      <div className="h-[240px] w-full bg-[#c6d8f9] relative">
        <Container>
          <h1 className="text-[64px] pt-6 font-semibold text-[#2E3D83] text-center font-josefin">
            Auction
          </h1>
          <p className="text-lg font-medium text-[#545677] text-center">
            Lorem ipsum dolor sit amet consectetur. At in pretium semper vitae eu eu mus.
          </p>
          <div className="w-full flex justify-center absolute bottom-0 left-0">
            <div className="px-3 py-2 bg-[#BBD0F6] rounded-x-[3px]">
              <div className="flex items-center gap-2">
                <Link href="/" className="text-[#545677]">Home</Link>
                <span className="text-[#000000]">/</span>
                <span className="text-[#2E3D83]">Auction</span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <section className="py-14">
        <Container className="flex gap-8 justify-center">
          <div className="max-w-[898px] w-full ">
            <div className="w-full h-[60px] bg-[#2E3D83] flex items-center justify-between rounded-[5px] px-5">
              <span className="font-semibold text-base text-white">
                Showing 1-{filteredAndSortedAuctions.length} of {filteredAndSortedAuctions.length} Results
              </span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-[189px] px-2 h-[30px] bg-white font-medium text-[12px] text-[#9A9A9A]"
              >
                <option value="new">Sort by Newest</option>
                <option value="old">Sort by Oldest</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="price-low">Price Low to High</option>
                <option value="price-high">Price High to Low</option>
              </select>
            </div>

            {!isLoading && (
              <div>
  {filteredAndSortedAuctions?.length === 0 ? (
    <div className="w-full py-10 text-center text-lg font-bold text-[#2E3D83]">
      No Auctions Found
    </div>
  ) : (
    <div className="flex flex-col gap-4">
      {filteredAndSortedAuctions.map((auction) => (
        <AuctionCard key={auction._id} item={auction} />
      ))}
    </div>
  )}
</div>
            )}

            {isLoading && (
              <div className="flex items-center justify-center py-10">
                <ContentSpinner />
              </div>
            )}
          </div>

          {/* Sidebar filters */}
          <div className="w-[286px] bg-[#2E3D83] h-fit rounded-[5px] overflow-hidden">
            <div className="h-[50px] px-4 bg-[#4658AC] flex items-center">
              <p className="font-medium text-base leading-[100%] text-white border-l px-2 py-2 border-[#FDB94B]">
                Filter By
              </p>
            </div>

            <div className="px-4 py-3 flex flex-col gap-5">
              <input
                type="text"
                name="carType"
                placeholder="Any Car Type"
                value={filters.carType}
                onChange={handleFilterChange}
                className="w-full text-[#BABABA] border border-[#828BB5] rounded-[2px] h-10 px-2"
              />
              <input
                type="text"
                name="color"
                placeholder="Any Color"
                value={filters.color}
                onChange={handleFilterChange}
                className="w-full text-[#BABABA] border border-[#828BB5] rounded-[2px] h-10 px-2"
              />
              <input
                type="text"
                name="make"
                placeholder="Any Makes"
                value={filters.make}
                onChange={handleFilterChange}
                className="w-full text-[#BABABA] border border-[#828BB5] rounded-[2px] h-10 px-2"
              />
              <input
                type="text"
                name="model"
                placeholder="Any Car Model"
                value={filters.model}
                onChange={handleFilterChange}
                className="w-full text-[#BABABA] border border-[#828BB5] rounded-[2px] h-10 px-2"
              />
              <input
                type="text"
                name="style"
                placeholder="Any Style"
                value={filters.style}
                onChange={handleFilterChange}
                className="w-full text-[#BABABA] border border-[#828BB5] rounded-[2px] h-10 px-2"
              />

              <div className="flex flex-col gap-3">
                <input
                  type="number"
                  name="priceMin"
                  placeholder="Min Price"
                  value={filters.priceMin}
                  onChange={handleFilterChange}
                  className="w-full text-[#BABABA] border border-[#828BB5] rounded-[2px] h-10 px-2"
                />
                <input
                  type="number"
                  name="priceMax"
                  placeholder="Max Price"
                  value={filters.priceMax}
                  onChange={handleFilterChange}
                  className="w-full text-[#BABABA] border border-[#828BB5] rounded-[2px] h-10 px-2"
                />

                <button
                  className="bg-[#F4C23D] rounded-[3px] h-[50px] font-bold text-lg tracking-[4.5%] text-black cursor-pointer hover:bg-[#e1b53a]"
                  onClick={applyFilters}
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
