"use client"
import { useSignupUserMutation } from "@/redux/api/authApiSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import ButtonSpinner from "../Spinners/ButtonSpinner";

type RegisterFormInputs={
    fullName : string
    email:string
    mobileNumber:string
    username :string
    password:string
    confirmPassword: string;
    terms: boolean;
    captcha: boolean;

}



export default function RegisterForm(){


      const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInputs>();
  const [signup,{isLoading,isSuccess,isError,error}] = useSignupUserMutation()
  const router = useRouter()
  const onSubmit = async (data: RegisterFormInputs) => {
    console.log("Form Submitted:", data);

    const {confirmPassword,terms,captcha,...clearData} = data

    try {
        const res = await signup(clearData);
            console.log(res)
            alert(res.data.message)
            router.push('/login')
      
    } catch (err) {
        console.log(error.data.message)
        alert(error.data.message)
    }

    
    
  };
    return (
        <form 
         onSubmit={handleSubmit(onSubmit)}
        className="border border-[#EAECF3] max-w-[592px] min-h-[927px] w-full shadow-[0_0_12px_0_#0000001F] px-7 py-12">
            <div className="top">
                <h2 className="text-center text-[#2E3D83] font-bold text-xl">Register</h2>
                <p className="font-light text-[#AFAFAF] text-center">Do you already have an account? <Link className="text-[#2E3D83] text-base" href={'/login'}>Login Here</Link></p>
            </div>

            <div className="flex flex-col gap-6 mt-6">
              <div className="personal">
                 <div>
                    <h3 className="text-base font-semibold text-[#2E3D83]">Personal Information</h3>
                    <div className="w-[72px] h-[3px] rounded-sm bg-[#F9C146]"></div>
                 </div>

                 <div className="mt-3 flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-[#2E3D83] text-sm" htmlFor="fullname">Enter Your Full Name*</label>
                        <input  {...register("fullName", { required: "Full name is required", minLength: { value: 2, message: "At least 2 characters" },maxLength:{ value: 20, message: "Less than 20 characters" } })}  type="text"  className="w-full border border-[#EAECF3] rounded-[5px] h-10 px-2"/>
                        {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex-1 flex flex-col gap-1">
                        <label className="text-[#2E3D83] text-sm" htmlFor="email">Enter Your Email*</label>
                        <input 
                        {...register("email", { required: "Email is required",pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }  })}
                        type="text"  className="w-full border border-[#EAECF3] rounded-[5px] h-10 px-2"/>
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>

                    <div className="flex-1 flex flex-col gap-1">
                        <label className="text-[#2E3D83] text-sm" htmlFor="fullname">Enter Mobile Number*</label>
                        <input 
                        {...register("mobileNumber", { required: "Mobile number is required", minLength: { value: 7, message: "At least 7 digits" },maxLength:{ value: 15, message: "Not more than 15 digits" } })}
                        type="text"  className="w-full border border-[#EAECF3] rounded-[5px] h-10 px-2"/>
                        {errors.mobileNumber && <p className="text-red-500 text-xs">{errors.mobileNumber.message}</p>}
                    </div>
                    </div>
                 </div>
              </div>


              <div className="Account">
                 <div>
                    <h3 className="text-base font-semibold text-[#2E3D83]">Account Information</h3>
                    <div className="w-[72px] h-[3px] rounded-sm bg-[#F9C146]"></div>
                 </div>

                 <div className="mt-3 flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-[#2E3D83] text-sm" htmlFor="username">Username*</label>
                        <div className="w-full border border-[#EAECF3] rounded-[5px] h-10 flex ">
                            <input type="text"  {...register("username", { required: "Username is required", minLength: { value: 4, message: "At least 4 characters" } , maxLength:{ value: 20, message: "Not more than 20 characters" } })}  className="w-full outline-none px-2" />
                            <button className="text-[12px] font-semibold underline text-[#2E3D83] shrink-0 px-3">Check Availability</button>
                        </div>
                         {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex-1 flex flex-col gap-1">
                        <label className="text-[#2E3D83] text-sm" htmlFor="password">Password*</label>
                        <input type="password" 
                        {...register("password", { required: "Password is required", minLength: { value: 6, message: "At least 6 characters" } })}
                        className="w-full border border-[#EAECF3] rounded-[5px] h-10 px-2"/>
                                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                    </div>

                    <div className="flex-1 flex flex-col gap-1">
                        <label className="text-[#2E3D83] text-sm" htmlFor="fullname">Confirm Password*</label>
                        <input type="password"  
                                          
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value) => value === watch("password") || "Passwords do not match",
                  })}

                        className="w-full border border-[#EAECF3] rounded-[5px] h-10 px-2"/>
                         {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
                    </div>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col gap-2">
                 <h3 className="text-base font-medium text-[#2E3D83]">Prove You Are Human</h3>
                 <div className="w-full h-20 rounded-[5px] border border-[#EAECF3] flex items-center justify-center gap-2">
                   <input type="checkbox"  {...register("captcha", { required: "Please verify you are not a robot" })} className="h-[35px] w-[35px] border border-[#EAECF3] rounded-[2px] cursor-pointer" />
                   <p className="text-[#2E3D83] font-semibold text-base">I’m not a robot</p>
                 </div>
                  {errors.captcha && <p className="text-red-500 text-xs">{errors.captcha.message}</p>}
              </div>

              <div className="flex items-center gap-2">
                 <input type="checkbox"  className="h-5 w-5 rounded-[3px] border border-[#2E3D83] cursor-pointer" {...register("terms", { required: "You must accept terms" })} />
                 <p className="font-semibold text-[12px] text-[#2E3D83]">I agree to the Terms & Conditions</p>
              </div>
              {errors.terms && <p className="text-red-500 text-xs">{errors.terms.message}</p>}


              <button 
              type="submit"
              className="w-full h-10 rounded-[5px] bg-[#2E3D83] text-white font-bold text-base cursor-pointer flex items-center justify-center">{
              isLoading ? <ButtonSpinner/> : 'Create Account'
              }</button>

              <div className="flex flex-col items-center gap-3 mt-2">
                <p className="text-base text-[#2E3D83]">Or Register with</p>
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