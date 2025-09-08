"use client"
import { useLoginUserMutation } from "@/redux/api/authApiSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaRegEyeSlash } from "react-icons/fa";
import ButtonSpinner from "../Spinners/ButtonSpinner";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/slices/authSlice";


type loginFormInputs={
    email:string
    password:string
}

export default function LoginForm(){
         const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<loginFormInputs>();
        const router = useRouter()
         const dispatch = useAppDispatch();
const [login,{isLoading,isSuccess,isError,error}] = useLoginUserMutation()
          const onSubmit = async (data: loginFormInputs) => {
    console.log("Form Submitted:", data);
    try {
        const res = await login(data).unwrap();
        
            const result = res.data
            console.log(result)
            console.log(res.message)
            
            dispatch(setCredentials({ user: result.user, token: result.token }));
            router.push('/auction')
        
    } catch (err) {
       alert(error.data.message)
        console.log(error)
    }

    
    
  };
    return(
          <form 
               onSubmit={handleSubmit(onSubmit)}
          className="border border-[#EAECF3] max-w-[592px] h-[577px] w-full shadow-[0_0_12px_0_#0000001F] px-7 py-12">
            <div className="top">
                <h2 className="text-center text-[#2E3D83] font-bold text-xl">Log In </h2>
                <p className="font-light text-[#AFAFAF] text-center">New member? <Link className="text-[#2E3D83] text-base" href={'/register'}>Register Here</Link></p>
            </div>

            <div className="flex flex-col gap-6 mt-6">
              <div className="personal">
                

                 <div className="mt-3 flex flex-col gap-4">
                    <div className="flex-1 flex flex-col gap-1">
                        <label className="text-[#2E3D83] text-sm" htmlFor="email">Enter Your Email*</label>
                        <input  
                               {...register("email", { required: "Email is required",pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }  })}
                        type="text"  className="w-full border border-[#EAECF3] rounded-[5px] h-10 px-2"/>
                            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>
 <div className="flex-1 flex flex-col gap-1">
                        <label className="text-[#2E3D83] text-sm" htmlFor="password">Password*</label>
                        <div className="w-full border border-[#EAECF3] rounded-[5px] h-10 flex items-center gap-1">
                            <input type="password"  className=" px-2 w-full outline-none" {...register("password", { required: "Password is required", minLength: { value: 6, message: "At least 6 characters" } })}/>
                            <FaRegEyeSlash className="h-[17px] w-[17px] text-[#C3C3C3] mr-3 cursor-pointer"/>
                        </div>
                         {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                    </div>
              
                 </div>
              </div>


             

             

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                 <input type="checkbox" id="rememberMe" className="h-5 w-5 rounded-[3px] border border-[#2E3D83] cursor-pointer" />
                 <label htmlFor="rememberMe" className="cursor-pointer font-semibold text-[12px] text-[#2E3D83]">Remember me</label>
              </div>
              <Link href={'#'} className="text-[12px] font-semibold underline text-[#2E3D83]">Forget Password</Link>
              </div>

              <button className="w-full h-10 rounded-[5px] bg-[#2E3D83] text-white font-bold text-base cursor-pointer flex items-center justify-center">{
              isLoading ? <ButtonSpinner/> : 'Log In'
              }</button>

              <div className="flex flex-col items-center gap-3 mt-2">
                <p className="text-base text-[#2E3D83]">Or login with</p>
                <div className="flex items-center gap-6 mt-2">
                    <button className="h-[50px] w-[50px] rounded-full border-2 border-[#EAECF3] flex items-center justify-center cursor-pointer">
                        <div className="relative h-[23px] w-[23px]">
                            <Image src={'/google.png'} alt="" className="" fill />
                        </div>
                    </button>

                    <button className="h-[50px] w-[50px] rounded-full border-2 border-[#EAECF3] flex items-center justify-center cursor-pointer">
                        <div className="relative h-[22px] w-3">
                            <Image src={'/facebook.png'} alt="" className="" fill />
                        </div>
                    </button>

                    <button className="h-[50px] w-[50px] rounded-full border-2 border-[#EAECF3] flex items-center justify-center cursor-pointer">
                        <div className="relative h-[19px] w-[23px]">
                            <Image src={'/twitter.png'} alt="" className="" fill />
                        </div>
                    </button>
                </div>
              </div>
            </div>
        </form>
    )
}