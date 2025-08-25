import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import {
  useGetFilteredProductsQuery,
  useGetFilterOptionsQuery,
} from "../../redux/apiSlice";

const Sidebar = ({ onProductsFiltered }) => {
  const [enabled, setEnabled] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [openSections, setOpenSections] = useState({});


  const {
    data: filterOptions,
    isLoading: isFilterOptionsLoading,
    isError: isFilterOptionsError,
  } = useGetFilterOptionsQuery();


  const {
    data: filterProducts,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useGetFilteredProductsQuery(selectedFilters);


  useEffect(() => {
    if (filterProducts?.data) {
      onProductsFiltered(filterProducts.data,isProductsLoading,isProductsError);
    }
  }, [filterProducts, onProductsFiltered]);

  useEffect(() => {
    if (filterOptions?.attributes) {
      const initialOpenState = {};
      filterOptions.attributes.forEach((attr) => {
        initialOpenState[attr._id] = false;
      });
      initialOpenState["caffeine"] = false;
      setOpenSections(initialOpenState);
    }
  }, [filterOptions]);

  const handleCheckboxChange = (category, value) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev };

      if (updated[category] === value) {
       
        delete updated[category];
      } else {
      
        updated[category] = value;
      }

      return updated;
    });
  };

  const toggleSection = (sectionId) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  if (isFilterOptionsLoading ) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }
  if (isFilterOptionsError ) {
    return (
      <p className="text-red-500 py-8 px-3 text-center">
        Something went wrong!
      </p>
    );
  }

  return (
    <div className="hidden md:flex flex-col gap-4">
 
      {filterOptions?.attributes?.map((item) => (
        <div key={item._id}>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection(item._id)}
          >
            <p className="text-base font-medium uppercase w-[216px]">
              {item._id}{" "}
              <span className="text-[#C3B212]">({item.values.length})</span>
            </p>
            {openSections[item._id] ? (
              <FaMinus size={20} />
            ) : (
              <FaPlus size={20} />
            )}
          </div>
          <div
            className={`transition-all duration-300 overflow-hidden ${
              openSections[item._id]
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="mt-2">
              {item.values.map((value, index) => (
                <label key={index} className="flex items-center gap-2 my-2">
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(item._id, value)}
                    checked={selectedFilters[item._id] === value}
                    className="w-4 h-4 accent-black border-2 border-black rounded"
                  />
                  <span className="text-sm">{value}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Caffeine */}
      <div>
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("caffeine")}
        >
          <p className="text-base font-medium uppercase w-[216px]">
            CAFFEINE{" "}
            <span className="text-[#C3B212]">
              ({filterOptions?.caffeineLevels?.length})
            </span>
          </p>
          {openSections["caffeine"] ? (
            <FaMinus size={20} />
          ) : (
            <FaPlus size={20} />
          )}
        </div>
        <div
          className={`transition-all duration-300 overflow-hidden ${
            openSections["caffeine"]
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-2">
            {filterOptions?.caffeineLevels?.map((level, index) => (
              <label key={index} className="flex items-center gap-2 my-2">
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange("caffeine", level)}
                  checked={selectedFilters["caffeine"] === level}
                  className="w-4 h-4 accent-black border-2 border-black rounded"
                />
                <span className="text-sm">{level}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Organic toggle */}
      <div className="flex items-center mt-4">
        <p className="text-base font-medium uppercase">organic</p>
        <button
          onClick={() => {
            setEnabled(!enabled);
            setSelectedFilters((prev) => ({
              ...prev,
              organic: !enabled,
            }));
          }}
          className={`w-8 h-4 mx-3 cursor-pointer flex items-center rounded-full border p-0.5 transition-colors duration-300 ${
            enabled ? "bg-[#282828]" : "bg-transparent"
          }`}
        >
          <div
            className={`w-3 h-3 rounded-full shadow transform transition-transform duration-300 ${
              enabled ? "translate-x-4 bg-white" : "translate-x-0 bg-[#282828] "
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default React.memo(Sidebar);
