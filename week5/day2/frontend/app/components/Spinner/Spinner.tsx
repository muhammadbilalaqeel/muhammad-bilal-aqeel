
export type SpinnerProp = {
    color : string
}

export default function Spinner({color}:SpinnerProp) {
  return (
    <div className="flex justify-center items-center">
      <div className={`w-6 h-6 border-4 border-${color}-500 border-dashed rounded-full animate-spin`}></div>
    </div>
  );
}
