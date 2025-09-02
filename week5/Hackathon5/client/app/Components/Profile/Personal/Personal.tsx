"use client";

import { useEffect, useState } from "react";
import { User } from "@/types/auth/authTypes";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaRegEdit } from "react-icons/fa";
import { FiCheck, FiX } from "react-icons/fi";
import { UpdateUserDto, useUpdateUserMutation } from "@/redux/api/usersApiSlice";
import ContentSpinner from "../../Spinners/ContentSpinner";

type SectionKeys = "personal";

type FormUser = {
  fullName: string;
  email: string;
  mobileNumber?: string;
  nationality?: string;
  idType?: string;
};

export default function Personal({ data,refetch }: { data?: User,refetch :() => void; }) {
  const [editing, setEditing] = useState<SectionKeys | null>(null);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const { register, handleSubmit, reset } = useForm<FormUser>();

  // Reset form values whenever `data` changes
  useEffect(() => {
    if (data) {
      reset({
        fullName: data.fullName || "",
        email: data.email || "",
        mobileNumber: data.mobileNumber || "",
        nationality: data.nationality || "",
        idType: data.idType || "",
      });
    }
  }, [data, reset]);

  const onSubmit: SubmitHandler<FormUser> = async (formData) => {
    if (!data) return;
    const dto: UpdateUserDto = { ...formData };
    try {
      await updateUser({ id: data._id, dto }).unwrap();
      setEditing(null);
      alert("User updated successfully!");
      refetch()
    } catch (error: any) {
      console.error(error);
      alert(error?.data?.message || "Failed to update user");
    }
  };

  const handleEdit = () => setEditing("personal");
  const handleCancel = () => {
    setEditing(null);
    reset(data ? {
      fullName: data.fullName || "",
      email: data.email || "",
      mobileNumber: data.mobileNumber || "",
      nationality: data.nationality || "",
      idType: data.idType || "",
    } : {});
  };

  if (!data) return <ContentSpinner />;

  const displayValue = (value?: string | null) => value || "No data";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="w-full min-h-[205px] h-auto rounded-[5px] overflow-hidden mt-auto">
        <div className="bg-[#2E3D83] h-10 flex items-center px-4 justify-between">
          <h3 className="text-lg font-semibold text-white">Personal Information</h3>
          {editing === "personal" ? (
            <div className="flex gap-2">
              <button type="submit" disabled={isLoading}>
                <FiCheck className="w-6 h-6 text-white" />
              </button>
              <button type="button" onClick={handleCancel}>
                <FiX className="w-6 h-6 text-white" />
              </button>
            </div>
          ) : (
            <button type="button" onClick={handleEdit}>
              <FaRegEdit className="w-6 h-6 text-white" />
            </button>
          )}
        </div>
        <div className="bg-[#F1F2FF] px-5 py-4 grid grid-cols-2 gap-3">
          {[
            { label: "Full Name", key: "fullName" },
            { label: "Email", key: "email" },
            { label: "Mobile Number", key: "mobileNumber" },
            { label: "Nationality", key: "nationality" },
            { label: "ID Type", key: "idType" },
          ].map((field) => (
            <div key={field.key} className="flex gap-10 items-center">
              <h5 className="text-[#2E3D83] text-lg font-semibold flex-1">{field.label}</h5>
              <div className="flex-1">
                {editing === "personal" ? (
                  <input
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                    {...register(field.key as keyof FormUser)}
                    placeholder="No data"
                  />
                ) : (
                  <p className="text-[#939393] text-lg">
                    {displayValue(data[field.key as keyof User] as string)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
