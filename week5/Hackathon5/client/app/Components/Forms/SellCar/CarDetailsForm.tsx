"use client";
import { useFormContext, Controller } from "react-hook-form";
import ButtonSpinner from "../../Spinners/ButtonSpinner";
import { useState } from "react";
import axios from "axios";

export default function CarDetailsForm({isLoading}:{isLoading:boolean}) {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
const [uploading, setUploading] = useState(false);

  // Upload multiple images to Cloudinary
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setUploading(true);
    const files = Array.from(e.target.files);
    const uploadedUrls: string[] = [];

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "react_upload");

        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dxmlebwrn/image/upload",
          formData
        );
        uploadedUrls.push(res.data.secure_url);
      }

      // Append uploaded URLs to form value
      setValue("images", uploadedUrls);
    } catch (err) {
      console.error("Image upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 px-5 py-5 w-full rounded-[5px] bg-[#DBE8FF]">
      {/* Heading */}
      <div>
        <h3 className="text-base font-semibold text-[#2E3D83]">Car Details</h3>
        <div className="w-[72px] h-[3px] rounded-sm bg-[#F9C146]"></div>
      </div>

      {/* VIN + Year */}
      <div className="flex justify-between gap-5">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="vin" className="text-xl font-medium">VIN*</label>
          <input
            type="text"
            {...register("vin", { required: "VIN is required" })}
            className="border border-[#929292] bg-white rounded-[5px] h-10 px-2"
          />
          {errors.vin && <p className="text-red-500 text-sm">{errors.vin.message as string}</p>}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="year" className="text-xl font-medium">Year*</label>
          <select
            {...register("year", { required: "Year is required" })}
            className="border border-[#929292] bg-white rounded-[5px] h-10 px-2"
          >
            <option value="">Select Year</option>
            <option value="2004">2004</option>
            <option value="2005">2005</option>
            <option value="2007">2007</option>
          </select>
          {errors.year && <p className="text-red-500 text-sm">{errors.year.message as string}</p>}
        </div>
      </div>

      {/* Make + Model */}
      <div className="flex justify-between gap-5">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="make" className="text-xl font-medium">Make*</label>
          <select
            {...register("make", { required: "Make is required" })}
            className="border border-[#929292] bg-white rounded-[5px] h-10 px-2"
          >
            <option value="">Select Make</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="BMW">BMW</option>
          </select>
          {errors.make && <p className="text-red-500 text-sm">{errors.make.message as string}</p>}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="model" className="text-xl font-medium">Model*</label>
          <select
            {...register("model", { required: "Model is required" })}
            className="border border-[#929292] bg-white rounded-[5px] h-10 px-2"
          >
            <option value="">All Models</option>
            <option value="Corolla">Corolla</option>
            <option value="Civic">Civic</option>
            <option value="X5">X5</option>
          </select>
          {errors.model && <p className="text-red-500 text-sm">{errors.model.message as string}</p>}
        </div>
      </div>

      {/* Mileage + Engine Size */}
      <div className="flex justify-between gap-5">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="mileage" className="text-xl font-medium">Mileage (in miles)*</label>
          <input
            type="text"
            {...register("mileage", { required: "Mileage is required" })}
            className="border border-[#929292] bg-white rounded-[5px] h-10 px-2"
          />
          {errors.mileage && <p className="text-red-500 text-sm">{errors.mileage.message as string}</p>}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="engineSize" className="text-xl font-medium">Engine Size*</label>
          <select
            {...register("engine_size", { required: "Engine Size is required" })}
            className="border border-[#929292] bg-white rounded-[5px] h-10 px-2"
          >
            <option value="">Select</option>
            <option value="4 Cylinder">4 Cylinder</option>
            <option value="6 Cylinder">6 Cylinder</option>
            <option value="8 Cylinder">8 Cylinder</option>
            <option value="10 Cylinder">10 Cylinder</option>
            <option value="12 Cylinder">12 Cylinder</option>
          </select>
          {errors.engine_size && <p className="text-red-500 text-sm">{errors.engine_size.message as string}</p>}
        </div>
      </div>

      {/* Paint + GCC Specs */}
      <div className="flex justify-between gap-5">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="paint" className="text-xl font-medium">Paint*</label>
          <select
            {...register("paint", { required: "Paint is required" })}
            className="border border-[#929292] bg-white rounded-[5px] h-10 px-2"
          >
            <option value="">Select</option>
            <option value="Original">Original paint</option>
            <option value="Partial">Partially Repainted</option>
            <option value="Full">Totally Repainted</option>
          </select>
          {errors.paint && <p className="text-red-500 text-sm">{errors.paint.message as string}</p>}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="has_gcc_specs" className="text-xl font-medium">Has GCC Specs*</label>
          <select
            {...register("has_gcc_specs", { required: "This field is required" })}
            className="border border-[#929292] bg-white rounded-[5px] h-10 px-2"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.has_gcc_specs && <p className="text-red-500 text-sm">{errors.has_gcc_specs.message as string}</p>}
        </div>
      </div>

      {/* Paint Notes */}
      <div>
        <label htmlFor="noteworthy_features" className="text-xl font-medium">Noteworthy options/features*</label>
        <textarea
          {...register("noteworthy_features", { required: "Paint notes are required" })}
          className="w-full min-h-[150px] border border-[#929292] bg-white rounded-[5px] px-2 py-1"
        />
        {errors.noteworthy_features && <p className="text-red-500 text-sm">{errors.noteworthy_features.message as string}</p>}
      </div>

      {/* Accident History + Service History */}
      <div className="flex justify-between gap-5">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="accident_history" className="text-xl font-medium">Accident History*</label>
          <select
            {...register("accident_history", { required: "Accident history is required" })}
            className="border border-[#929292] bg-white rounded-[5px] h-10 px-2"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.accident_history && <p className="text-red-500 text-sm">{errors.accident_history.message as string}</p>}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="service_history" className="text-xl font-medium">Full Service History*</label>
          <select
            {...register("service_history", { required: "Service history is required" })}
            className="border border-[#929292] bg-white rounded-[5px] h-10 px-2"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.service_history && <p className="text-red-500 text-sm">{errors.service_history.message as string}</p>}
        </div>
      </div>

      {/* Modified or Stock */}
      <div className="flex justify-between gap-5">
        <div className="flex flex-col gap-2 w-full">
          <p className="text-xl font-medium">Has the car been modified?*</p>
          <Controller
            name="modified_status"
            control={control}
            rules={{ required: "Please select one option" }}
            render={({ field }) => (
              <div className="flex items-center gap-5">
                <button
                  type="button"
                  onClick={() => field.onChange("Completely stock")}
                  className={`text-lg px-[30px] py-[9px] rounded-[5px] border ${
                    field.value === "Completely stock"
                      ? "bg-[#2E3D83] text-white border-[#2E3D83]"
                      : "bg-white text-black border-[#929292]"
                  }`}
                >
                  Completely stock
                </button>
                <button
                  type="button"
                  onClick={() => field.onChange("Modified")}
                  className={`text-lg px-[30px] py-[9px] rounded-[5px] border ${
                    field.value === "Modified"
                      ? "bg-[#2E3D83] text-white border-[#2E3D83]"
                      : "bg-white text-black border-[#929292]"
                  }`}
                >
                  Modified
                </button>
              </div>
            )}
          />
          {errors.modified_status && <p className="text-red-500 text-sm">{errors.modified_status.message as string}</p>}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="max_bid" className="text-xl font-medium">Max Bid*</label>
          <input
            type="number"
            {...register("max_bid", { required: "Max Bid is required" })}
            className="border border-[#929292] bg-white rounded-[5px] h-10 px-2"
          />
          {errors.max_bid && <p className="text-red-500 text-sm">{errors.max_bid.message as string}</p>}
        </div>
      </div>

      {/* Start At + End At */}
