"use client";
import { useFormContext, Controller } from "react-hook-form";

export default function YourInfoForm() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-3 px-5 py-5  w-full rounded-[5px] bg-[#DBE8FF]">
      {/* Heading */}
      <div>
        <h3 className="text-base font-semibold text-[#2E3D83]">Your Info</h3>
        <div className="w-[72px] h-[3px] rounded-sm bg-[#F9C146]"></div>
      </div>

      {/* Dealer / Private Party */}
      <div>
        <p className="text-xl font-medium">Dealer or Private party?</p>
        <Controller
          name="seller_type"
          control={control}
          rules={{ required: "Please select an option" }}
          render={({ field }) => (
            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => field.onChange("Dealer")}
                className={`text-lg px-[30px] py-[9px] rounded-[5px] border ${
                  field.value === "Dealer"
                    ? "bg-[#2E3D83] text-white border-[#2E3D83]"
                    : "bg-white text-black border-[#929292]"
                }`}
              >
                Dealer
              </button>
              <button
                type="button"
                onClick={() => field.onChange("Private party")}
                className={`text-lg px-[30px] py-[9px] rounded-[5px] border ${
                  field.value === "Private party"
                    ? "bg-[#2E3D83] text-white border-[#2E3D83]"
                    : "bg-white text-black border-[#929292]"
                }`}
              >
                Private party
              </button>
            </div>
          )}
        />
        {errors.seller_type?.message && (
          <p className="text-red-500 text-sm">
            {errors.seller_type.message as string}
          </p>
        )}
      </div>

      {/* First + Last name */}
      <div className="flex justify-between gap-5">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="firstname" className="text-xl font-medium">
            First name*
          </label>
          <input
            type="text"
            {...register("first_name", { required: "First name is required",minLength:{value:2,message:"At least 2 characters"},maxLength:{
                value:20,message:"Not greater than 20 characters"
            } })}
            className="border border-[#929292] bg-white rounded-[5px] h-10 px-2"
          />
          {errors.first_name?.message && (
            <p className="text-red-500 text-sm">
              {errors.first_name.message as string}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="lastname" className="text-xl font-medium">
            Last name*
          </label>
          <input
            type="text"
            {...register("last_name", { required: "Last name is required",minLength:{value:2,message:"At least 2 characters"},maxLength:{
                value:20,message:"Not greater than 20 characters"
            }  })}
            className="border border-[#929292] bg-white rounded-[5px] h-10 px-2"
          />
          {errors.last_name?.message && (
            <p className="text-red-500 text-sm">
              {errors.last_name.message as string}
            </p>
          )}
        </div>
      </div>

      {/* Email + Phone */}
      <div className="flex justify-between gap-5">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="email" className="text-xl font-medium">
            Email*
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter valid email",
              },
            })}
            className="border border-[#929292] bg-white rounded-[5px] h-10 px-2"
          />
          {errors.email?.message && (
            <p className="text-red-500 text-sm">
              {errors.email.message as string}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="phonenumber" className="text-xl font-medium">
            Phone Number*
          </label>
          <input
            type="text"
            {...register("phone_number", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{7,15}$/,
                message: "Enter valid phone number",
              },
            })}
            className="border border-[#929292] bg-white rounded-[5px] h-10 px-2"
          />
          {errors.phone_number?.message && (
            <p className="text-red-500 text-sm">
              {errors.phone_number.message as string}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
