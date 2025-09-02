import LoginForm from "@/app/components/LoginForm/LoginForm";

export default function Login(){
    return (
          <div className="w-full h-screen flex items-center justify-center">


           <div className="border border-blue-500 px-4 py-6 rounded-3xl max-w-[400px] w-full">
               <LoginForm/>
           </div>
        </div>
    )
}