<div className="flex justify-between gap-5">
  {/* Start At */}
  <div className="flex flex-col gap-2 w-full">
    <label htmlFor="start_at" className="text-xl font-medium">Start At*</label>
    <Controller
      name="startsAt"
      control={control}
      rules={{ required: "Start date & time is required" }}
      render={({ field }) => (
        <input
          type="datetime-local"
          {...field}
          className="border border-[#929292] bg-white rounded-[5px] h-10 px-2"
        />
      )}
    />
    {errors.start_at && (
      <p className="text-red-500 text-sm">{errors.start_at.message as string}</p>
    )}
  </div>

  {/* End At */}
  <div className="flex flex-col gap-2 w-full">
    <label htmlFor="end_at" className="text-xl font-medium">End At*</label>
    <Controller
      name="endsAt"
      control={control}
      rules={{ required: "End date & time is required" }}
      render={({ field }) => (
        <input
          type="datetime-local"
          {...field}
          className="border border-[#929292] bg-white rounded-[5px] h-10 px-2"
        />
      )}
    />
    {errors.end_at && (
      <p className="text-red-500 text-sm">{errors.end_at.message as string}</p>
    )}
  </div>
</div>

      {/* Upload Photos */}
    <div>
        <label htmlFor="images" className="text-xl font-medium">
          Upload Photos*
        </label>
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="border border-[#929292] bg-white rounded-[5px] h-10 px-2"
        />
        {uploading && <p className="text-blue-500 text-sm mt-1">Uploading images...</p>}
        {errors.images && <p className="text-red-500 text-sm">{errors.images.message as string}</p>}
      </div>

      {/* Submit */}
   <div>
        <button
          type="submit"
          className="w-[195px] h-[56px] rounded-[5px] bg-[#2E3D83] text-2xl font-bold text-white flex items-center justify-center"
        >
          {
            isLoading ? <ButtonSpinner/> : 'Submit'
          }
        </button>
      </div>
    </div>
  );
}
