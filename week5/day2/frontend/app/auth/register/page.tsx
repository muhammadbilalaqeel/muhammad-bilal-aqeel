import SignupForm from "@/app/components/SignupForm/SignupForm";

export default function Register(){
    return (
        <div className="w-full min-h-screen flex items-center py-8 px-6 justify-center">
        
        
                   <div className="border border-blue-500 px-4 py-6 rounded-3xl max-w-[400px] w-full">
                       <SignupForm/>
                   </div>
        </div>
    )
}