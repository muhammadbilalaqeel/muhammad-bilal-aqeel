"use client";

export default function ContentSpinner() {
  return (
    <div className="flex justify-center items-center">
      <div
        className="w-6 h-6 border-4 border-t-transparent border-solid rounded-full animate-spin"
        style={{ borderColor: "#2E3D83 #2E3D83 #2E3D83 transparent" }}
      ></div>
    </div>
  );
}
